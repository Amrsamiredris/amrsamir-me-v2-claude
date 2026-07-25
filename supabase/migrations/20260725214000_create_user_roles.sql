CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'Editor',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Super Admins can do everything. Everyone else can only read their own role.
-- Note: the Edge Function uses the Service Role Key so it bypasses these RLS rules when creating users.

CREATE POLICY "Users can read their own role" 
  ON public.user_roles FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Super Admins can read all roles" 
  ON public.user_roles FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur 
      WHERE ur.user_id = auth.uid() AND ur.role = 'Super Admin'
    )
  );
