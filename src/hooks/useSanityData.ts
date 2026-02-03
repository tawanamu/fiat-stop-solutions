// src/hooks/useSanityData.ts
import { useEffect, useState } from "react";
import { sanityClient } from "@/lib/sanityClient";

export const useParts = () => {
  const [parts, setParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParts = async () => {
      const data = await sanityClient.fetch(`
        *[_type == "part"] | order(_createdAt desc) {
          _id,
          title,
          slug,
          partNumber,
          price,
          originalPrice,
          condition,
          inStock,
          fastDelivery,
          images
        }
      `);

      setParts(data);
      setLoading(false);
    };

    fetchParts();
  }, []);

  return { parts, loading };
};
