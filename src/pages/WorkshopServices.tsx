import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  Zap, 
  CheckCircle, 
  Clock, 
  Award, 
  Phone,
  Calendar,
  Settings,
  Battery,
  Cpu,
  Gauge
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import workshopImage from "@/assets/workshop-hero.jpg";
import electricalImage from "@/assets/electrical-shop.jpg";

const WorkshopServices = () => {
  const mechanicalServices = [
    {
      name: "Full Service & MOT",
      description: "Comprehensive vehicle service including MOT testing",
      popular: true
    },
    {
      name: "Brake System Repair",
      description: "Brake pads, discs, fluid replacement and brake system diagnostics",
      popular: false
    },
    {
      name: "Engine Diagnostics",
      description: "Professional diagnostic testing to identify engine issues",
      popular: false
    },
    {
      name: "Clutch Replacement",
      description: "Expert clutch repair and replacement for all Fiat models",
      popular: false
    },
    {
      name: "Suspension Repair",
      description: "Struts, springs, and suspension component replacement",
      popular: false
    },
    {
      name: "Timing Belt Service",
      description: "Timing belt replacement with water pump service",
      popular: true
    }
  ];

  const electricalServices = [
    {
      name: "ECU Diagnostics & Programming",
      description: "Advanced ECU fault diagnosis and software programming",
      popular: true
    },
    {
      name: "Battery Testing & Replacement",
      description: "Professional battery testing and genuine battery replacement",
      popular: false
    },
    {
      name: "Alternator & Starter Motor",
      description: "Repair and replacement of charging and starting systems",
      popular: false
    },
    {
      name: "Wiring Loom Repair",
      description: "Professional automotive wiring repairs and modifications",
      popular: false
    },
    {
      name: "Air Conditioning Service",
      description: "A/C system diagnostics, repair and re-gas service",
      popular: true
    },
    {
      name: "Dashboard Warning Lights",
      description: "Diagnose and resolve all dashboard warning light issues",
      popular: false
    }
  ];

  const qualifications = [
    "ASE Certified Technicians",
    "Fiat Authorized Service Center", 
    "10+ Years Experience",
    "Latest Diagnostic Equipment",
    "12-Month Parts & Labor Warranty",
    "Insurance Approved Repairs"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src= "https://ik.imagekit.io/secula/One%20Stop%20Fiat%20Shop/1G5A4741.jpg?updatedAt=1758577166874" 
              alt="Professional automotive workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-automotive-gray/90 to-automotive-gray/70" />
          </div>
          
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Professional Workshop & Auto Electrical Services
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Complete mechanical and electrical repair services for all Fiat models. 
                Expert technicians using the latest diagnostic equipment and genuine parts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-service">
                  <Button size="lg" className="text-lg px-8">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Service
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-automotive-gray">
                  <Phone className="h-5 w-5 mr-2" />
                  Call: +27 82 068 8246
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-gradient-surface">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Certified Experts</h3>
                <p className="text-muted-foreground text-sm">ASE certified technicians with Fiat specialization</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground text-sm">12-month warranty on all parts and labor</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Same Day Service</h3>
                <p className="text-muted-foreground text-sm">Many repairs completed same day</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mechanical Workshop Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4 mr-4">
                    <Wrench className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Mechanical Workshop</h2>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  Professional mechanical repairs and servicing for all Fiat models by experienced technicians
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mechanicalServices.map((service) => (
                <Card key={service.name} className="relative group hover:shadow-automotive transition-all duration-300">
                  {service.popular && (
                    <div className="absolute -top-3 left-4 z-10">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-semibold text-foreground text-lg leading-tight">{service.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <Link to="/book-service">
                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        <Settings className="h-4 w-4 mr-2" />
                        Book Service
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Auto Electrical Services */}
        <section className="py-16 bg-gradient-surface">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4 mr-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Auto Electrical Services</h2>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  Specialized electrical diagnostics and repairs using cutting-edge automotive technology
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {electricalServices.map((service) => (
                <Card key={service.name} className="relative group hover:shadow-automotive transition-all duration-300">
                  {service.popular && (
                    <div className="absolute -top-3 left-4 z-10">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-semibold text-foreground text-lg leading-tight">{service.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <Link to="/book-service">
                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        <Zap className="h-4 w-4 mr-2" />
                        Book Service
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment & Capabilities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">State-of-the-Art Equipment</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We invest in the latest diagnostic and repair equipment to provide accurate, efficient service
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src= "https://ik.imagekit.io/secula/One%20Stop%20Fiat%20Shop/1G5A4743.jpg?updatedAt=1758577084994"
                  alt="Modern automotive diagnostic equipment"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Professional Capabilities</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Cpu className="h-5 w-5 text-primary" />
                    <span className="text-foreground">OBD-II Diagnostics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Battery className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Battery Testing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Gauge className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Engine Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-primary" />
                    <span className="text-foreground">ECU Programming</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">MOT Testing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="text-foreground">A/C Service</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold text-foreground mb-4">Our Qualifications</h4>
                  <div className="space-y-2">
                    {qualifications.map((qualification, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground text-sm">{qualification}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-16 bg-gradient-surface">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Book Your Service?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Expert Fiat servicing and repairs with transparent pricing and quality guarantee. 
              Book your appointment today or call for urgent repairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-service">
                <Button size="lg" className="text-lg px-8">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Online
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Phone className="h-5 w-5 mr-2" />
                Call: +27 82 068 8246
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Emergency repairs available • Same day service on many repairs • Free estimates
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkshopServices;