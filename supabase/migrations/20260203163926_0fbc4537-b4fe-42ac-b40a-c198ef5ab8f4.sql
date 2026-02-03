-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create parts table
CREATE TABLE public.parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    part_number TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    condition TEXT CHECK (condition IN ('new', 'used', 'refurbished')) DEFAULT 'used',
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    in_stock BOOLEAN GENERATED ALWAYS AS (stock_quantity > 0) STORED,
    fast_delivery BOOLEAN DEFAULT false,
    slug TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on parts
ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;

-- Create part_images table
CREATE TABLE public.part_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    part_id UUID REFERENCES public.parts(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on part_images
ALTER TABLE public.part_images ENABLE ROW LEVEL SECURITY;

-- Create cart_items table
CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    part_id UUID REFERENCES public.parts(id) ON DELETE CASCADE NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, part_id)
);

-- Enable RLS on cart_items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    order_number TEXT UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    shipping_address TEXT,
    shipping_city TEXT,
    shipping_postal_code TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create order_items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    part_id UUID REFERENCES public.parts(id) ON DELETE SET NULL,
    part_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Security definer function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT public.has_role(auth.uid(), 'admin')
$$;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_parts_updated_at
    BEFORE UPDATE ON public.parts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id)
    VALUES (NEW.id);
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Function to generate order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER set_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.generate_order_number();

-- RLS POLICIES

-- User roles policies
CREATE POLICY "Users can view their own roles"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
    ON public.user_roles FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Admins can manage roles"
    ON public.user_roles FOR ALL
    USING (public.is_admin());

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (public.is_admin());

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories"
    ON public.categories FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage categories"
    ON public.categories FOR ALL
    USING (public.is_admin());

-- Parts policies (public read)
CREATE POLICY "Anyone can view parts"
    ON public.parts FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage parts"
    ON public.parts FOR ALL
    USING (public.is_admin());

-- Part images policies (public read)
CREATE POLICY "Anyone can view part images"
    ON public.part_images FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage part images"
    ON public.part_images FOR ALL
    USING (public.is_admin());

-- Cart items policies
CREATE POLICY "Users can view their own cart"
    ON public.cart_items FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own cart"
    ON public.cart_items FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart"
    ON public.cart_items FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own cart"
    ON public.cart_items FOR DELETE
    USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view their own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
    ON public.orders FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Admins can manage orders"
    ON public.orders FOR ALL
    USING (public.is_admin());

-- Order items policies
CREATE POLICY "Users can view their own order items"
    ON public.order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create order items for their orders"
    ON public.order_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all order items"
    ON public.order_items FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Admins can manage order items"
    ON public.order_items FOR ALL
    USING (public.is_admin());

-- Insert sample categories
INSERT INTO public.categories (name, description, slug) VALUES
    ('Engine Parts', 'Engine components and accessories', 'engine-parts'),
    ('Brake System', 'Brake pads, rotors, and components', 'brake-system'),
    ('Electrical', 'Starters, alternators, and electrical parts', 'electrical'),
    ('Suspension', 'Shocks, struts, and suspension components', 'suspension'),
    ('Cooling System', 'Radiators, thermostats, and cooling parts', 'cooling-system'),
    ('Body Parts', 'Exterior and interior body components', 'body-parts');

