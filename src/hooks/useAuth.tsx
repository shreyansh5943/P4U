
import { useState, useEffect, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  remainingAIUses: number;
  refreshUsage: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [remainingAIUses, setRemainingAIUses] = useState(5);

  const refreshUsage = async () => {
    if (!user) {
      setRemainingAIUses(5); // Default to 5 for non-authenticated users
      return;
    }
    
    try {
      const { data, error } = await supabase.rpc('can_use_ai_features', {
        user_uuid: user.id
      });
      
      if (!error && typeof data === 'number') {
        setRemainingAIUses(data);
      } else {
        // If there's an error or no data, default to 5 (new user)
        setRemainingAIUses(5);
      }
    } catch (error) {
      console.error('Error checking AI usage:', error);
      // Don't set to 0 on error, keep current value or default to 5
      setRemainingAIUses(5);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Refresh usage when auth state changes
        if (session?.user) {
          setTimeout(() => {
            refreshUsage();
          }, 0);
        } else {
          setRemainingAIUses(5); // Reset to 5 when user logs out
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        setTimeout(() => {
          refreshUsage();
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setRemainingAIUses(5); // Reset to 5 for guest users
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signOut, 
      remainingAIUses, 
      refreshUsage 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
