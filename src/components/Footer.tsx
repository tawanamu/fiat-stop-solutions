import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-automotive-gray text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-4">1stop Fiat Stop</h3>
            <p className="text-gray-300 mb-6">
              Your trusted automotive partner for Fiat parts, repairs, and services in Manchester.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#parts" className="text-gray-300 hover:text-primary transition-colors">Car Parts</a></li>
              <li><a href="#workshop" className="text-gray-300 hover:text-primary transition-colors">Workshop</a></li>
              <li><a href="#electrical" className="text-gray-300 hover:text-primary transition-colors">Auto Electrical</a></li>
              <li><a href="#buy-cars" className="text-gray-300 hover:text-primary transition-colors">Buy Accident Cars</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-300">0123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-300">info@1stopfiatstop.co.uk</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="text-gray-300">
                  123 Industrial Estate<br />
                  Manchester, M12 3AB
                </span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Mon - Fri:</span>
                <span>9AM - 6PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>9AM - 4PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 1stop Fiat Stop. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;