import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Part {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  part_number: string | null;
  price: number;
  original_price: number | null;
  condition: string;
  stock_quantity: number;
  in_stock: boolean;
  fast_delivery: boolean;
  slug: string | null;
  created_at: string;
  updated_at: string;
  images: string[];
  category?: {
    id: string;
    name: string;
    slug: string | null;
  } | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string | null;
}

export const useParts = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        // Fetch parts with their images
        const { data: partsData, error: partsError } = await supabase
          .from('parts')
          .select(`
            *,
            category:categories(id, name, slug),
            part_images(image_url, display_order)
          `)
          .order('created_at', { ascending: false });

        if (partsError) throw partsError;

        // Transform data to include images array
        const transformedParts: Part[] = (partsData || []).map((part: any) => ({
          ...part,
          price: Number(part.price),
          original_price: part.original_price ? Number(part.original_price) : null,
          condition: part.condition || 'used',
          in_stock: part.in_stock ?? true,
          fast_delivery: part.fast_delivery ?? false,
          images: (part.part_images || [])
            .sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0))
            .map((img: any) => img.image_url),
        }));

        setParts(transformedParts);
      } catch (err: any) {
        console.error('Error fetching parts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  return { parts, loading, error };
};

export const usePartBySlug = (slug: string | undefined) => {
  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchPart = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('parts')
          .select(`
            *,
            category:categories(id, name, slug),
            part_images(image_url, display_order)
          `)
          .eq('slug', slug)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (data) {
          const transformedPart: Part = {
            ...data,
            price: Number(data.price),
            original_price: data.original_price ? Number(data.original_price) : null,
            images: (data.part_images || [])
              .sort((a: any, b: any) => a.display_order - b.display_order)
              .map((img: any) => img.image_url),
          };
          setPart(transformedPart);
        }
      } catch (err: any) {
        console.error('Error fetching part:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [slug]);

  return { part, loading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (fetchError) throw fetchError;

        setCategories(data || []);
      } catch (err: any) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
