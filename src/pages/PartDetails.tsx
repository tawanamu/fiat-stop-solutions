import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { usePartBySlug } from "@/hooks/useParts";
import {
  ShoppingCart,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PartDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { part, loading, error } = usePartBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!part) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: part.id,
        name: part.name,
        price: part.price,
        image: part.images[0] || "/placeholder.svg",
        condition: part.condition,
      });
    }

    toast({
      title: "Added to cart",
      description: `${quantity}x ${part.name} added successfully`,
    });
  };

  const nextImage = () => {
    if (part && part.images.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % part.images.length);
    }
  };

  const prevImage = () => {
    if (part && part.images.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + part.images.length) % part.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !part) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center py-24">
              <h1 className="text-2xl font-bold mb-4">Part Not Found</h1>
              <p className="text-muted-foreground mb-6">The part you're looking for doesn't exist.</p>
              <Link to="/car-parts">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Parts
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/car-parts" className="hover:text-primary">Parts</Link>
            <span>/</span>
            <span className="text-foreground">{part.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={part.images[selectedImageIndex] || "/placeholder.svg"}
                  alt={part.name}
                  className="w-full h-full object-cover"
                />
                {part.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {part.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {part.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                        index === selectedImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${part.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="capitalize">{part.condition}</Badge>
                  {part.fast_delivery && (
                    <Badge variant="outline" className="text-green-600">
                      <Truck className="h-3 w-3 mr-1" /> Fast Delivery
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold">{part.name}</h1>
                {part.part_number && (
                  <p className="text-muted-foreground mt-1">Part #: {part.part_number}</p>
                )}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  R{part.price.toLocaleString()}
                </span>
                {part.original_price && (
                  <span className="text-xl text-muted-foreground line-through">
                    R{part.original_price.toLocaleString()}
                  </span>
                )}
                {part.original_price && (
                  <Badge variant="destructive">
                    Save R{(part.original_price - part.price).toLocaleString()}
                  </Badge>
                )}
              </div>

              <Badge variant={part.in_stock ? "default" : "secondary"} className="text-sm">
                {part.in_stock ? `In Stock (${part.stock_quantity} available)` : "Out of Stock"}
              </Badge>

              {part.description && (
                <p className="text-muted-foreground">{part.description}</p>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(part.stock_quantity, quantity + 1))}
                    disabled={quantity >= part.stock_quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                className="w-full"
                disabled={!part.in_stock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - R{(part.price * quantity).toLocaleString()}
              </Button>

              {/* Contact Options */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" asChild>
                  <a href="tel:+27820688246">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </a>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <a href={`https://wa.me/27820688246?text=Hi, I'm interested in ${part.name} (${part.part_number})`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Truck className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Nationwide Delivery</p>
                      <p className="text-sm text-muted-foreground">Delivery available</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Quality Tested</p>
                      <p className="text-sm text-muted-foreground">All parts verified</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Product Description</h3>
                    <p className="text-muted-foreground">
                      {part.description || "No description available for this part."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Specifications</h3>
                    <dl className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm text-muted-foreground">Part Number</dt>
                        <dd className="font-medium">{part.part_number || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground">Condition</dt>
                        <dd className="font-medium capitalize">{part.condition}</dd>
                      </div>
                      {part.category && (
                        <div>
                          <dt className="text-sm text-muted-foreground">Category</dt>
                          <dd className="font-medium">{part.category.name}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-sm text-muted-foreground">Availability</dt>
                        <dd className="font-medium">{part.stock_quantity} in stock</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Shipping Information</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Nationwide delivery available</li>
                      <li>• Local collection in Durban</li>
                      <li>• Shipping costs calculated at checkout</li>
                      {part.fast_delivery && <li>• Fast delivery available for this item</li>}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link to="/car-parts">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Parts
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PartDetails;