-- Insert sample parts
INSERT INTO public.parts (category_id, name, description, part_number, price, original_price, condition, stock_quantity, fast_delivery, slug) VALUES
    ((SELECT id FROM categories WHERE slug = 'engine-parts'), 'Complete Thermostat Housing', 'Genuine Fiat thermostat housing assembly. Compatible with Punto, Strada, and Palio models.', 'TH-001', 850.00, 1200.00, 'used', 5, true, 'thermostat-housing'),
    ((SELECT id FROM categories WHERE slug = 'engine-parts'), 'Head Gasket Set', 'Complete head gasket set for 1.4L Fire engine. Includes all necessary seals.', 'HG-002', 1250.00, 1800.00, 'new', 8, true, 'head-gasket-set'),
    ((SELECT id FROM categories WHERE slug = 'engine-parts'), 'Oil Cooler Housing with Filter', 'Oil cooler assembly with integrated filter housing.', 'OC-003', 1650.00, 2200.00, 'refurbished', 3, false, 'oil-cooler-housing'),
    ((SELECT id FROM categories WHERE slug = 'electrical'), 'Linear Starter Motor', 'High-quality starter motor for Fiat vehicles. Direct replacement.', 'SM-001', 1850.00, 2500.00, 'refurbished', 4, true, 'linear-starter'),
    ((SELECT id FROM categories WHERE slug = 'electrical'), 'Voltage Regulator', 'OEM quality voltage regulator. Tested and certified.', 'VR-001', 450.00, 650.00, 'used', 12, true, 'voltage-regulator'),
    ((SELECT id FROM categories WHERE slug = 'brake-system'), 'Rear Brake Cylinders', 'Pair of rear wheel brake cylinders. For drum brake systems.', 'BC-001', 380.00, 550.00, 'new', 15, true, 'rear-brake-cylinders'),
    ((SELECT id FROM categories WHERE slug = 'suspension'), 'Shock Saddle Mount', 'Upper shock absorber mounting saddle. Heavy duty construction.', 'SS-001', 220.00, 320.00, 'new', 20, true, 'shock-saddle'),
    ((SELECT id FROM categories WHERE slug = 'cooling-system'), 'Metal Water Pipe', 'Coolant distribution pipe. Metal construction for durability.', 'WP-001', 180.00, 280.00, 'used', 7, false, 'metal-water-pipe'),
    ((SELECT id FROM categories WHERE slug = 'engine-parts'), 'Concentric Slave Cylinder', 'Clutch release bearing with integrated slave cylinder.', 'CS-001', 950.00, 1400.00, 'new', 6, true, 'concentric-slave'),
    ((SELECT id FROM categories WHERE slug = 'engine-parts'), 'Fiat Punto Engine 1.2L', 'Complete engine assembly. Low mileage, tested and running.', 'ENG-001', 18500.00, 25000.00, 'used', 2, false, 'punto-engine-12');

-- Insert sample part images
INSERT INTO public.part_images (part_id, image_url, display_order) VALUES
    ((SELECT id FROM parts WHERE slug = 'thermostat-housing'), '/parts/Complete Thermostat housing.jpg', 0),
    ((SELECT id FROM parts WHERE slug = 'head-gasket-set'), '/parts/Head Gasket.jpg', 0),
    ((SELECT id FROM parts WHERE slug = 'oil-cooler-housing'), '/parts/Oil cooler housing with oil filter housing.jpg', 0),
    ((SELECT id FROM parts WHERE slug = 'linear-starter'), '/parts/linear-starter.jpg', 0),
    ((SELECT id FROM parts WHERE slug = 'linear-starter'), '/parts/linear-starter_00.jpg', 1),
    ((SELECT id FROM parts WHERE slug = 'voltage-regulator'), '/parts/regulator.jpg', 0),
    ((SELECT id FROM parts WHERE slug = 'voltage-regulator'), '/parts/regulator_00.jpg', 1),
    ((SELECT id FROM parts WHERE slug = 'rear-brake-cylinders'), '/parts/Rear brake cylinders.jpg', 0),
    ((SELECT id FROM parts WHERE slug = 'shock-saddle'), '/parts/Shock saddle.jpg', 0),
    ((SELECT id FROM parts WHERE slug = 'shock-saddle'), '/parts/Shock saddle (2).jpg', 1),
    ((SELECT id FROM parts WHERE slug = 'metal-water-pipe'), '/parts/Metal water pipe.jpg', 0),
    ((SELECT id FROM parts WHERE slug = 'concentric-slave'), '/parts/Concentric sleeve.jpg', 0),
    ((SELECT id FROM parts WHERE slug = 'punto-engine-12'), '/parts/fiat-punto-engine.jpg', 0),
    ((SELECT id FROM parts WHERE slug = 'punto-engine-12'), '/parts/fiat-punto-engine_00.jpg', 1),
    ((SELECT id FROM parts WHERE slug = 'punto-engine-12'), '/parts/fiat-punto-engine_01.jpg', 2),
    ((SELECT id FROM parts WHERE slug = 'punto-engine-12'), '/parts/fiat-punto-engine_02.jpg', 3),
    ((SELECT id FROM parts WHERE slug = 'punto-engine-12'), '/parts/fiat-punto-engine_03.jpg', 4);