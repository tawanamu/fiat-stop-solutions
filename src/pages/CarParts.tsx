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
import { useParts, Part } from "@/hooks/useParts";

const CarParts = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = useCart();
  const { toast } = useToast();
  const { parts, loading } = useParts();

  const handleAddToCart = (part: Part) => {
    addItem({
      id: part.id,
      name: part.name,
      price: part.price,
      image: part.images[0] || "/placeholder.svg",
      condition: part.condition
    });

    toast({
      title: "Added to cart",
      description: `${part.name} added successfully`,
    });
  };

  const filtered = parts.filter(p =>
    !searchTerm ||
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.part_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        <section className="py-12 container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Second-Hand Car Parts</h1>
          
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search parts or part numbers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => { }}>
              <Search className="h-4 w-4" />
            </Button>
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

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading parts…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No parts found matching your search.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
              {filtered.map(part => (
                <Card key={part.id} className="overflow-hidden">
                  <Link to={`/parts/${part.slug}`}>
                    <img
                      src={part.images[0] || "/placeholder.svg"}
                      alt={part.name}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>

                  <CardContent className="p-4">
                    <Link to={`/parts/${part.slug}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors">{part.name}</h3>
                    </Link>

                    {part.part_number && (
                      <p className="text-sm text-muted-foreground">Part #: {part.part_number}</p>
                    )}

                    <div className="flex justify-between items-center my-2">
                      <div>
                        <span className="font-bold text-lg">R{part.price.toLocaleString()}</span>
                        {part.original_price && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            R{part.original_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <Badge variant={part.in_stock ? "default" : "secondary"}>
                        {part.in_stock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className="capitalize">{part.condition}</Badge>
                      {part.fast_delivery && (
                        <Badge variant="outline" className="text-green-600">
                          <Truck className="h-3 w-3 mr-1" /> Fast
                        </Badge>
                      )}
                    </div>

                    <Button
                      disabled={!part.in_stock}
                      className="w-full"
                      onClick={() => handleAddToCart(part)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CarParts;
