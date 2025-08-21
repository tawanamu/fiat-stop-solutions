import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Phone, Mail, MapPin, Clock, Wrench, Zap, Car } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookService = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carMake: "",
    carModel: "",
    carYear: "",
    registrationNumber: "",
    serviceType: "",
    timeSlot: "",
    description: "",
    urgency: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a preferred service date.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Service Booking Submitted",
      description: "We'll contact you within 2 hours to confirm your appointment.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      carMake: "",
      carModel: "",
      carYear: "",
      registrationNumber: "",
      serviceType: "",
      timeSlot: "",
      description: "",
      urgency: ""
    });
    setDate(undefined);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const serviceTypes = [
    { value: "general-service", label: "General Service & MOT" },
    { value: "engine-repair", label: "Engine Repair" },
    { value: "transmission", label: "Transmission Service" },
    { value: "brakes", label: "Brake System Service" },
    { value: "suspension", label: "Suspension & Steering" },
    { value: "electrical-diagnostic", label: "Electrical Diagnostic" },
    { value: "ecu-programming", label: "ECU Programming" },
    { value: "wiring-repair", label: "Wiring Repair" },
    { value: "battery-alternator", label: "Battery & Alternator Service" },
    { value: "air-conditioning", label: "Air Conditioning Service" },
    { value: "other", label: "Other (describe in notes)" }
  ];

  const timeSlots = [
    { value: "08:00", label: "8:00 AM" },
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book Your Service Appointment
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Professional workshop and auto electrical services for your Fiat. 
              Choose your preferred date and time for expert service.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Service Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-sm text-muted-foreground">
                        <a href="tel:+27820688246" className="hover:text-foreground">+27 82 068 8246</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-sm text-muted-foreground">
                        <a href="mailto:1stopshop@gmail.com" className="hover:text-foreground">1stopshop@gmail.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p className="text-sm text-muted-foreground">
                        119 Houghton Rd<br />
                        Clairwood, Durban, 4052
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Hours</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 8:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Services We Offer
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• General Service & MOT</li>
                      <li>• Engine & Transmission</li>
                      <li>• Brake & Suspension</li>
                      <li>• Electrical Diagnostics</li>
                      <li>• ECU Programming</li>
                      <li>• Air Conditioning</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Service Booking Form</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll confirm your appointment within 2 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Vehicle Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Vehicle Information</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="carMake">Make *</Label>
                          <Input
                            id="carMake"
                            placeholder="e.g., Fiat"
                            value={formData.carMake}
                            onChange={(e) => handleChange("carMake", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="carModel">Model *</Label>
                          <Input
                            id="carModel"
                            placeholder="e.g., Punto, 500, Panda"
                            value={formData.carModel}
                            onChange={(e) => handleChange("carModel", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="carYear">Year</Label>
                          <Input
                            id="carYear"
                            placeholder="e.g., 2018"
                            value={formData.carYear}
                            onChange={(e) => handleChange("carYear", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="registrationNumber">Registration Number</Label>
                        <Input
                          id="registrationNumber"
                          placeholder="e.g., ABC 123 GP"
                          value={formData.registrationNumber}
                          onChange={(e) => handleChange("registrationNumber", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Service Details</h3>
                      <div>
                        <Label htmlFor="serviceType">Type of Service *</Label>
                        <Select value={formData.serviceType} onValueChange={(value) => handleChange("serviceType", value)} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map((service) => (
                              <SelectItem key={service.value} value={service.value}>
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Urgency Level</Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleChange("urgency", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="How urgent is this service?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - Can wait a week</SelectItem>
                            <SelectItem value="medium">Medium - Within a few days</SelectItem>
                            <SelectItem value="high">High - As soon as possible</SelectItem>
                            <SelectItem value="urgent">Urgent - Emergency repair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Appointment Scheduling */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Preferred Appointment</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Preferred Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={(date) => date < new Date() || date.getDay() === 0}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label htmlFor="timeSlot">Preferred Time</Label>
                          <Select value={formData.timeSlot} onValueChange={(value) => handleChange("timeSlot", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                  {slot.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <Label htmlFor="description">Additional Notes</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the issue, symptoms, or any specific requirements..."
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        className="min-h-24"
                      />
                    </div>

                    <div className="pt-6 border-t">
                      <Button type="submit" size="lg" className="w-full">
                        <Calendar className="mr-2 h-5 w-5" />
                        Book Service Appointment
                      </Button>
                      <p className="text-sm text-muted-foreground text-center mt-3">
                        We'll contact you within 2 hours to confirm your appointment details.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookService;