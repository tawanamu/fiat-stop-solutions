import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  condition?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load cart from localStorage or database
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user) {
        // Load from database for authenticated users
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('cart_items')
            .select(`
              id,
              quantity,
              part:parts(
                id,
                name,
                price,
                condition,
                part_images(image_url, display_order)
              )
            `)
            .eq('user_id', user.id);

          if (error) throw error;

          const cartItems: CartItem[] = (data || []).map((item: any) => ({
            id: item.part.id,
            name: item.part.name,
            price: Number(item.part.price),
            quantity: item.quantity,
            image: item.part.part_images?.[0]?.image_url || '/placeholder.svg',
            condition: item.part.condition,
          }));

          setItems(cartItems);
        } catch (err) {
          console.error('Error loading cart:', err);
        } finally {
          setLoading(false);
        }
      } else {
        // Load from localStorage for guests
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch {
            setItems([]);
          }
        }
      }
    };

    loadCart();
  }, [isAuthenticated, user]);

  // Save cart to localStorage for guests
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const addItem = async (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = items.find(i => i.id === item.id);

    if (isAuthenticated && user) {
      try {
        if (existingItem) {
          // Update quantity in database
          await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + 1 })
            .eq('user_id', user.id)
            .eq('part_id', item.id);
        } else {
          // Insert new cart item
          await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              part_id: item.id,
              quantity: 1,
            });
        }
      } catch (err) {
        console.error('Error adding to cart:', err);
      }
    }

    // Update local state
    if (existingItem) {
      setItems(items.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setItems([...items, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = async (id: string) => {
    if (isAuthenticated && user) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('part_id', id);
      } catch (err) {
        console.error('Error removing from cart:', err);
      }
    }

    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }

    if (isAuthenticated && user) {
      try {
        await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('part_id', id);
      } catch (err) {
        console.error('Error updating cart:', err);
      }
    }

    setItems(items.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = async () => {
    if (isAuthenticated && user) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
      } catch (err) {
        console.error('Error clearing cart:', err);
      }
    }

    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getItemCount = () => totalItems;

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      loading,
      getItemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};
