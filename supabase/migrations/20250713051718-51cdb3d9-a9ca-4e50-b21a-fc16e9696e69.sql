
-- Create a table to track user AI usage
CREATE TABLE public.user_ai_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, usage_date)
);

-- Enable RLS for user_ai_usage table
ALTER TABLE public.user_ai_usage ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own usage data
CREATE POLICY "Users can view their own AI usage" 
  ON public.user_ai_usage 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own usage data
CREATE POLICY "Users can create their own AI usage records" 
  ON public.user_ai_usage 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own usage data
CREATE POLICY "Users can update their own AI usage" 
  ON public.user_ai_usage 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create a function to increment AI usage for a user
CREATE OR REPLACE FUNCTION public.increment_ai_usage(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_usage INTEGER;
BEGIN
  -- Get current usage for today
  SELECT usage_count INTO current_usage
  FROM public.user_ai_usage
  WHERE user_id = user_uuid AND usage_date = CURRENT_DATE;
  
  -- If no record exists, create one
  IF current_usage IS NULL THEN
    INSERT INTO public.user_ai_usage (user_id, usage_date, usage_count)
    VALUES (user_uuid, CURRENT_DATE, 1);
    RETURN TRUE;
  END IF;
  
  -- If user has reached the limit, return false
  IF current_usage >= 5 THEN
    RETURN FALSE;
  END IF;
  
  -- Increment usage count
  UPDATE public.user_ai_usage
  SET usage_count = usage_count + 1,
      updated_at = now()
  WHERE user_id = user_uuid AND usage_date = CURRENT_DATE;
  
  RETURN TRUE;
END;
$$;

-- Create a function to check if user can use AI features
CREATE OR REPLACE FUNCTION public.can_use_ai_features(user_uuid UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_usage INTEGER;
BEGIN
  -- Get current usage for today
  SELECT usage_count INTO current_usage
  FROM public.user_ai_usage
  WHERE user_id = user_uuid AND usage_date = CURRENT_DATE;
  
  -- If no record exists, user has 5 uses available
  IF current_usage IS NULL THEN
    RETURN 5;
  END IF;
  
  -- Return remaining uses
  RETURN GREATEST(0, 5 - current_usage);
END;
$$;
