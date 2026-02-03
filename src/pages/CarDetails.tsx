import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  ArrowLeft,
  Phone,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  CheckCircle,
  X,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock car data - in a real app this would come from the database
const mockCars = [
  {
    slug: "fiat-palio-2018",
    title: "Fiat Palio",
    price: 85000,
    year: 2018,
    mileage: "120,000 km",
    condition: "Good",
    fuelType: "Petrol",
    transmission: "Manual",
    color: "Silver",
    location: "Durban",
    description: "Well-maintained Fiat Palio with full service history. Perfect for city driving.",
    images: ["/cars/pialo_00.jpg", "/cars/pialo_01.jpg", "/cars/pialo_02.jpg", "/cars/pialo_03.jpg", "/cars/pialo_04.jpg"],
    features: ["Air Conditioning", "Power Steering", "Electric Windows", "Central Locking", "Radio/CD Player"],
    contact: { name: "One Stop Fiat Spares", phone: "27820688246", location: "119 Houghton Rd, Clairwood, Durban" }
  },
  {
    slug: "fiat-strada-2019",
    title: "Fiat Strada",
    price: 145000,
    year: 2019,
    mileage: "85,000 km",
    condition: "Very Good",
    fuelType: "Diesel",
    transmission: "Manual",
    color: "White",
    location: "Durban",
    description: "Reliable Fiat Strada pickup. Great for work and personal use.",
    images: ["/cars/strada_00.jpg", "/cars/strada_01.jpg", "/cars/strada_02.jpg", "/cars/strada_03.jpg", "/cars/strada_04.jpg", "/cars/strada_05.jpg"],
    features: ["Air Conditioning", "Power Steering", "Load Bay Cover", "Bull Bar", "Tow Bar"],
    contact: { name: "One Stop Fiat Spares", phone: "27820688246", location: "119 Houghton Rd, Clairwood, Durban" }
  }
];

const CarDetails = () => {
  const { slug } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const car = mockCars.find(c => c.slug === slug);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Very Good":
        return "bg-blue-100 text-blue-800";
      case "Good":
        return "bg-yellow-100 text-yellow-800";
      case "Needs Work":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
          <Link to="/second-hand-cars">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Listings
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        <section className="py-4 border-b">
          <div className="container mx-auto px-4">
            <Link
              to="/second-hand-cars"
              className="inline-flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Car Listings
            </Link>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <Card>
                <div className="relative aspect-[4/3]">
                  <img
                    src={car.images[selectedImageIndex]}
                    alt={car.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setIsFullscreenOpen(true)}
                  />
                  <Badge className={`absolute top-4 right-4 ${getConditionColor(car.condition)}`}>
                    {car.condition}
                  </Badge>
                  <Badge className="absolute top-4 left-4 text-lg">
                    R{car.price.toLocaleString()}
                  </Badge>
                </div>
              </Card>

              {/* Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className={`h-20 w-full object-cover cursor-pointer border-2 rounded ${selectedImageIndex === i ? "border-primary" : "border-transparent"
                      }`}
                    onClick={() => setSelectedImageIndex(i)}
                    alt={`${car.title} view ${i + 1}`}
                  />
                ))}
              </div>

              {/* Info */}
              <Card>
                <CardContent className="p-6">
                  <h1 className="text-3xl font-bold mb-2">
                    {car.year} {car.title}
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    {car.color} • {car.location}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <Gauge className="mx-auto mb-1" />
                      {car.mileage}
                    </div>
                    <div className="text-center">
                      <Fuel className="mx-auto mb-1" />
                      {car.fuelType}
                    </div>
                    <div className="text-center">
                      <Calendar className="mx-auto mb-1" />
                      {car.year}
                    </div>
                    <div className="text-center">
                      <Cog className="mx-auto mb-1" />
                      {car.transmission}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <p className="text-muted-foreground">{car.description}</p>
                </CardContent>
              </Card>

              {/* Features */}
              {car.features?.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Features</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {car.features.map((f, i) => (
                        <div key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <p className="text-3xl font-bold text-center mb-6">
                    R{car.price.toLocaleString()}
                  </p>

                  <Button className="w-full mb-3" asChild>
                    <a href={`tel:+${car.contact.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Seller
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <a 
                      href={`https://wa.me/${car.contact.phone}?text=${encodeURIComponent(`Hi, I'm interested in the ${car.year} ${car.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>

                  <Separator className="my-6" />

                  <h4 className="font-semibold mb-2">Seller</h4>
                  <p>{car.contact.name}</p>
                  <p>+{car.contact.phone}</p>
                  <p className="text-sm text-muted-foreground">{car.contact.location}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* FULLSCREEN */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <img
            src={car.images[selectedImageIndex]}
            className="max-w-full max-h-full"
            alt={car.title}
          />
          <Button
            variant="secondary"
            className="absolute top-4 right-4"
            onClick={() => setIsFullscreenOpen(false)}
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
