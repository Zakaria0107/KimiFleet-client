import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "../../node_modules/react-i18next";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Chosen to sit outside the footprint of the centered content card at the
// map's fixed zoom/center below — Casablanca/Rabat/Marrakech/Fes cluster
// right behind the card and would never be visible.
const FLEET_CITIES: { name: string; lat: number; lng: number }[] = [
  { name: "Tangier", lat: 35.7595, lng: -5.8340 },
  { name: "Oujda", lat: 34.6867, lng: -1.9114 },
  { name: "Essaouira", lat: 31.5085, lng: -9.7595 },
  { name: "Agadir", lat: 30.4278, lng: -9.5981 },
  { name: "Tan-Tan", lat: 28.4378, lng: -11.1030 },
];

const MapExperienceSection = () => {
  const { t } = useTranslation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [32.5, -7.6],
      zoom: 6.85,
      minZoom: 6.85,
      maxZoom: 6.85,
      zoomSnap: 0,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      attributionControl: true,
    });
    mapRef.current = map;

    L.control.attribution({ prefix: false, position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      subdomains: "abc",
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    FLEET_CITIES.forEach((city, i) => {
      const icon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;">
            <span class="absolute w-4 h-4 rounded-full bg-blue-500/40 animate-ping" style="animation-delay:${i * 0.3}s"></span>
            <span class="relative w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow"></span>
            <span class="absolute top-5 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded shadow text-[10px] font-bold text-gray-800 whitespace-nowrap">${city.name}</span>
          </div>
        `,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      L.marker([city.lat, city.lng], { icon, interactive: false }).addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section id="map" className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-[#E5E7EB]">
      {/* Real, decorative Morocco fleet map (Leaflet + OpenStreetMap tiles) */}
      <style>{`
        .kf-fleet-map .leaflet-tile-pane { filter: grayscale(100%) contrast(1.05) brightness(1.15); }
        .kf-fleet-map .leaflet-control-attribution { font-size: 9px; opacity: 0.5; background: transparent; }
      `}</style>
      <div ref={mapContainerRef} className="kf-fleet-map absolute inset-0 z-0" />
      {/* Soft grey wash so the map reads as a quiet backdrop, not the focal point */}
      <div className="absolute inset-0 z-[1] bg-gray-200/55 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white"
        >
          <div className="inline-flex items-center gap-2 bg-black border border-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <MapPin size={16} className="text-blue-400" />
            <span>{t("map.badge")}</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-8">
            {t("map.title")}
          </h2>

          <p className="text-xl text-gray-600 font-light leading-relaxed">
            {t("map.subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MapExperienceSection;
