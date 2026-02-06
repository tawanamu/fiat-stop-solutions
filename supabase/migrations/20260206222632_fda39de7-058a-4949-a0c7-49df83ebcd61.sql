-- Create storage bucket for part images
INSERT INTO storage.buckets (id, name, public)
VALUES ('part-images', 'part-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view part images (public bucket)
CREATE POLICY "Anyone can view part images"
ON storage.objects FOR SELECT
USING (bucket_id = 'part-images');

-- Allow admins to upload part images
CREATE POLICY "Admins can upload part images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'part-images' AND public.is_admin());

-- Allow admins to update part images
CREATE POLICY "Admins can update part images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'part-images' AND public.is_admin());

-- Allow admins to delete part images
CREATE POLICY "Admins can delete part images"
ON storage.objects FOR DELETE
USING (bucket_id = 'part-images' AND public.is_admin());