import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import {
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

  // Parts data - matches the CarParts page inventory
  const mockParts = [
    {
      id: 1,
      name: "Rear Brake Cylinders - Fiat 500c",
      price: "R285.00",
      images: [
        "/parts/Rear brake cylinders.jpg",
        "/parts/Rear brake cylinders.jpg"
      ],
      condition: "Used",
      inStock: true,
      fastDelivery: true,
      partNumber: "N/A",
      brand: "Fiat",
      warranty: "6 months",
      engineCode: "169A4",
      compatibility: [
        "Fiat 500c (2009-2020)",
        "Fiat 500 (2007-2020)"
      ],
      description: "High-quality rear brake cylinders for Fiat 500c models. These brake cylinders are tested and guaranteed to meet OEM specifications. They ensure reliable braking performance and are compatible with various Fiat 500 models. Perfect for replacing worn or faulty brake cylinders.",
      features: [
        "OEM quality guaranteed",
        "Reliable braking performance",
        "Tested for durability",
        "Easy installation",
        "Engine Code: 169A4"
      ]
    },
    {
      id: 2,
      name: "Oil Cooler Housing with Oil Filter Housing - Fiat Doblo/Punto 1.3 Diesel",
      price: "R2850.00",
      images: [
        "/parts/Oil cooler housing with oil filter housing.jpg",
      ],
      condition: "Used",
      inStock: true,
      fastDelivery: true,
      partNumber: "N/A",
      brand: "Fiat",
      warranty: "6 months",
      engineCode: "199A2",
      compatibility: [
        "Fiat Doblo 1.3 Diesel",
        "Fiat Punto 1.3 Diesel"
      ],
      description: "Complete oil cooler housing with integrated oil filter housing for Fiat Doblo and Punto 1.3 Diesel models. This part ensures proper oil cooling and filtration for optimal engine performance. Tested and ready for installation.",
      features: [
        "Complete housing assembly",
        "Integrated oil filter housing",
        "Optimal oil cooling",
        "Engine Code: 199A2",
        "Ready to install"
      ]
    },
    {
      id: 3,
      name: "Concentric Sleeve - Fiat Stilo 1.9 JTD",
      price: "R2850.00",
      images: [
        "/parts/Concentric sleeve.jpg",
        "/parts/Concentric sleeve.jpg"
      ],
      condition: "Used",
      inStock: true,
      fastDelivery: false,
      partNumber: "N/A",
      brand: "Fiat",
      warranty: "6 months",
      engineCode: "192A1",
      compatibility: [
        "Fiat Stilo 1.9 JTD (2001-2007)"
      ],
      description: "Concentric sleeve for Fiat Stilo 1.9 JTD engine. This precision component is essential for proper engine operation and has been tested to ensure optimal performance. Compatible with the 192A1 engine code.",
      features: [
        "Precision engineered",
        "Essential engine component",
        "Tested for performance",
        "Engine Code: 192A1",
        "6-month warranty"
      ]
    },
    {
      id: 4,
      name: "Shock Saddle - Fiat Fiorino/Punto",
      price: "R850.00",
      images: [
        "/parts/Shock saddle.jpg",
        "/parts/Shock saddle.jpg"
      ],
      condition: "Used",
      inStock: true,
      fastDelivery: true,
      partNumber: "N/A",
      brand: "Fiat",
      warranty: "6 months",
      engineCode: "KFT",
      compatibility: [
        "Fiat Fiorino",
        "Fiat Punto"
      ],
      description: "Shock saddle for Fiat Fiorino and Punto models. This suspension component is crucial for proper shock absorber mounting and vehicle stability. Tested and ready for installation with KFT engine compatibility.",
      features: [
        "Suspension component",
        "Proper shock mounting",
        "Vehicle stability",
        "Engine Code: KFT",
        "Easy installation"
      ]
    },
    {
      id: 5,
      name: "Metal Water Pipe - Fiat Punto/Tata Indica",
      price: "R1200.00",
      images: [
        "/parts/Metal water pipe.jpg",
      ],
      condition: "Used",
      inStock: true,
      fastDelivery: true,
      partNumber: "N/A",
      brand: "Fiat",
      warranty: "6 months",
      engineCode: "350A1/199A7",
      compatibility: [
        "Fiat Punto",
        "Tata Indica"
      ],
      description: "Metal water pipe for Fiat Punto and Tata Indica models. This cooling system component ensures proper coolant circulation and engine temperature regulation. Compatible with multiple engine codes for versatile application.",
      features: [
        "Cooling system component",
        "Proper coolant circulation",
        "Temperature regulation",
        "Engine Code: 350A1/199A7",
        "Multi-model compatibility"
      ]
    },
    {
      id: 6,
      name: "Head Gasket - Fiat Stilo 1.9 Diesel",
      price: "R850.00",
      images: [
        "/parts/Head Gasket.jpg",
        "/parts/Head Gasket.jpg"
      ],
      condition: "Used",
      inStock: true,
      fastDelivery: true,
      partNumber: "N/A",
      brand: "Fiat",
      warranty: "6 months",
      engineCode: "192A5",
      compatibility: [
        "Fiat Stilo 1.9 Diesel"
      ],
      description: "Head gasket for Fiat Stilo 1.9 Diesel engine. This critical engine component ensures proper sealing between the engine block and cylinder head. Essential for maintaining compression and preventing coolant/oil mixing.",
      features: [
        "Critical engine component",
        "Proper sealing",
        "Compression maintenance",
        "Engine Code: 192A5",
        "Prevents fluid mixing"
      ]
    },
    {
      id: 7,
      name: "Complete Thermostat Housing - Fiat Punto",
      price: "R550.00",
      images: [
        "/parts/Complete Thermostat housing.jpg",
        "/parts/Complete Thermostat housing.jpg"
      ],
      condition: "Used",
      inStock: true,
      fastDelivery: true,
      partNumber: "N/A",
      brand: "Fiat",
      warranty: "6 months",
      engineCode: "323B",
      compatibility: [
        "Fiat Punto"
      ],
      description: "Complete thermostat housing for Fiat Punto models. This cooling system component includes the thermostat and housing assembly, ensuring proper engine temperature control and coolant flow regulation.",
      features: [
        "Complete assembly",
        "Temperature control",
        "Coolant flow regulation",
        "Engine Code: 323B",
        "Ready to install"
      ]
    },
    {
      id: 8,
      name: "Shock Saddle - Fiat Palio/Seina/Strada",
      price: "R850.00",
      images: [
        "/parts/Shock saddle (2).jpg",
        "/parts/Shock saddle (2).jpg"
      ],
      condition: "Used",
      inStock: true,
      fastDelivery: true,
      partNumber: "N/A",
      brand: "Fiat",
      warranty: "6 months",
      engineCode: "178D/178F/178D",
      compatibility: [
        "Fiat Palio",
        "Fiat Seina",
        "Fiat Strada"
      ],
      description: "Shock saddle for Fiat Palio, Seina, and Strada models. This suspension component provides proper mounting for shock absorbers and contributes to vehicle stability and ride comfort. Compatible with multiple engine codes.",
      features: [
        "Multi-model compatibility",
        "Suspension mounting",
        "Vehicle stability",
        "Engine Code: 178D/178F/178D",
        "Ride comfort"
      ]
    }
  ];

  const partId = parseInt(id || "1", 10);
  const part = mockParts.find((p) => p.id === partId) ?? mockParts[0];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: part.id,
        name: part.name,
        price: part.price,
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

                {/* reviews/ratings removed */}
                <div className="mb-4">
                  <Badge variant={part.condition === 'New' ? 'default' : 'secondary'}>
                    {part.condition}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-foreground">{part.price}</span>
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
                    {part.engineCode && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Engine Code:</span>
                        <span className="font-medium">{part.engineCode}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Information (specifications removed) */}
          <div className="space-y-8">
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PartDetails;