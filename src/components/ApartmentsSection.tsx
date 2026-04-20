import { useState, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, ExternalLink, Waves, Wifi, Car, Eye, Snowflake, Sun, Sparkles } from "lucide-react";
import { apartments, locations, type Apartment } from "@/data/apartments";

const amenityIcons: Record<string, typeof Waves> = {
  "Piscine": Waves, "Fibre optique": Wifi, "Parking": Car, "Vue océan": Eye,
  "Vue panoramique": Eye, "Climatisation": Snowflake, "Terrasse": Sun, "Proche plage": Waves,
};

interface ApartmentCardProps {
  apt: Apartment;
  index: number;
}

const ApartmentCard = memo(({ apt, index }: ApartmentCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
    className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <Link to={`/appartements/${apt.id}`}>
      <div className="relative overflow-hidden aspect-[4/3]">
        <img src={apt.images[0]} alt={apt.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm">
            <MapPin size={12} className="text-blue-600" />
            {apt.location}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {apt.amenities.slice(0, 3).map((a) => {
              const Icon = amenityIcons[a] || Waves;
              return (
                <span key={a} className="bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1">
                  <Icon size={10} /> {a}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">FleetOps</span>
            <h3 className="font-display font-semibold text-gray-900 text-base leading-tight mt-1">{apt.title}</h3>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
            <span className="text-blue-600 font-semibold text-sm">{apt.averageRating}</span>
            <span className="text-gray-400 text-xs">★</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1.5 text-gray-500 text-sm">
            <Users size={16} className="text-gray-400" />
            {apt.capacity} sensors
          </span>
        </div>

        <div className="flex items-baseline gap-1 mb-5">
          {apt.priceForSale && (
            <span className="font-display font-bold text-gray-900 text-2xl">${apt.priceForSale.toLocaleString()}</span>
          )}
          <span className="text-gray-500 font-medium">USD</span>
          {apt.pricePerMonth && (
            <span className="text-gray-400 text-sm ml-2">${apt.pricePerMonth.toLocaleString()}/mo</span>
          )}
        </div>

        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <button className="flex-1 bg-blue-600 text-white text-center py-2.5 rounded-lg font-body text-sm font-medium tracking-tight hover:bg-blue-700 transition-all">
            Analyze Data
          </button>
          <a href={apt.airbnbLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors">
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </Link>
  </motion.div>
));

ApartmentCard.displayName = 'ApartmentCard';

const ApartmentsSection = () => {
  const [filter, setFilter] = useState("Tous");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(
    () => filter === "Tous" ? apartments : apartments.filter((a) => a.location === filter),
    [filter]
  );
  
  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  return (
    <section id="appartements" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>Financial Automation</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Distance-to-Dollar Economics
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-body">
            Automated invoicing and cost-per-mile analysis driven strictly by high-integrity GPS data.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {locations.map((loc) => (
            <button key={loc} onClick={() => { setFilter(loc); setVisibleCount(6); }}
              className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all ${
                filter === loc 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}>
              {loc}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((apt, i) => <ApartmentCard key={apt.id} apt={apt} index={i} />)}
          </AnimatePresence>
        </div>

        {visibleCount < filtered.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-12">
            <Link 
              to="/appartements" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-body font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Generate Financial Reports
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ApartmentsSection;
