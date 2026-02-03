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
import urlFor from "@/lib/sanityImage";

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
      price: part.price,
      image: part.images?.length
        ? urlFor(part.images[0]).width(400).url()
        : "/api/placeholder/300/200",
      condition: part.condition
    });

    toast({
      title: "Added to cart",
      description: `${part.title} added successfully`,
    });
  };

  const filtered = parts.filter(p =>
    !searchTerm ||
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.partNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        <section className="py-12 container mx-auto px-4">
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search parts or part numbers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <p className="text-center">Loading parts…</p>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-3' : ''}`}>
              {filtered.map(part => (
                <Card key={part._id}>
                  <Link to={`/parts/${part.slug?.current}`}>
                    <img
                      src={part.images?.length
                        ? urlFor(part.images[0]).width(600).height(400).url()
                        : "/api/placeholder/300/200"}
                      alt={part.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>

                  <CardContent className="p-4">
                    <h3 className="font-semibold">{part.title}</h3>

                    <div className="flex justify-between my-2">
                      <span className="font-bold">R{part.price.toLocaleString()}</span>
                      <Badge variant={part.inStock ? "default" : "secondary"}>
                        {part.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    <div className="flex gap-2 mb-2">
                      <Badge>{part.condition}</Badge>
                      {part.fastDelivery && (
                        <Badge variant="outline">
                          <Truck className="h-3 w-3 mr-1" /> Fast
                        </Badge>
                      )}
                    </div>

                    <Button
                      disabled={!part.inStock}
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
