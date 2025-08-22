-- Update user email confirmation and set admin role
UPDATE auth.users 
SET email_confirmed_at = now() 
WHERE email = 'kim@sgc.kz';

-- Update profile role to admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = '9fe942fa-4bbf-49b7-a762-c79ad5fd3971';