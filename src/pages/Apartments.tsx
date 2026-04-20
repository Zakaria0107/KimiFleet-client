import { useState, useEffect, useCallback, useRef, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Waves, Wifi, Car, Eye, Snowflake, Sun, Loader2 } from "lucide-react";
import { apartments, locations, type Apartment } from "@/data/apartments";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const amenityIcons: Record<string, typeof Waves> = {
  "Piscine": Waves, "Fibre optique": Wifi, "Parking": Car, "Vue océan": Eye,
  "Vue panoramique": Eye, "Climatisation": Snowflake, "Terrasse": Sun, "Proche plage": Waves,
};

const ITEMS_PER_PAGE = 9;

interface ApartmentCardProps {
  apt: Apartment;
  index: number;
}

const ApartmentCard = memo(({ apt, index }: ApartmentCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
    className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group"
  >
    <Link to={`/appartements/${apt.id}`}>
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={apt.images[0]} 
          alt={apt.title} 
          loading="lazy" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-heading font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm">
          <MapPin size={12} className="inline mr-1" />{apt.location}
        </span>
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {apt.amenities.slice(0, 3).map((a) => {
            const Icon = amenityIcons[a] || Waves;
            return (
              <span key={a} className="bg-card/80 backdrop-blur-sm text-foreground text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1">
                <Icon size={10} /> {a}
              </span>
            );
          })}
        </div>
        {apt.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm text-foreground text-[10px] font-medium px-2 py-1 rounded-md">
            +{apt.images.length - 1} photos
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-bold text-foreground text-sm line-clamp-1">{apt.title}</h3>
          <div className="flex items-center gap-1">
            <span className="text-accent font-semibold text-sm">{apt.averageRating}</span>
            <span className="text-muted-foreground text-xs">★</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1.5 text-muted-foreground text-xs"><Users size={14} /> {apt.capacity} sensors</span>
          <span className="font-heading font-bold text-accent text-lg">${apt.priceForSale}<span className="text-xs font-normal text-muted-foreground">/unit</span></span>
        </div>
        <div className="bg-primary/10 text-primary text-center py-2.5 rounded-lg font-heading text-xs font-semibold">
          Analyze Device
        </div>
      </div>
    </Link>
  </motion.div>
));

ApartmentCard.displayName = 'ApartmentCard';

const Apartments = () => {
  const [filter, setFilter] = useState("Tous");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Memoize filtered apartments to avoid recalculating on every render
  const filtered = useMemo(
    () => filter === "Tous" ? apartments : apartments.filter((a) => a.location === filter),
    [filter]
  );
  
  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );
  
  const hasMore = visibleCount < filtered.length;

  // Infinite scroll handler
  const handleLoadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate network delay for smooth loading
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filtered.length));
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore, filtered.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [handleLoadMore, hasMore, isLoading]);

  // Reset visible count when filter changes
  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hardware <span className="text-accent">Catalog</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive suite of advanced telematic hardware, tracking modules, and AI dashcams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {locations.map((loc) => (
              <button 
                key={loc} 
                onClick={() => handleFilterChange(loc)}
                className={`px-4 py-2 rounded-lg font-heading text-xs font-semibold transition-all ${
                  filter === loc 
                    ? "bg-primary text-primary-foreground shadow-glow-blue" 
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Apartments Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground text-sm">
              {filtered.length} device{filtered.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((apt, i) => (
                <ApartmentCard 
                  key={apt.id} 
                  apt={apt} 
                  index={i} 
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Infinite Scroll Loader */}
          {hasMore && (
            <div ref={loaderRef} className="flex justify-center items-center py-12">
              {isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="animate-spin" size={24} />
                  <span>Chargement...</span>
                </div>
              ) : (
                <div className="h-12" /> // Invisible element for intersection observer
              )}
            </div>
          )}

          {/* No more results */}
          {!hasMore && filtered.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                You have viewed all available hardware
              </p>
            </motion.div>
          )}

          {/* No results */}
          {filtered.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No hardware found for this category
              </p>
              <button 
                onClick={() => handleFilterChange("Tous")}
                className="mt-4 text-accent hover:underline"
              >
                View all hardware
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Apartments;
