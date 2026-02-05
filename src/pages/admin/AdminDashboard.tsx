import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, FolderTree, ShoppingCart, Users, TrendingUp, DollarSign } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface DashboardStats {
  totalParts: number;
  totalCategories: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalParts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [partsRes, categoriesRes, ordersRes, usersRes, pendingRes] = await Promise.all([
          supabase.from('parts').select('id', { count: 'exact', head: true }),
          supabase.from('categories').select('id', { count: 'exact', head: true }),
          supabase.from('orders').select('id, total_amount', { count: 'exact' }),
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        ]);

        const totalRevenue = ordersRes.data?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

        setStats({
          totalParts: partsRes.count || 0,
          totalCategories: categoriesRes.count || 0,
          totalOrders: ordersRes.count || 0,
          totalUsers: usersRes.count || 0,
          totalRevenue,
          pendingOrders: pendingRes.count || 0,
        });

        // Fetch recent orders
        const { data: orders } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentOrders(orders || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Parts',
      value: stats.totalParts,
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: FolderTree,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Total Revenue',
      value: `€${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your store admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : recentOrders.length === 0 ? (
              <p className="text-muted-foreground">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{Number(order.total_amount).toFixed(2)}</p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
