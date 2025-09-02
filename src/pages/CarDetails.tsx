import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Heart,
  Share2,
  CheckCircle,
  User,
  Clock
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CarDetails = () => {
  const { id } = useParams();

  // Car data - in a real app, this would come from an API
  const cars = [
    {
      id: 1,
      make: "Fiat",
      model: "500",
      year: 2018,
      mileage: 45000,
      price: 85000,
      condition: "Excellent",
      fuelType: "Petrol",
      transmission: "Manual",
      color: "Red",
      location: "Durban",
      images: [
        "/parts/fiat-punto-engine.jpg",
        "/parts/fiat-punto-engine_00.jpg",
        "/parts/fiat-punto-engine_01.jpg",
        "/parts/fiat-punto-engine_02.jpg"
      ],
      features: ["Air Conditioning", "Electric Windows", "Central Locking", "Alloy Wheels", "Power Steering", "ABS Brakes", "Airbags", "Radio/CD"],
      description: "Beautiful Fiat 500 in excellent condition. One owner, full service history. Perfect city car with great fuel economy. This vehicle has been meticulously maintained and is ready for its next owner. Recent service includes new tires, oil change, and full inspection. No accidents, clean title.",
      specifications: {
        engineSize: "1.2L",
        doors: 3,
        seats: 4,
        bodyType: "Hatchback",
        drivetrain: "Front Wheel Drive",
        fuelCapacity: "35L",
        servicePlan: "Yes"
      },
      contact: {
        name: "John Smith",
        phone: "+27 82 123 4567",
        email: "john@example.com",
        location: "Durban, KZN"
      },
      history: {
        owners: 1,
        accidents: 0,
        serviceRecords: "Full",
        lastService: "2023-11-15"
      }
    },
    {
      id: 2,
      make: "Fiat",
      model: "Punto",
      year: 2016,
      mileage: 78000,
      price: 65000,
      condition: "Good",
      fuelType: "Petrol",
      transmission: "Manual",
      color: "White",
      location: "Cape Town",
      images: [
        "/parts/fiat-punto-engine_01.jpg",
        "/parts/fiat-punto-engine.jpg",
        "/parts/fiat-punto-engine_00.jpg"
      ],
      features: ["Radio/CD", "Power Steering", "Electric Windows", "Remote Central Locking", "ABS Brakes", "Airbags"],
      description: "Reliable Fiat Punto with recent service. Great first car or economical daily driver. Well maintained with good service history. Perfect for city driving with excellent fuel efficiency.",
      specifications: {
        engineSize: "1.4L",
        doors: 5,
        seats: 5,
        bodyType: "Hatchback",
        drivetrain: "Front Wheel Drive",
        fuelCapacity: "45L",
        servicePlan: "No"
      },
      contact: {
        name: "Sarah Johnson",
        phone: "+27 84 567 8901",
        email: "sarah@example.com",
        location: "Cape Town, WC"
      },
      history: {
        owners: 2,
        accidents: 0,
        serviceRecords: "Good",
        lastService: "2023-10-20"
      }
    }
  ];

  const car = cars.find(c => c.id === parseInt(id || '0'));

  if (!car) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Car Not Found</h1>
            <p className="text-muted-foreground mb-8">The car you're looking for doesn't exist.</p>
            <Link to="/second-hand-cars">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Listings
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Very Good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Good': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Navigation */}
        <section className="py-4 border-b">
          <div className="container mx-auto px-4">
            <Link to="/second-hand-cars" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Car Listings
            </Link>
          </div>
        </section>

        {/* Car Details */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Images and Details */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Main Image */}
                <Card className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src={car.images[0]} 
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={getConditionColor(car.condition)}>
                        {car.condition}
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground text-lg px-3 py-1">
                        R{car.price.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Image Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {car.images.slice(1).map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${car.make} ${car.model} ${index + 2}`}
                      className="w-full h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>

                {/* Car Information */}
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        {car.year} {car.make} {car.model}
                      </h1>
                      <p className="text-muted-foreground text-lg">{car.color} • {car.location}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div className="text-center">
                        <Gauge className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Mileage</p>
                        <p className="font-semibold">{car.mileage.toLocaleString()} km</p>
                      </div>
                      <div className="text-center">
                        <Fuel className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Fuel Type</p>
                        <p className="font-semibold">{car.fuelType}</p>
                      </div>
                      <div className="text-center">
                        <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Year</p>
                        <p className="font-semibold">{car.year}</p>
                      </div>
                      <div className="text-center">
                        <Cog className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Transmission</p>
                        <p className="font-semibold">{car.transmission}</p>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Description</h3>
                      <p className="text-muted-foreground leading-relaxed">{car.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Specifications */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Engine Size:</span>
                        <span className="font-medium">{car.specifications.engineSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Doors:</span>
                        <span className="font-medium">{car.specifications.doors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Seats:</span>
                        <span className="font-medium">{car.specifications.seats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Body Type:</span>
                        <span className="font-medium">{car.specifications.bodyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Drivetrain:</span>
                        <span className="font-medium">{car.specifications.drivetrain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fuel Capacity:</span>
                        <span className="font-medium">{car.specifications.fuelCapacity}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Features & Equipment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {car.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle History */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Vehicle History</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground mr-2">Previous Owners:</span>
                        <span className="font-medium">{car.history.owners}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">Accidents:</span>
                        <span className="font-medium">{car.history.accidents}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">Service Records:</span>
                        <span className="font-medium">{car.history.serviceRecords}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground mr-2">Last Service:</span>
                        <span className="font-medium">{car.history.lastService}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Contact and Actions */}
              <div className="space-y-6">
                
                {/* Price and Actions */}
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <p className="text-3xl font-bold text-primary mb-2">R{car.price.toLocaleString()}</p>
                      <p className="text-muted-foreground">Negotiable</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <Button size="lg" className="w-full">
                        <Phone className="h-5 w-5 mr-2" />
                        Call Seller
                      </Button>
                      <Button variant="outline" size="lg" className="w-full">
                        <Mail className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="lg" className="flex-1">
                          <Heart className="h-5 w-5 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1">
                          <Share2 className="h-5 w-5 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Seller Information */}
                    <div>
                      <h4 className="font-semibold mb-4">Seller Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="font-medium">{car.contact.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{car.contact.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{car.contact.email}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{car.contact.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Facts */}
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Quick Facts</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Condition:</span>
                        <Badge className={getConditionColor(car.condition)} variant="outline">
                          {car.condition}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service Plan:</span>
                        <span className="font-medium">{car.specifications.servicePlan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Body Type:</span>
                        <span className="font-medium">{car.specifications.bodyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{car.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Cars */}
        <section className="py-12 bg-gradient-surface">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Similar Cars You Might Like
            </h2>
            <div className="text-center">
              <Link to="/second-hand-cars">
                <Button variant="outline" size="lg">
                  View All Cars
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarDetails;