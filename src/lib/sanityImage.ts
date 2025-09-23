import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityClient";

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => {
  // Handle mock data or invalid image sources
  if (!source || !source.asset || !source.asset._ref) {
    return {
      width: () => ({ height: () => ({ url: () => "/placeholder.svg" }) }),
      height: () => ({ width: () => ({ url: () => "/placeholder.svg" }) }),
      url: () => "/placeholder.svg"
    };
  }
  
  return builder.image(source);
};

export default urlFor;
