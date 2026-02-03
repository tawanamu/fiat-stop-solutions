import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock } from "lucide-react";

export default function Checkout() {
  const { items, clearCart, totalPrice, totalItems } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
  });

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = totalPrice;
  const shippingCost = subtotal > 500 ? 0 : 59.99;
  const total = subtotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // minimal validation
    if (!shipping.fullName || !shipping.address) {
      toast({ title: "Missing info", description: "Please fill required shipping fields." });
      return;
    }

    // simulate order placement
    clearCart();
    toast({ title: "Order placed", description: "Thank you — your order has been received." });
    navigate("/"); // redirect to home or order confirmation page
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link to="/car-parts">
              <Button>Browse Parts</Button>
            </Link>
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
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <form className="lg:col-span-2 space-y-6" onSubmit={handlePlaceOrder}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Full name *"
                      value={shipping.fullName}
                      onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                    />
                    <Input
                      placeholder="Email"
                      value={shipping.email}
                      onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    />
                    <Input
                      placeholder="Phone"
                      value={shipping.phone}
                      onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                    />
                    <Input
                      placeholder="City"
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    />
                    <Input
                      className="md:col-span-2"
                      placeholder="Address *"
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    />
                    <Input
                      placeholder="Postal code"
                      value={shipping.postal}
                      onChange={(e) => setShipping({ ...shipping, postal: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Payment (Card)</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Name on card"
                      value={payment.cardName}
                      onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                    />
                    <Input
                      placeholder="Card number"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    />
                    <Input
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                    />
                    <Input
                      placeholder="CVV"
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between gap-4">
                <Link to="/cart" className="w-full">
                  <Button variant="outline" className="w-full">
                    Back to Cart
                  </Button>
                </Link>

                <Button type="submit" className="w-full" size="lg">
                  <Lock className="h-4 w-4 mr-2" />
                  Place Order - R{total.toLocaleString()}
                </Button>
              </div>
            </form>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    {items.map((it) => (
                      <div key={it.id} className="flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="font-medium truncate">{it.name}</div>
                          <div className="text-sm text-muted-foreground">{it.quantity} x R{it.price.toLocaleString()}</div>
                        </div>
                        <div className="font-semibold">R{(it.price * it.quantity).toLocaleString()}</div>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingCost === 0 ? "Free" : `R${shippingCost.toFixed(2)}`}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>R{total.toLocaleString()}</span>
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
}
