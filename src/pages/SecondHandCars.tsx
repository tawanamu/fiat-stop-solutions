import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Search, 
  Filter,
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
  ChevronDown
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SecondHandCars = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

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
      image: "/parts/fiat-punto-engine.jpg",
      features: ["Air Conditioning", "Electric Windows", "Central Locking", "Alloy Wheels"],
      description: "Beautiful Fiat 500 in excellent condition. One owner, full service history. Perfect city car with great fuel economy.",
      contact: {
        name: "John Smith",
        phone: "+27 82 123 4567",
        email: "john@example.com"
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
      image: "/parts/fiat-punto-engine_01.jpg",
      features: ["Radio/CD", "Power Steering", "Electric Windows", "Remote Central Locking"],
      description: "Reliable Fiat Punto with recent service. Great first car or economical daily driver. Well maintained.",
      contact: {
        name: "Sarah Johnson",
        phone: "+27 84 567 8901",
        email: "sarah@example.com"
      }
    },
    {
      id: 3,
      make: "Fiat",
      model: "500X",
      year: 2019,
      mileage: 32000,
      price: 145000,
      condition: "Excellent",
      fuelType: "Petrol",
      transmission: "Automatic",
      color: "Blue",
      location: "Johannesburg",
      image: "/parts/fiat-punto-engine_02.jpg",
      features: ["Leather Seats", "Navigation", "Bluetooth", "Cruise Control", "Sunroof"],
      description: "Premium Fiat 500X crossover. Low mileage, excellent condition. Perfect for city and highway driving.",
      contact: {
        name: "Mike Wilson",
        phone: "+27 83 234 5678",
        email: "mike@example.com"
      }
    },
    {
      id: 4,
      make: "Fiat",
      model: "Panda",
      year: 2017,
      mileage: 55000,
      price: 75000,
      condition: "Good",
      fuelType: "Petrol",
      transmission: "Manual",
      color: "Silver",
      location: "Pretoria",
      image: "/parts/fiat-punto-engine_03.jpg",
      features: ["Air Conditioning", "Radio", "Power Steering", "Central Locking"],
      description: "Compact and economical Fiat Panda. Perfect for urban driving with excellent fuel efficiency.",
      contact: {
        name: "Lisa Brown",
        phone: "+27 81 345 6789",
        email: "lisa@example.com"
      }
    },
    {
      id: 5,
      make: "Fiat",
      model: "Tipo",
      year: 2020,
      mileage: 25000,
      price: 125000,
      condition: "Excellent",
      fuelType: "Petrol",
      transmission: "Manual",
      color: "Black",
      location: "Port Elizabeth",
      image: "/parts/linear-starter.jpg",
      features: ["Touchscreen", "Apple CarPlay", "Air Conditioning", "Alloy Wheels", "Rear Camera"],
      description: "Modern Fiat Tipo sedan with latest tech features. Low mileage, still under warranty. Excellent family car.",
      contact: {
        name: "David Davis",
        phone: "+27 82 456 7890",
        email: "david@example.com"
      }
    },
    {
      id: 6,
      make: "Fiat",
      model: "500C",
      year: 2019,
      mileage: 38000,
      price: 95000,
      condition: "Very Good",
      fuelType: "Petrol",
      transmission: "Manual",
      color: "Yellow",
      location: "Durban",
      image: "/parts/regulator.jpg",
      features: ["Convertible Roof", "Premium Sound", "Leather Interior", "Climate Control"],
      description: "Stunning Fiat 500C convertible. Perfect for coastal drives. Well maintained with premium features.",
      contact: {
        name: "Emma Thompson",
        phone: "+27 84 567 8901",
        email: "emma@example.com"
      }
    }
  ];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.color.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMake = !selectedMake || selectedMake === 'all-makes' || car.make === selectedMake;
    const matchesCondition = !selectedCondition || selectedCondition === 'all-conditions' || car.condition === selectedCondition;
    const matchesYear = !selectedYear || selectedYear === 'all-years' || car.year.toString() === selectedYear;
    const matchesPrice = !priceRange || priceRange === 'all-prices' || 
      (priceRange === "under-50k" && car.price < 50000) ||
      (priceRange === "50k-100k" && car.price >= 50000 && car.price < 100000) ||
      (priceRange === "100k-150k" && car.price >= 100000 && car.price < 150000) ||
      (priceRange === "over-150k" && car.price >= 150000);
    
    return matchesSearch && matchesMake && matchesCondition && matchesYear && matchesPrice;
  });

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Very Good': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CarCard = ({ car }: { car: typeof cars[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
            <Button variant="outline" size="sm" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
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
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
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

        {/* Search and Filters */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by make, model, or color..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={selectedMake} onValueChange={setSelectedMake}>
                  <SelectTrigger>
                    <SelectValue placeholder="Make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-makes">All Makes</SelectItem>
                    <SelectItem value="Fiat">Fiat</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-years">All Years</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                    <SelectItem value="2018">2018</SelectItem>
                    <SelectItem value="2017">2017</SelectItem>
                    <SelectItem value="2016">2016</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-prices">All Prices</SelectItem>
                    <SelectItem value="under-50k">Under R50,000</SelectItem>
                    <SelectItem value="50k-100k">R50,000 - R100,000</SelectItem>
                    <SelectItem value="100k-150k">R100,000 - R150,000</SelectItem>
                    <SelectItem value="over-150k">Over R150,000</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-conditions">All Conditions</SelectItem>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Very Good">Very Good</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing {filteredCars.length} of {cars.length} cars
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
          </div>
        </section>

        {/* Car Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCars.map((car) => (
                  <CarListItem key={car.id} car={car} />
                ))}
              </div>
            )}

            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No cars found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria to find more results.
                </p>
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