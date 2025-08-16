import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight,
  Lock,
  Truck,
  Shield
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const subtotal = state.total;
  const shipping = subtotal > 500 ? 0 : 59.99;
  const total = subtotal + shipping;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-md mx-auto">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/parts">
                <Button size="lg">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <Button variant="outline" onClick={handleClearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Link to={`/parts/${item.id}`} className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md border hover:opacity-80 transition-opacity"
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Link 
                              to={`/parts/${item.id}`} 
                              className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={item.condition === 'New' ? 'default' : 'secondary'} className="text-xs">
                                {item.condition}
                              </Badge>
                            </div>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-lg font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-foreground">
                              R{(parseFloat(item.price.replace('R', '')) * item.quantity).toFixed(2)}
                            </div>
                            {item.originalPrice && (
                              <div className="text-sm text-muted-foreground line-through">
                                R{(parseFloat(item.originalPrice.replace('R', '')) * item.quantity).toFixed(2)}
                              </div>
                            )}
                            <div className="text-sm text-muted-foreground">
                              {item.price} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span className="font-medium">R{subtotal.toFixed(2)}</span>
                    </div>
                    
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? 'Free' : `R${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                      {shipping === 0 && (
                        <div className="text-sm text-green-600 flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          Free shipping on orders over R500
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>R{total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6" size="lg">
                    <Lock className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                  
                  <Link to="/parts" className="block mt-3">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Security Badge */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    <Shield className="h-8 w-8 text-primary mx-auto" />
                    <h3 className="font-semibold">Secure Checkout</h3>
                    <p className="text-sm text-muted-foreground">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Free shipping on orders over R500</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>12-month warranty on all parts</span>
                    </div>
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

export default Cart;