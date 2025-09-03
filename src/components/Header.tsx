import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Menu, X, Phone, MapPin, ShoppingCart, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Car Parts", href: "/parts" },
    { 
      name: "Cars Sells", 
      href: "#", 
      dropdown: [
        { name: "Second-Hand Cars", href: "/second-hand-cars" },
        { name: "Buy Accident Cars", href: "/buy-cars" }
      ]
    },
    { name: "Workshop & Electrical", href: "/workshop" },
    { name: "Contact", href: "/#contact" }
  ];

  return (
    <>
      {/* Top contact bar */}
      <div className="w-full bg-foreground/5 text-sm text-muted-foreground">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="mailto:1stopshop@gmail.com" className="hover:text-foreground">1stopshop@gmail.com</a>
            <a href="tel:+27820688246" className="hover:text-foreground">+27 82 068 8246</a>
          </div>
          <div className="hidden sm:block text-xs">
            119 Houghton Rd, Clairwood, Durban, 4052, South Africa
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
                One Stop Fiate Spares
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                item.dropdown ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="text-foreground hover:text-primary transition-colors duration-200 font-medium p-0 h-auto"
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {item.dropdown.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.name} asChild>
                          <Link
                            to={dropdownItem.href}
                            className={`w-full hover:text-white ${
                              location.pathname === dropdownItem.href ? 'text-primary' : ''
                            }`}
                          >
                            {dropdownItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-foreground hover:text-primary transition-colors duration-200 font-medium ${
                      location.pathname === item.href ? 'text-primary' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Contact Info & Cart & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>+27 82 068 8246</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>119 Houghton Rd
                  Clairwood, Durban</span>
                </div>
              </div>
              
              {/* Cart Icon */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                    >
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
              <nav className="px-4 py-4 space-y-4">
                {navigation.map((item) => (
                  item.dropdown ? (
                    <div key={item.name} className="space-y-2">
                      <div className="text-foreground font-medium text-lg">{item.name}</div>
                      <div className="pl-4 space-y-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className={`block text-foreground hover:text-primary transition-colors duration-200 font-medium ${
                              location.pathname === dropdownItem.href ? 'text-primary' : ''
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : item.href.startsWith('#') ? (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block text-foreground hover:text-primary transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block text-foreground hover:text-primary transition-colors duration-200 font-medium ${
                        location.pathname === item.href ? 'text-primary' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>+27 82 068 8246</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>119 Houghton Rd, Clairwood, Durban</span>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;