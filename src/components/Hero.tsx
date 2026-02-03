import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Zap, ShoppingBag, Car } from "lucide-react";
import { Link } from "react-router-dom";
import workshopImage from "@/assets/workshop-hero.jpg";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-automotive-gray/90 to-automotive-gray/70 z-10" />
        <img
          src="https://ik.imagekit.io/secula/One%20Stop%20Fiat%20Shop/1G5A4711.jpg?updatedAt=1758577163906"
          alt="Professional automotive workshop"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your One-Stop
            <span className="text-primary block">Fiat Solution</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            From quality car parts to expert repairs and accident car purchases -
            we're your trusted automotive partner in South Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/parts" className="inline-block">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-automotive">
                Browse Car Parts <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link to="/book-service" className="inline-block">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-automotive-gray">
                Book Service
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-primary/20 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-white font-semibold">Parts Store</div>
                <div className="text-gray-300 text-sm">New & Used</div>
              </div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-primary/20 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Wrench className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-white font-semibold">Workshop</div>
                <div className="text-gray-300 text-sm">Expert Repairs</div>
              </div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-primary/20 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-white font-semibold">Electrical</div>
                <div className="text-gray-300 text-sm">Auto Electric</div>
              </div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <div className="bg-primary/20 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Car className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-white font-semibold">Car Buying</div>
                <div className="text-gray-300 text-sm">Accident Cars</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;