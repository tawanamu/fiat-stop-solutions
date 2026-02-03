import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Heart,
  Share2,
  CheckCircle,
  User,
  Clock,
  Maximize2,
  X,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sanityClient } from "@/lib/sanityClient";
import urlFor from "@/lib/sanityImage";

const CarDetails = () => {
  const { slug } = useParams();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await sanityClient.fetch(
          `
          *[_type == "car" && slug.current == $slug][0]{
            title,
            price,
            year,
            mileage,
            condition,
            fuelType,
            transmission,
            color,
            location,
            description,
            images,
            features,
            repairsNeeded,
            notes,
            specifications,
            contact,
            history
          }
        `,
          { slug }
        );

        setCar(data);
      } catch (err) {
        console.error("Failed to load car:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [slug]);

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

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 text-center py-12">Loading car details…</main>
        <Footer />
      </div>
    );
  }

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
                    src={urlFor(car.images[selectedImageIndex]).width(1200).url()}
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
                {car.images.map((img: any, i: number) => (
                  <img
                    key={i}
                    src={urlFor(img).width(300).url()}
                    className={`h-20 w-full object-cover cursor-pointer border-2 ${selectedImageIndex === i ? "border-primary" : "border-transparent"
                      }`}
                    onClick={() => setSelectedImageIndex(i)}
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
                      {car.mileage || "N/A"}
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
                      {car.features.map((f: string, i: number) => (
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

                  <Button className="w-full mb-3">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Seller
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      const msg = `Hi, I'm interested in the ${car.title}`;
                      window.open(
                        `https://wa.me/${car.contact.phone}?text=${encodeURIComponent(msg)}`
                      );
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>

                  <Separator className="my-6" />

                  <h4 className="font-semibold mb-2">Seller</h4>
                  <p>{car.contact.name}</p>
                  <p>{car.contact.phone}</p>
                  <p>{car.contact.location}</p>
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
            src={urlFor(car.images[selectedImageIndex]).url()}
            className="max-w-full max-h-full"
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
