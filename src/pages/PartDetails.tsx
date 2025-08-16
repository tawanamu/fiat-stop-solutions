import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  Truck, 
  Shield, 
  RotateCcw, 
  Heart,
  Share2,
  Minus,
  Plus
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PartDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - in a real app, this would come from API/database
  const part = {
    id: parseInt(id || "1"),
    name: "Fiat 500 Brake Pads Set",
    price: "R45.99",
    originalPrice: "R59.99",
    images: [
      "/api/placeholder/500/400",
      "/api/placeholder/500/400", 
      "/api/placeholder/500/400"
    ],
    rating: 4.5,
    reviews: 23,
    condition: "New",
    inStock: true,
    fastDelivery: true,
    partNumber: "BP500-001",
    brand: "Genuine Fiat",
    warranty: "12 months",
    compatibility: ["Fiat 500 (2007-2020)", "Fiat 500C (2009-2020)", "Fiat 500L (2012-2019)"],
    description: "High-quality brake pads designed specifically for Fiat 500 models. These genuine replacement parts ensure optimal braking performance and safety. Made from premium materials with excellent heat dissipation properties.",
    specifications: {
      "Part Number": "BP500-001",
      "Brand": "Genuine Fiat",
      "Material": "Ceramic Compound",
      "Weight": "1.2kg",
      "Warranty": "12 months",
      "Origin": "Italy"
    },
    features: [
      "OEM quality guaranteed",
      "Noise-free operation", 
      "Extended pad life",
      "Optimal heat dissipation",
      "Easy installation"
    ]
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: part.id,
        name: part.name,
        price: part.price,
        originalPrice: part.originalPrice,
        image: part.images[0],
        condition: part.condition
      });
    }
    
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${part.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/parts" className="hover:text-primary">Car Parts</Link>
            <span>/</span>
            <span className="text-foreground">{part.name}</span>
          </div>

          {/* Back Button */}
          <Link to="/parts" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Parts
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg border">
                <img 
                  src={part.images[selectedImage]} 
                  alt={part.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {part.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${part.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{part.name}</h1>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{part.rating}</span>
                    <span className="text-muted-foreground ml-1">({part.reviews} reviews)</span>
                  </div>
                  <Badge variant={part.condition === 'New' ? 'default' : 'secondary'}>
                    {part.condition}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-foreground">{part.price}</span>
                  {part.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">{part.originalPrice}</span>
                      <Badge variant="destructive">Save R{(parseFloat(part.originalPrice.replace('R', '')) - parseFloat(part.price.replace('R', ''))).toFixed(2)}</Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y">
                <div className="text-center">
                  <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">Next day available</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">{part.warranty}</p>
                  <p className="text-xs text-muted-foreground">Warranty</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">30 Day</p>
                  <p className="text-xs text-muted-foreground">Returns</p>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium min-w-[2rem] text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!part.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {part.inStock ? `Add to Cart - R${(parseFloat(part.price.replace('R', '')) * quantity).toFixed(2)}` : 'Out of Stock'}
                </Button>

                <Badge variant={part.inStock ? 'default' : 'secondary'} className="w-full justify-center py-2">
                  {part.inStock ? '✓ In Stock - Ready to Ship' : 'Out of Stock'}
                </Badge>
              </div>

              {/* Part Details */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Part Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Part Number:</span>
                      <span className="font-medium">{part.partNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Brand:</span>
                      <span className="font-medium">{part.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition:</span>
                      <span className="font-medium">{part.condition}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{part.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                  <ul className="space-y-2">
                    {part.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Compatibility</h2>
                  <div className="space-y-2">
                    {part.compatibility.map((model, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Specifications */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                  <div className="space-y-3">
                    {Object.entries(part.specifications).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{key}</span>
                          <span className="text-sm font-medium">{value}</span>
                        </div>
                        <Separator className="mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartDetails;