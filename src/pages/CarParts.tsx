import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Star,
  Truck,
  Shield,
  Clock,
  Grid,
  List
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CarParts = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (part: any) => {
    addItem({
      id: part.id,
      name: part.name,
      price: part.price,
      originalPrice: part.originalPrice,
      image: part.image,
      condition: part.condition
    });
    
    toast({
      title: "Added to cart!",
      description: `${part.name} has been added to your cart.`,
    });
  };

  const categories = [
    "Engine Parts", "Brake System", "Suspension", "Electrical", 
    "Body Parts", "Interior", "Filters", "Oils & Fluids"
  ];

  const featuredParts = [
    {
      id: 1,
      name: "Fiat 500 Brake Pads Set",
      price: "£45.99",
      originalPrice: "£59.99",
      image: "/api/placeholder/300/200",
      rating: 4.5,
      reviews: 23,
      condition: "New",
      inStock: true,
      fastDelivery: true
    },
    {
      id: 2,
      name: "Punto Engine Oil Filter",
      price: "£12.50",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      reviews: 45,
      condition: "New",
      inStock: true,
      fastDelivery: true
    },
    {
      id: 3,
      name: "Fiat Ducato Headlight (Used)",
      price: "£89.99",
      originalPrice: "£180.00",
      image: "/api/placeholder/300/200",
      rating: 4.2,
      reviews: 12,
      condition: "Used",
      inStock: true,
      fastDelivery: false
    },
    {
      id: 4,
      name: "500X Suspension Strut",
      price: "£125.00",
      image: "/api/placeholder/300/200",
      rating: 4.6,
      reviews: 18,
      condition: "New",
      inStock: true,
      fastDelivery: true
    },
    {
      id: 5,
      name: "Panda Door Handle Set",
      price: "£35.99",
      image: "/api/placeholder/300/200",
      rating: 4.3,
      reviews: 31,
      condition: "New",
      inStock: false,
      fastDelivery: false
    },
    {
      id: 6,
      name: "Fiat Bravo Alternator",
      price: "£195.00",
      originalPrice: "£350.00",
      image: "/api/placeholder/300/200",
      rating: 4.7,
      reviews: 8,
      condition: "Refurbished",
      inStock: true,
      fastDelivery: true
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
                Fiat Car Parts Store
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Extensive inventory of genuine, OEM, and quality aftermarket parts for all Fiat models. 
                New, used, and refurbished parts with guaranteed quality.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for parts by name, part number, or Fiat model..."
                  className="pl-12 pr-24 h-14 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="absolute right-2 top-2 h-10" size="sm">
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground text-sm">Next day delivery on most parts</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground text-sm">12-month warranty on all parts</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Expert Support</h3>
                <p className="text-muted-foreground text-sm">Specialist advice available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories & Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                <Button variant="default" size="sm">All Categories</Button>
                {categories.map((category) => (
                  <Button key={category} variant="outline" size="sm">
                    {category}
                  </Button>
                ))}
              </div>
              
              {/* View Mode & Filter */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
              {featuredParts.map((part) => (
                <Card key={part.id} className="group hover:shadow-automotive transition-all duration-300">
                  {viewMode === 'grid' ? (
                    <>
                      <Link to={`/parts/${part.id}`} className="block">
                        <div className="relative overflow-hidden">
                          <img 
                            src={part.image} 
                            alt={part.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <Badge variant={part.condition === 'New' ? 'default' : 'secondary'}>
                              {part.condition}
                            </Badge>
                            {part.fastDelivery && (
                              <Badge variant="outline" className="bg-background/80">
                                <Truck className="h-3 w-3 mr-1" />
                                Fast
                              </Badge>
                            )}
                          </div>
                          {part.originalPrice && (
                            <div className="absolute top-3 right-3">
                              <Badge variant="destructive">SALE</Badge>
                            </div>
                          )}
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <Link to={`/parts/${part.id}`}>
                          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">{part.name}</h3>
                        </Link>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground ml-1">{part.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({part.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-xl font-bold text-foreground">{part.price}</span>
                            {part.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through ml-2">{part.originalPrice}</span>
                            )}
                          </div>
                          <Badge variant={part.inStock ? 'default' : 'secondary'}>
                            {part.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                        <Button 
                          className="w-full" 
                          disabled={!part.inStock}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(part);
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {part.inStock ? 'Add to Cart' : 'Notify When Available'}
                        </Button>
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Link to={`/parts/${part.id}`} className="flex-shrink-0">
                          <img 
                            src={part.image} 
                            alt={part.name}
                            className="w-24 h-24 object-cover rounded-md hover:opacity-80 transition-opacity"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <Link to={`/parts/${part.id}`}>
                              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{part.name}</h3>
                            </Link>
                            <div className="text-right">
                              <span className="text-lg font-bold text-foreground">{part.price}</span>
                              {part.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">{part.originalPrice}</div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-muted-foreground ml-1">{part.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">({part.reviews} reviews)</span>
                            <Badge variant={part.condition === 'New' ? 'default' : 'secondary'} className="text-xs">
                              {part.condition}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant={part.inStock ? 'default' : 'secondary'}>
                              {part.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                            <Button 
                              size="sm" 
                              disabled={!part.inStock}
                              onClick={() => handleAddToCart(part)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              {part.inStock ? 'Add to Cart' : 'Notify'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Parts
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarParts;