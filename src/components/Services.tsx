import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Wrench, 
  Zap, 
  Car, 
  ArrowRight,
  Settings,
  Shield,
  Clock
} from "lucide-react";
import carPartsImage from "@/assets/car-parts.jpg";
import electricalImage from "@/assets/electrical-shop.jpg";
import accidentCarsImage from "@/assets/accident-cars.jpg";

const Services = () => {
  const services = [
    {
      icon: ShoppingBag,
      title: "Car Parts Store",
      description: "Extensive inventory of new and used Fiat parts. Quality guaranteed with competitive pricing.",
      image: carPartsImage,
      features: ["New & Used Parts", "Quality Guarantee", "Competitive Prices", "Fast Delivery"],
      cta: "Browse Parts",
      href: "/parts"
    },
    {
      icon: Wrench,
      title: "Mechanical Workshop",
      description: "Expert mechanical repairs and servicing by certified technicians for all Fiat models.",
      image: "/api/placeholder/400/300",
      features: ["Certified Technicians", "All Fiat Models", "Service & Repairs", "MOT Testing"],
      cta: "Book Service",
      href: "/workshop"
    },
    {
      icon: Zap,
      title: "Auto Electrical Shop",
      description: "Specialized electrical diagnostics and repairs using the latest automotive technology.",
      image: electricalImage,
      features: ["Electrical Diagnostics", "ECU Programming", "Wiring Repairs", "Battery Testing"],
      cta: "Get Diagnosis",
      href: "/workshop"
    },
    {
      icon: Car,
      title: "Buy Accident Cars",
      description: "We purchase accident-damaged vehicles and non-runners. Quick valuation and fair prices.",
      image: accidentCarsImage,
      features: ["Quick Valuation", "Fair Prices", "Free Collection", "Instant Payment"],
      cta: "Get Quote",
      href: "/buy-car"
    }
  ];

  return (
    <section className="py-20 bg-gradient-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Complete Automotive Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From sourcing the right parts to expert repairs and vehicle purchasing, 
            we provide comprehensive automotive services under one roof.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-automotive transition-all duration-300 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-automotive-gray/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-3">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link to={service.href} className="block">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    {service.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">Why Choose 1stop Fiat Stop?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/10 rounded-full p-4">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">Expert Knowledge</h4>
              <p className="text-muted-foreground text-center">
                Specialized in Fiat vehicles with years of experience and certified technicians.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/10 rounded-full p-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">Quality Guarantee</h4>
              <p className="text-muted-foreground text-center">
                All parts and services come with comprehensive warranties for your peace of mind.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/10 rounded-full p-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">Fast Service</h4>
              <p className="text-muted-foreground text-center">
                Quick turnaround times and efficient service to get you back on the road.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;