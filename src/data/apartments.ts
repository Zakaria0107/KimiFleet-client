export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

export interface Apartment {
  id: number;
  title: string;
  location: string;
  capacity: number;
  pricePerNight: number;
  priceForSale?: number;
  pricePerMonth?: number;
  currency: string;
  images: string[];
  amenities: string[];
  airbnbLink: string;
  description: string;
  reviews: Review[];
  averageRating: number;
  type: "vente" | "location" | "vacation";
}

export const apartments: Apartment[] = [
  { 
    id: 1, 
    title: "FMB120 Advanced Tracker", 
    location: "Global Trackers", 
    capacity: 12, 
    pricePerNight: 0, 
    priceForSale: 149,
    pricePerMonth: 12,
    currency: "USD", 
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"
    ], 
    amenities: ["Climatisation", "Fibre optique", "Parking"], 
    airbnbLink: "#", 
    description: "Compact and professional tracker with internal High Gain GNSS and GSM antennas. Precise telemetry polling, perfect for light vehicle fleets.",
    averageRating: 4.8,
    reviews: [
      { id: 1, author: "System Admin", avatar: "https://i.pravatar.cc/150?u=admin", rating: 5, date: "2024-01-15", text: "Excellent hardware integration, deep diagnostics." }
    ],
    type: "vente"
  },
  { 
    id: 2, 
    title: "FMC130 LTE Module", 
    location: "Global Trackers", 
    capacity: 24, 
    pricePerNight: 0, 
    priceForSale: 199,
    pricePerMonth: 15,
    currency: "USD", 
    images: [
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600"
    ], 
    amenities: ["Vue panoramique", "Terrasse", "Piscine"], 
    airbnbLink: "#", 
    description: "LTE Category 4 module offering robust connectivity globally, fallback to 3G/2G. Integrates completely with FleetOps unified dashboard.",
    averageRating: 4.9,
    reviews: [
      { id: 1, author: "Tech Lead", avatar: "https://i.pravatar.cc/150?u=tech", rating: 5, date: "2024-02-01", text: "Immediate syncing." },
    ],
    type: "vente"
  },
  { 
    id: 3, 
    title: "OBDII Plug & Play", 
    location: "OBD Devices", 
    capacity: 6, 
    pricePerNight: 0, 
    priceForSale: 89,
    pricePerMonth: 9,
    currency: "USD", 
    images: [
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600"
    ], 
    amenities: ["Parking", "Fibre optique", "Climatisation"], 
    airbnbLink: "#", 
    description: "Plug and Play tracker with advanced OBDII data reading. Instant RPM, Speed, and Engine Diagnostic Trouble Codes (DTC).",
    averageRating: 4.5,
    reviews: [
      { id: 1, author: "Manager", avatar: "https://i.pravatar.cc/150?u=mgr", rating: 5, date: "2024-02-05", text: "Saved us thousands in maintenance logic." }
    ],
    type: "vente"
  },
  { 
    id: 4, 
    title: "Dual AI Dashcam", 
    location: "Video Telematics", 
    capacity: 2, 
    pricePerNight: 0, 
    priceForSale: 349,
    pricePerMonth: 29,
    currency: "USD", 
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600"
    ], 
    amenities: ["Vue panoramique", "Proche plage", "Terrasse", "Parking"], 
    airbnbLink: "#", 
    description: "Advanced AI Dashcam bringing 1080p road-facing & cabin-facing video. Alerts drivers in real-time via advanced ADAS.",
    averageRating: 4.7,
    reviews: [
      { id: 1, author: "Director", avatar: "https://i.pravatar.cc/150?u=dir", rating: 5, date: "2024-02-10", text: "Decreased liabilities by 60%." }
    ],
    type: "vente"
  },
  { 
    id: 5, 
    title: "Asset Tracker BLE", 
    location: "Sensors", 
    capacity: 100, 
    pricePerNight: 0, 
    priceForSale: 49,
    pricePerMonth: 5,
    currency: "USD", 
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600"
    ], 
    amenities: ["Fibre optique", "Parking", "Climatisation"], 
    airbnbLink: "#", 
    description: "Bluetooth Low Energy beacons designed to be placed on expensive equipment inside vehicles to ensure tools are never left behind.",
    averageRating: 4.9,
    reviews: [
      { id: 1, author: "Contractor", avatar: "https://i.pravatar.cc/150?u=cont", rating: 5, date: "2024-02-08", text: "Found my stolen drills using the map." }
    ],
    type: "vente"
  },
  { 
    id: 6, 
    title: "Heavy Duty CAN Adapter", 
    location: "Global Trackers", 
    capacity: 48, 
    pricePerNight: 0, 
    priceForSale: 250,
    pricePerMonth: 19,
    currency: "USD", 
    images: [
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600"
    ], 
    amenities: ["Vue océan", "Piscine", "Terrasse", "Climatisation"], 
    airbnbLink: "#", 
    description: "Read data from agriculture, construction and heavy machinery via standard CAN networks (J1939, J1708).",
    averageRating: 4.8,
    reviews: [
      { id: 1, author: "Fleet Manager", avatar: "https://i.pravatar.cc/150?u=mgr", rating: 5, date: "2024-03-01", text: "Fuel metrics on excavators are 100% accurate." }
    ],
    type: "vente"
  }
];

export const locations = [
  "Tous",
  "Global Trackers",
  "OBD Devices",
  "Video Telematics",
  "Sensors",
];
