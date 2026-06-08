import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Users, ExternalLink, Waves, Wifi, Car, Eye, Snowflake, Sun, ChevronLeft, ChevronRight, Home, MessageCircle } from "lucide-react";
import type { Apartment } from "@/data/apartments";

const amenityIcons: Record<string, typeof Waves> = {
  "Piscine": Waves, "Fibre optique": Wifi, "Parking": Car, "Vue océan": Eye,
  "Vue panoramique": Eye, "Climatisation": Snowflake, "Terrasse": Sun, "Proche plage": Waves,
};

interface Props {
  apartment: Apartment | null;
  onClose: () => void;
}

const ApartmentDetailModal = ({ apartment, onClose }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!apartment) return null;

  const images = apartment.images;
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  const handleWhatsApp = () => {
    const message = `Bonjour Immobaz.Kima !%0A%0AJe suis intéressé(e) par le bien :%0A${apartment.title}%0ARéférence : ${apartment.id}%0ALocation : ${apartment.location}%0A%0APrix de vente : ${apartment.priceForSale?.toLocaleString()} DH%0A${apartment.pricePerMonth ? `Loyer mensuel : ${apartment.pricePerMonth.toLocaleString()} DH` : ''}`;
    window.open(`https://wa.me/212773273153?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {apartment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative overflow-hidden aspect-video rounded-t-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`${apartment.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      aria-label="Image suivante"
                    >
                      <ChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex
                              ? "bg-blue-600 w-4"
                              : "bg-white/80 hover:bg-white"
                            }`}
                          aria-label={`Aller à l'image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                <MapPin size={12} className="text-blue-600" />
                {apartment.location}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-2">
                <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">Immobaz.Kima</span>
              </div>

              <h2 className="font-display text-xl md:text-2xl font-semibold text-gray-900 mb-4 tracking-tight">{apartment.title}</h2>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                <Users size={16} />
                <span>{apartment.capacity} pièces</span>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between">
                  {apartment.priceForSale && (
                    <div className="text-center flex-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Prix de vente</span>
                      <span className="font-display font-bold text-gray-900 text-2xl block">{apartment.priceForSale.toLocaleString()} DH</span>
                    </div>
                  )}
                  {apartment.pricePerMonth && (
                    <div className={`text-center ${apartment.priceForSale ? 'border-l border-gray-200' : ''} flex-1`}>
                      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Loyer mensuel</span>
                      <span className="font-display font-semibold text-gray-700 text-lg block">{apartment.pricePerMonth.toLocaleString()} DH</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 font-body leading-relaxed mb-6">{apartment.description}</p>

              <h3 className="font-display font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">Équipements</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {apartment.amenities.map((a) => {
                  const Icon = amenityIcons[a] || Waves;
                  return (
                    <span key={a} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-1.5">
                      <Icon size={14} className="text-blue-600" /> {a}
                    </span>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg font-body font-medium tracking-tight hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <MessageCircle size={18} />
                  Contacter via WhatsApp
                </button>
                <a
                  href={apartment.airbnbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  onClick={handleClose}
                  className="px-4 py-3 rounded-lg border border-gray-200 text-gray-500 font-body font-medium hover:bg-gray-50 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApartmentDetailModal;
