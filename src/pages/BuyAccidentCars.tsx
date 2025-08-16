import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Car, 
  CheckCircle, 
  Clock, 
  CreditCard, 
  Truck,
  Phone,
  Mail,
  MapPin,
  Star
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BuyAccidentCars = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    description: '',
    contact: '',
    email: '',
    postcode: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    {
      icon: Clock,
      title: "Quick Valuation",
      description: "Get an instant quote within 24 hours of your submission"
    },
    {
      icon: CreditCard,
      title: "Instant Payment",
      description: "Receive payment immediately upon vehicle collection"
    },
    {
      icon: Truck,
      title: "Free Collection",
      description: "We'll collect your vehicle anywhere in the UK at no cost"
    },
    {
      icon: CheckCircle,
      title: "No Hidden Fees",
      description: "Transparent pricing with no deductions or surprise charges"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Manchester",
      rating: 5,
      comment: "Excellent service! They collected my crashed Fiat 500 within 2 days and paid me R2,500. Much more than I expected!"
    },
    {
      name: "Mike Thompson", 
      location: "Birmingham",
      rating: 5,
      comment: "Professional and honest. No hassle, fair price, and quick collection. Highly recommended!"
    },
    {
      name: "Emma Wilson",
      location: "Leeds",
      rating: 5,
      comment: "My Punto had engine problems and wouldn't start. They still gave me R800 and collected it for free."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-surface py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Sell Your Accident-Damaged Fiat
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                We buy accident-damaged, non-running, and end-of-life Fiat vehicles. 
                Get a fair price with quick valuation, free collection, and instant payment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  Get Instant Quote
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  <Phone className="h-5 w-5 mr-2" />
                  Call: 0123 456 789
                </Button>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="text-center p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Get Your Free Quote</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you with a competitive offer within 24 hours.
                </p>
              </div>

              <Card className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="make">Make</Label>
                      <Select value={formData.make} onValueChange={(value) => handleInputChange('make', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fiat">Fiat</SelectItem>
                          <SelectItem value="abarth">Abarth</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        placeholder="e.g., 500, Punto, Panda"
                        value={formData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        placeholder="e.g., 2015"
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="mileage">Mileage</Label>
                      <Input
                        id="mileage"
                        placeholder="e.g., 50,000"
                        value={formData.mileage}
                        onChange={(e) => handleInputChange('mileage', e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="condition">Vehicle Condition</Label>
                      <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="accident-damaged">Accident Damaged</SelectItem>
                          <SelectItem value="non-runner">Non-Runner</SelectItem>
                          <SelectItem value="engine-problems">Engine Problems</SelectItem>
                          <SelectItem value="bodywork-damage">Bodywork Damage</SelectItem>
                          <SelectItem value="electrical-issues">Electrical Issues</SelectItem>
                          <SelectItem value="end-of-life">End of Life</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="description">Damage Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Please describe the damage or issues with your vehicle..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact">Phone Number</Label>
                      <Input
                        id="contact"
                        placeholder="Your phone number"
                        value={formData.contact}
                        onChange={(e) => handleInputChange('contact', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="postcode">Vehicle Location (Postcode)</Label>
                      <Input
                        id="postcode"
                        placeholder="e.g., M1 1AA"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <Button type="submit" size="lg" className="px-12">
                      <Car className="h-5 w-5 mr-2" />
                      Get My Quote
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      We'll contact you within 24 hours with a competitive offer
                    </p>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-gradient-surface">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-muted-foreground">Simple 4-step process to sell your Fiat</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">1</div>
                <h3 className="font-semibold text-foreground mb-2">Submit Details</h3>
                <p className="text-muted-foreground text-sm">Fill out our quick online form with your vehicle details</p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">2</div>
                <h3 className="font-semibold text-foreground mb-2">Get Quote</h3>
                <p className="text-muted-foreground text-sm">Receive a competitive offer within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">3</div>
                <h3 className="font-semibold text-foreground mb-2">Schedule Collection</h3>
                <p className="text-muted-foreground text-sm">Arrange a convenient time for free vehicle collection</p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">4</div>
                <h3 className="font-semibold text-foreground mb-2">Get Paid</h3>
                <p className="text-muted-foreground text-sm">Receive instant payment when we collect your vehicle</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">What Our Customers Say</h2>
              <p className="text-muted-foreground">Real reviews from satisfied customers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-surface">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Sell Your Fiat?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't let your damaged or non-running Fiat sit and depreciate. Get a fair offer today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8">
                Get Instant Quote
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Phone className="h-5 w-5 mr-2" />
                Call Now: 0123 456 789
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" />
                info@1stopfiatstop.co.uk
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="h-4 w-4 mr-2" />
                Manchester, UK
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyAccidentCars;