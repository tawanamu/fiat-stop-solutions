import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  ArrowLeft,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Parts', href: '/admin/parts', icon: Package },
  { title: 'Categories', href: '/admin/categories', icon: FolderTree },
  { title: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { title: 'Users', href: '/admin/users', icon: Users },
];

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Store Management</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
              isActive(item.href)
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Store
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
