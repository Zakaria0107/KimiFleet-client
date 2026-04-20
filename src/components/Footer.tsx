import { Phone, MapPin, MessageCircle, Mail, ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="bg-gray-950 text-white">
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="font-display text-2xl font-bold tracking-tight">
              <span className="text-blue-400">Kimi</span>fleet
            </span>
          </div>
          <p className="text-gray-400 font-body text-sm leading-relaxed mb-6">
            Your trusted partner for Fleet Management. Deep Teltonika integration, maintenance longevity, and automated invoicing.
          </p>
          <a 
            href="https://wa.me/212667959143"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-body text-sm font-medium hover:bg-blue-700 transition-all"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-gray-300 mb-4">Navigation</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: "Dashboard", href: "/" },
              { label: "Longevity", href: "#apropos" },
              { label: "Finances", href: "/appartements" },
              { label: "Telematics", href: "#services" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="text-gray-400 font-body text-sm hover:text-blue-400 transition-colors inline-flex items-center gap-1">
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-gray-300 mb-4">Services</h4>
          <div className="flex flex-col gap-3 text-gray-400 font-body text-sm">
            <span>Real-time Telematics</span>
            <span>Distance-Based Maintenance</span>
            <span>Automated Invoicing</span>
            <span>Multi-Branch Management</span>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-gray-300 mb-4">Contact</h4>
          <div className="flex flex-col gap-4 text-gray-400 font-body text-sm">
            <a href="https://maps.google.com/?q=Agadir,Morocco" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
              <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-blue-400" />
              </div>
              Agadir, Maroc
            </a>
            <a href="tel:+212667959143" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
              <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center">
                <Phone size={16} className="text-blue-400" />
              </div>
              0667959143
            </a>
            <a href="https://wa.me/212667959143" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
              <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center">
                <MessageCircle size={16} className="text-green-400" />
              </div>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 font-body text-sm">
          © 2024-{new Date().getFullYear()} Kimifleet. All rights reserved.
        </p>
        <p className="text-gray-500 font-body text-sm">
          Fleet Management Solutions since 2024
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
