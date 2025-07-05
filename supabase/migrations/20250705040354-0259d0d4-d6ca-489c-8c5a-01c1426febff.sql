
-- Create a table to store user feedback
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('review', 'issue', 'suggestion', 'other')),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (make it readable by authenticated users)
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert feedback (public form)
CREATE POLICY "Anyone can submit feedback" 
  ON public.feedback 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all feedback (for admin review)
CREATE POLICY "Authenticated users can view all feedback" 
  ON public.feedback 
  FOR SELECT 
  TO authenticated
  USING (true);
