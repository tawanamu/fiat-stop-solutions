import { useEffect, useState } from "react";
import { sanityClient } from "@/lib/sanityClient";

type Part = any;
type Car = any;

// Mock data for when Sanity API is not accessible
const mockParts: Part[] = [
  {
    _id: "1",
    title: "Fiat Punto Head Gasket",
    slug: { current: "fiat-punto-head-gasket" },
    partNumber: "FP-HG-001",
    price: 450.00,
    originalPrice: 600.00,
    condition: "New",
    inStock: true,
    fastDelivery: true,
    images: [{ asset: { _ref: "image-ref-1" } }],
    description: "High-quality head gasket for Fiat Punto engines"
  },
  {
    _id: "2",
    title: "Fiat Punto Thermostat Housing",
    slug: { current: "fiat-punto-thermostat-housing" },
    partNumber: "FP-TH-002",
    price: 280.00,
    condition: "Used",
    inStock: true,
    fastDelivery: false,
    images: [{ asset: { _ref: "image-ref-2" } }],
    description: "Complete thermostat housing assembly"
  },
  {
    _id: "3",
    title: "Fiat Punto Oil Cooler Housing",
    slug: { current: "fiat-punto-oil-cooler-housing" },
    partNumber: "FP-OC-003",
    price: 320.00,
    condition: "New",
    inStock: false,
    fastDelivery: false,
    images: [{ asset: { _ref: "image-ref-3" } }],
    description: "Oil cooler housing with oil filter housing"
  },
  {
    _id: "4",
    title: "Fiat Punto Linear Starter",
    slug: { current: "fiat-punto-linear-starter" },
    partNumber: "FP-LS-004",
    price: 850.00,
    originalPrice: 1200.00,
    condition: "New",
    inStock: true,
    fastDelivery: true,
    images: [{ asset: { _ref: "image-ref-4" } }],
    description: "High-performance linear starter motor"
  },
  {
    _id: "5",
    title: "Fiat Punto Rear Brake Cylinders",
    slug: { current: "fiat-punto-rear-brake-cylinders" },
    partNumber: "FP-RBC-005",
    price: 180.00,
    condition: "Used",
    inStock: true,
    fastDelivery: false,
    images: [{ asset: { _ref: "image-ref-5" } }],
    description: "Set of rear brake cylinders"
  },
  {
    _id: "6",
    title: "Fiat Punto Shock Saddle",
    slug: { current: "fiat-punto-shock-saddle" },
    partNumber: "FP-SS-006",
    price: 95.00,
    condition: "New",
    inStock: true,
    fastDelivery: true,
    images: [{ asset: { _ref: "image-ref-6" } }],
    description: "Shock absorber saddle mounting"
  }
];

export function useParts() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const q = `*[_type == "part"] | order(createdAt desc){
      _id, title, slug, partNumber, price, originalPrice, condition, inStock, fastDelivery, images, description
    }`;
    
    sanityClient.fetch(q)
      .then((res) => {
        setParts(res);
      })
      .catch((error) => {
        console.warn("Sanity API not accessible, using mock data:", error);
        setParts(mockParts);
      })
      .finally(() => setLoading(false));
  }, []);
  
  return { parts, loading };
}

// Mock data for cars
const mockCars: Car[] = [
  {
    _id: "1",
    title: "Fiat Punto 1.2 Active",
    make: "Fiat",
    model: "Punto",
    year: 2015,
    mileage: 85000,
    price: 85000,
    condition: "Used",
    fuelType: "Petrol",
    transmission: "Manual",
    color: "White",
    location: "Cape Town",
    images: [{ asset: { _ref: "car-image-ref-1" } }],
    features: ["Air Conditioning", "Power Steering", "Central Locking"],
    description: "Well-maintained Fiat Punto in excellent condition",
    contact: "+27 21 123 4567"
  }
];

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const q = `*[_type == "car"] | order(createdAt desc){
      _id, title, make, model, year, mileage, price, condition, fuelType, transmission, color, location, images, features, description, contact
    }`;
    
    sanityClient.fetch(q)
      .then((res) => setCars(res))
      .catch((error) => {
        console.warn("Sanity API not accessible, using mock data:", error);
        setCars(mockCars);
      })
      .finally(() => setLoading(false));
  }, []);
  
  return { cars, loading };
}
