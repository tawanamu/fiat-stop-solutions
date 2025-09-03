import { useState } from "react";
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
  Clock,
  Maximize2,
  X,
  MessageCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CarDetails = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  // Car data - in a real app, this would come from an API
  const cars = [
    {
      id: 1,
      make: "Fiat",
      model: "Strada 1.4 8v",
      year: 2011,
      mileage: 0, // Not specified in the information
      price: 50000,
      condition: "Needs Work",
      fuelType: "Petrol",
      transmission: "Manual",
      color: "Not specified",
      location: "Durban",
      images: [
        "/cars/strada_00.jpg",
        "/cars/strada_01.jpg",
        "/cars/strada_02.jpg",
        "/cars/strada_03.jpg",
        "/cars/strada_04.jpg",
        "/cars/strada_05.jpg"
      ],
      features: ["Logbook Available", "Engine Changed", "Police Clearance Needed"],
      description: "Fiat Strada 1.4 8v 2011 with logbook available. Vehicle license expires next year. Engine has been changed and police clearance is needed. Price includes all necessary repairs to be done. Contact for more details.",
      specifications: {
        engineSize: "1.4L",
        doors: 2,
        seats: 2,
        bodyType: "Bakkie",
        drivetrain: "Rear Wheel Drive",
        fuelCapacity: "50L",
        servicePlan: "No"
      },
      contact: {
        name: "1stop Fiat Stop",
        phone: "+27 82 068 8246",
        email: "1stopshop@gmail.com",
        location: "Durban, KZN"
      },
      history: {
        owners: 1,
        accidents: 0,
        serviceRecords: "Partial",
        lastService: "Engine changed"
      },
      repairsNeeded: [
        "Change drive side headlight",
        "Change left side tail light", 
        "Change front windscreen",
        "Need to change combination switch",
        "Fix exhaust leak",
        "Brakes need to be done",
        "One or two small things"
      ],
      notes: "Can do R50k on this one. Can do all repairs on the bakkie and get it sorted out. Need couple of days and a deposit."
    },
    {
      id: 2,
      make: "Fiat",
      model: "Palio 1.6 16v",
      year: 2010,
      mileage: 0, // Not specified in the information
      price: 40000,
      condition: "Needs Work",
      fuelType: "Petrol",
      transmission: "Manual",
      color: "Green",
      location: "Durban",
      images: [
        "/cars/pialo_00.jpg",
        "/cars/pialo_01.jpg",
        "/cars/pialo_02.jpg",
        "/cars/pialo_03.jpg",
        "/cars/pialo_04.jpg",
      ],
      features: ["Power Steering", "Air Conditioning", "Logbook Available"],
      description: "Fiat Palio 1.6 16v 2010 in green. Vehicle has logbook and disc expires 10th month this year. Vehicle still on custom name. Recently acquired vehicle with some issues that need attention.",
      specifications: {
        engineSize: "1.6L",
        doors: 5,
        seats: 5,
        bodyType: "Hatchback",
        drivetrain: "Front Wheel Drive",
        fuelCapacity: "45L",
        servicePlan: "No"
      },
      contact: {
        name: "1stop Fiat Stop",
        phone: "+27 82 068 8246",
        email: "1stopshop@gmail.com",
        location: "Durban, KZN"
      },
      history: {
        owners: 1,
        accidents: 0,
        serviceRecords: "Partial",
        lastService: "Recently acquired"
      },
      repairsNeeded: [
        "Need set of tyres",
        "Brakes need to be done",
        "Window clips are broken",
        "Power steering is leaking but still drives with soft steering",
        "Air conditioning needs gas",
        "Rev gets stuck just above 10,000rpm - need to change throttle body",
        "Driver side fog cover - can't find replacement"
      ],
      notes: "This green Palio was just acquired so hasn't been driven much. Can do R40k on this one. Contact for more details."
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
      case 'Needs Work': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
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
                   <div className="relative group aspect-[4/3]">
                     <img 
                       src={car.images[selectedImageIndex]} 
                       alt={`${car.make} ${car.model}`}
                       className="w-full h-full object-cover cursor-pointer"
                       onClick={() => setIsFullscreenOpen(true)}
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
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-black/50 hover:bg-black/70 text-white"
                        onClick={() => setIsFullscreenOpen(true)}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Image Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {car.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${car.make} ${car.model} ${index + 1}`}
                      className={`w-full h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity border-2 ${
                        selectedImageIndex === index 
                          ? 'border-primary opacity-100' 
                          : 'border-transparent opacity-70'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
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
                        <p className="font-semibold">{car.mileage > 0 ? `${car.mileage.toLocaleString()} km` : 'Not specified'}</p>
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

                {/* Repairs Needed */}
                {car.repairsNeeded && car.repairsNeeded.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 text-orange-600">Repairs Needed</h3>
                      <div className="space-y-2">
                        {car.repairsNeeded.map((repair, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-orange-500 mr-2 mt-1">•</span>
                            <span className="text-sm">{repair}</span>
                          </div>
                        ))}
                      </div>
                      {car.notes && (
                        <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <p className="text-sm text-orange-800 dark:text-orange-200">
                            <strong>Note:</strong> {car.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

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
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full"
                        onClick={() => {
                          const phoneNumber = car.contact.phone.replace(/\s/g, '');
                          const message = `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} for R${car.price.toLocaleString()}. Can you provide more details?`;
                          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                      >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        WhatsApp
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
                          <MessageCircle className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">WhatsApp Available</span>
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

      {/* Fullscreen Image Modal */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <img 
              src={car.images[selectedImageIndex]} 
              alt={`${car.make} ${car.model}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsFullscreenOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            {/* Navigation Arrows */}
            {car.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : car.images.length - 1)}
                >
                  ←
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => setSelectedImageIndex(selectedImageIndex < car.images.length - 1 ? selectedImageIndex + 1 : 0)}
                >
                  →
                </Button>
              </>
            )}
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {car.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;