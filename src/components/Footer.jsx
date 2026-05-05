import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Share2, Globe, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Hospital Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <Pill className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Homeopathy Hospital</span>
          </div>
          <p className="text-sm leading-relaxed">
            Providing holistic healing through traditional homeopathy combined with modern medical standards. Over 20 years of excellence in patient care.
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="#" className="hover:text-primary transition-colors"><Share2 className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Globe className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><MessageSquare className="h-5 w-5" /></a>
          </div>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/medicines" className="hover:text-primary transition-colors">Medicines</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-6">Our Services</h3>
          <ul className="space-y-4 text-sm">
            <li>Chronic Disease Treatment</li>
            <li>Pediatric Homeopathy</li>
            <li>Skin & Allergy Clinic</li>
            <li>Stress Management</li>
            <li>Online Medicine Delivery</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span>123 Healing Street, Wellness District, City - 560001</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span>info@homeopathyhospital.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Homeopathy Hospital Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
