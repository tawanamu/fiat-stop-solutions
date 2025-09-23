import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Calendar, CreditCard, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

const Orders = () => {
  // Mock order data - in a real app, this would come from an API
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 1250.00,
      items: [
        { name: 'Fiat Punto Head Gasket', quantity: 1, price: 450.00 },
        { name: 'Thermostat Housing', quantity: 1, price: 800.00 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Processing',
      total: 320.00,
      items: [
        { name: 'Oil Filter', quantity: 2, price: 160.00 },
        { name: 'Air Filter', quantity: 1, price: 160.00 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'default';
      case 'Processing':
        return 'secondary';
      case 'Shipped':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-16">
          <section className="bg-gradient-surface py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  My Orders
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Track your orders and view order history.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {orders.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't placed any orders yet. Start shopping to see your orders here.
                      </p>
                      <Button asChild>
                        <a href="/parts">Browse Parts</a>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(order.date).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <Badge variant={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                              <p className="text-lg font-semibold mt-1">
                                R{order.total.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <h4 className="font-medium">Items:</h4>
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-medium">R{item.price.toLocaleString()}</p>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              <Truck className="h-4 w-4 mr-2" />
                              Track Order
                            </Button>
                            <Button variant="outline" size="sm">
                              <CreditCard className="h-4 w-4 mr-2" />
                              View Invoice
                            </Button>
                            <Button variant="outline" size="sm">
                              Reorder
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Orders;

