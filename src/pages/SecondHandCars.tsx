import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Phone,
  Mail,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Eye,
  Heart,
  Grid,
  List,
  MessageCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SecondHandCars = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
      image: "/cars/strada_00.jpg",
      features: ["Logbook Available", "Engine Changed",],
      description: "Fiat Strada 1.4 8v 2011 with logbook available. Vehicle license expires next year. Engine has been changed and police clearance is needed. Price includes all necessary repairs to be done. Contact for more details.",
      contact: {
        name: "1stop Fiat Stop",
        phone: "+27 82 068 8246",
        email: "1stopshop@gmail.com"
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
      image: "/cars/pialo_00.jpg",
      features: ["Power Steering", "Air Conditioning", "Logbook Available"],
      description: "Fiat Palio 1.6 16v 2010 in green. Vehicle has logbook and disc expires 10th month this year. Vehicle still on custom name. Recently acquired vehicle with some issues that need attention.",
      contact: {
        name: "1stop Fiat Stop",
        phone: "+27 82 068 8246",
        email: "1stopshop@gmail.com"
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
    },
  ];



  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Very Good': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      case 'Needs Work': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CarCard = ({ car }: { car: typeof cars[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/car-details/${car.id}`}>
        <div className="relative">
          <img 
            src={car.image} 
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className={getConditionColor(car.condition)}>
              {car.condition}
            </Badge>
          </div>
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              R{car.price.toLocaleString()}
            </Badge>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-1">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="text-muted-foreground text-sm">{car.color} • {car.location}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Gauge className="h-4 w-4 mr-2" />
            {car.mileage.toLocaleString()} km
          </div>
          <div className="flex items-center text-muted-foreground">
            <Fuel className="h-4 w-4 mr-2" />
            {car.fuelType}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {car.year}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Cog className="h-4 w-4 mr-2" />
            {car.transmission}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {car.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {car.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {car.features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{car.features.length - 3} more
            </Badge>
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">{car.contact.name}</p>
              <p className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {car.location}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => {
                const phoneNumber = car.contact.phone.replace(/\s/g, '');
                const message = `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} for R${car.price.toLocaleString()}. Can you provide more details?`;
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Link to={`/car-details/${car.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CarListItem = ({ car }: { car: typeof cars[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative w-64 flex-shrink-0">
            <img 
              src={car.image} 
              alt={`${car.make} ${car.model}`}
              className="w-full h-40 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className={getConditionColor(car.condition)}>
                {car.condition}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {car.year} {car.make} {car.model}
                </h3>
                <p className="text-muted-foreground text-sm">{car.color} • {car.location}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">R{car.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Gauge className="h-4 w-4 mr-2" />
                {car.mileage.toLocaleString()} km
              </div>
              <div className="flex items-center text-muted-foreground">
                <Fuel className="h-4 w-4 mr-2" />
                {car.fuelType}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {car.year}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Cog className="h-4 w-4 mr-2" />
                {car.transmission}
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-4">
              {car.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {car.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">{car.contact.name}</p>
                <p className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {car.location}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const phoneNumber = car.contact.phone.replace(/\s/g, '');
                    const message = `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} for R${car.price.toLocaleString()}. Can you provide more details?`;
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Link to={`/car-details/${car.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-surface py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Quality Second-Hand Cars
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Browse our selection of carefully inspected used Fiat vehicles. 
                Find your perfect car with detailed specifications and competitive prices.
              </p>
            </div>
          </div>
        </section>

        {/* View Toggle */}
        <section className="py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {cars.length} cars
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Car Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {cars.map((car) => (
                  <CarListItem key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-surface">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us and we'll help you find the perfect second-hand car that meets your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8">
                <Phone className="h-5 w-5 mr-2" />
                Call: +27 82 068 8246
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Mail className="h-5 w-5 mr-2" />
                Email Us
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" />
                1stopshop@gmail.com
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="h-4 w-4 mr-2" />
                119 Houghton Rd, Clairwood, Durban, 4052
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecondHandCars;