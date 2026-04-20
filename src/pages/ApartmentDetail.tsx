import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Users, Waves, Wifi, Car, Eye, Snowflake, Sun, 
  ChevronLeft, ChevronRight, Star, Calendar, ArrowLeft, 
  ExternalLink, Clock, CheckCircle2
} from "lucide-react";
import { apartments, type Apartment } from "@/data/apartments";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationForm from "@/components/ReservationForm";

const amenityIcons: Record<string, typeof Waves> = {
  "Piscine": Waves, "Fibre optique": Wifi, "Parking": Car, "Vue océan": Eye,
  "Vue panoramique": Eye, "Climatisation": Snowflake, "Terrasse": Sun, "Proche plage": Waves,
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? "fill-accent text-accent" : "text-muted-foreground/30"}
        />
      ))}
    </div>
  );
};

const ApartmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReservation, setShowReservation] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    const apt = apartments.find((a) => a.id === Number(id));
    if (apt) {
      setApartment(apt);
      window.scrollTo(0, 0);
    } else {
      navigate("/appartements");
    }
  }, [id, navigate]);

  if (!apartment) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
        <Footer />
      </main>
    );
  }

  const images = apartment.images;
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-background border-b">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate("/appartements")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Hardware Catalog</span>
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-2xl overflow-hidden">
            {/* Main Image */}
            <div className="relative aspect-[4/3] md:aspect-[16/10] cursor-pointer" onClick={() => setShowAllPhotos(true)}>
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
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm text-foreground w-10 h-10 rounded-full flex items-center justify-center hover:bg-card transition-colors"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm text-foreground w-10 h-10 rounded-full flex items-center justify-center hover:bg-card transition-colors"
                    aria-label="Image suivante"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm text-foreground text-sm font-medium px-3 py-1.5 rounded-lg">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
            
            {/* Thumbnail Grid */}
            <div className="hidden md:grid grid-cols-2 gap-2">
              {images.slice(1, 5).map((img, idx) => (
                <div 
                  key={idx + 1} 
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => { setCurrentImageIndex(idx + 1); setShowAllPhotos(true); }}
                >
                  <img 
                    src={img} 
                    alt={`${apartment.title} - Miniature ${idx + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {idx === 3 && images.length > 5 && (
                    <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold">+{images.length - 5} photos</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile View All Photos Button */}
          <button 
            onClick={() => setShowAllPhotos(true)}
            className="md:hidden mt-3 w-full py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm"
          >
            Voir toutes les photos ({images.length})
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    <MapPin size={12} className="inline mr-1" />
                    {apartment.location}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="fill-accent text-accent" size={14} />
                    <span className="font-semibold text-foreground">{apartment.averageRating}</span>
                    <span className="text-muted-foreground text-sm">({apartment.reviews.length} avis)</span>
                  </div>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {apartment.title}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users size={18} />
                    {apartment.capacity} sensors
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye size={18} />
                    Status Live
                  </span>
                </div>
              </div>

              {/* Amenities */}
              <div className="border-t border-b py-6">
                <h2 className="font-heading text-xl font-bold text-foreground mb-4">Équipements</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {apartment.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Waves;
                    return (
                      <div 
                        key={amenity} 
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <Icon size={18} className="text-accent" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="border-b pb-6">
                <h2 className="font-heading text-xl font-bold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{apartment.description}</p>
              </div>

              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    Reviews ({apartment.reviews.length})
                  </h2>
                  <div className="flex items-center gap-2">
                    <Star className="fill-accent text-accent" size={20} />
                    <span className="font-bold text-foreground text-lg">{apartment.averageRating}</span>
                    <span className="text-muted-foreground">/ 5</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {apartment.reviews.map((review) => (
                    <div 
                      key={review.id} 
                      className="bg-card rounded-xl p-5 border shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <img 
                          src={review.avatar} 
                          alt={review.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-foreground">{review.author}</h3>
                            <span className="text-muted-foreground text-sm flex items-center gap-1">
                              <Clock size={12} />
                              {review.date}
                            </span>
                          </div>
                          <StarRating rating={review.rating} />
                          <p className="text-muted-foreground mt-2">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 border shadow-card">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <span className="font-heading font-bold text-3xl text-foreground">
                      ${apartment.priceForSale}
                    </span>
                    <span className="text-muted-foreground"> /unit</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowReservation(true)}
                  className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-heading font-semibold text-lg hover:brightness-110 transition-all shadow-glow-orange mb-4"
                >
                  Request Demo
                </button>

                <p className="text-center text-muted-foreground text-sm mb-6">
                  You will be invoiced upon deployment
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>${apartment.priceForSale} x 1 unit</span>
                    <span>${apartment.priceForSale}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Deployment Setup</span>
                    <span>$50</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-foreground">
                    <span>Total</span>
                    <span>${(apartment.priceForSale || 0) + 50}</span>
                  </div>
                </div>

                <a
                  href={apartment.airbnbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full flex items-center justify-center gap-2 border border-border text-foreground py-3 rounded-xl font-heading font-semibold hover:bg-secondary transition-colors"
                >
                  <ExternalLink size={16} />
                  Order Device
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Full Screen Photo Gallery */}
      <AnimatePresence>
        {showAllPhotos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground"
          >
            <button
              onClick={() => setShowAllPhotos(false)}
              className="absolute top-4 right-4 z-10 bg-card/80 text-foreground w-12 h-12 rounded-full flex items-center justify-center hover:bg-card transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="h-full flex items-center justify-center p-4 md:p-12">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`${apartment.title} - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>

            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 text-foreground w-12 h-12 rounded-full flex items-center justify-center hover:bg-card transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 text-foreground w-12 h-12 rounded-full flex items-center justify-center hover:bg-card transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === currentImageIndex ? "bg-accent w-6" : "bg-card/50 hover:bg-card"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservation Form Modal */}
      {showReservation && (
        <ReservationForm 
          apartment={apartment} 
          onClose={() => setShowReservation(false)} 
          onBack={() => setShowReservation(false)} 
        />
      )}
    </main>
  );
};

export default ApartmentDetail;
