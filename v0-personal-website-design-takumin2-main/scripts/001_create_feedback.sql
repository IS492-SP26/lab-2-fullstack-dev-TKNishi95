-- Create the feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read feedback
CREATE POLICY "feedback_select_all" ON public.feedback
  FOR SELECT USING (true);

-- Allow anyone to insert feedback (public feedback form)
CREATE POLICY "feedback_insert_all" ON public.feedback
  FOR INSERT WITH CHECK (true);

-- Enable realtime for the feedback table
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback;
