import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-2">1stop Fiat Stop</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Manchester's premier Fiat specialist — parts, workshop & auto electrical services.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Contact</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <a href="mailto:1stopshop@gmail.com" className="hover:text-foreground">Email: 1stopshop@gmail.com</a>
              </li>
              <li>
                <a href="tel:+27820688246" className="hover:text-foreground">Phone: +27 82 068 8246</a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/119+Houghton+Rd+Clairwood+Durban+4052"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  Address: 119 Houghton Rd, Clairwood, Durban, 4052, South Africa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Quick Links</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li><Link to="/parts" className="hover:text-foreground">Parts</Link></li>
              <li><Link to="/workshop" className="hover:text-foreground">Workshop Services</Link></li>
              <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} 1stop Fiat Stop — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;