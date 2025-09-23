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
  ShoppingCart,
  Truck,
  Grid,
  List
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParts } from "@/hooks/useSanityData";
import urlFor from "../lib/sanityImage";

const CarParts = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = useCart();
  const { toast } = useToast();
  const { parts, loading } = useParts();

  const handleAddToCart = (part: any) => {
    addItem({
      id: part._id,
      name: part.title,
      price: `R${(part.price || 0).toFixed ? part.price.toFixed(2) : part.price}`,
      originalPrice: part.originalPrice ? `R${part.originalPrice}` : undefined,
      image: part.images && part.images.length ? urlFor(part.images[0]).width(400).url() : "/api/placeholder/300/200",
      condition: part.condition || "Used"
    });

    toast({
      title: "Added to cart!",
      description: `${part.title} has been added to your cart.`,
    });
  };

  const filtered = parts.filter((p: any) =>
    !searchTerm ||
    (p.title && p.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.partNumber && p.partNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        <section className="bg-gradient-surface py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Fiat Car Parts Store
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Extensive inventory of genuine, OEM, and quality aftermarket parts for all Fiat models.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search parts, part numbers or models..."
                    className="pl-10 pr-28 h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button
                    className="absolute right-1 top-1 h-10"
                    size="sm"
                    onClick={() => {}}
                  >
                    Search
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
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
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">Loading parts…</div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
                {filtered.map((part: any) => (
                  <Card key={part._id} className="group hover:shadow-automotive transition-all duration-300">
                    {viewMode === 'grid' ? (
                      <>
                        <Link to={`/parts/${part.slug?.current || part._id}`} className="block">
                          <div className="relative overflow-hidden">
                            <img
                              src={part.images && part.images.length ? urlFor(part.images[0]).width(800).height(480).url() : "/api/placeholder/300/200"}
                              alt={part.title}
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
                          <Link to={`/parts/${part.slug?.current || part._id}`}>
                            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">{part.title}</h3>
                          </Link>

                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-xl font-bold text-foreground">R{(part.price || 0).toLocaleString()}</span>
                              {part.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through ml-2">R{part.originalPrice.toLocaleString()}</span>
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
                          <Link to={`/parts/${part.slug?.current || part._id}`} className="flex-shrink-0">
                            <img
                              src={part.images && part.images.length ? urlFor(part.images[0]).width(300).height(300).url() : "/api/placeholder/300/200"}
                              alt={part.title}
                              className="w-24 h-24 object-cover rounded-md hover:opacity-80 transition-opacity"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <Link to={`/parts/${part.slug?.current || part._id}`}>
                                <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{part.title}</h3>
                              </Link>
                              <div className="text-right">
                                <span className="text-lg font-bold text-foreground">R{(part.price || 0).toLocaleString()}</span>
                                {part.originalPrice && (
                                  <div className="text-sm text-muted-foreground line-through">R{part.originalPrice.toLocaleString()}</div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
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
            )}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">Load More Parts</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CarParts;
