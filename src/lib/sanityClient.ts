import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "l9pgqup2",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2025-01-01", // use a date string
  useCdn: false, // set to false if you need freshest content
});
