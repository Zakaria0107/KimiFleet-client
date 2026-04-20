import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, Calendar, User, Mail, Phone, Home, Check, Loader2 } from "lucide-react";
import type { Apartment } from "@/data/apartments";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface Props {
  apartment: Apartment;
  onClose: () => void;
  onBack: () => void;
}

const ReservationForm = ({ apartment, onClose, onBack }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    guests: apartment.capacity.toString(),
    specialRequests: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email invalide";
    if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
    if (!formData.checkInDate) newErrors.checkInDate = "La date d'arrivée est requise";
    if (!formData.checkOutDate) newErrors.checkOutDate = "La date de départ est requise";
    if (formData.checkInDate && formData.checkOutDate && formData.checkInDate >= formData.checkOutDate) {
      newErrors.checkOutDate = "La date de départ doit être après l'arrivée";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-2xl shadow-card-hover w-full max-w-md p-8 text-center"
        >
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-accent" size={40} />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Réservation confirmée!</h2>
          <p className="text-muted-foreground mb-6">
            Merci {formData.firstName}! Votre demande de réservation pour <strong>{apartment.title}</strong> a été envoyée avec succès.
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Un email de confirmation a été envoyé à {formData.email}. Notre équipe vous contactera dans les plus brefs délais.
          </p>
          <Button
            onClick={onClose}
            className="w-full bg-accent text-accent-foreground hover:brightness-110"
          >
            Fermer
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-2xl shadow-card-hover w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="relative p-6 border-b border-border">
            <button
              onClick={onBack}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Retour"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground text-center">
              Réserver maintenant
            </h2>
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Apartment Summary */}
          <div className="p-4 bg-primary/5 border-b border-border">
            <div className="flex gap-4">
              <img
                src={apartment.images[0]}
                alt={apartment.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-heading font-semibold text-foreground text-sm line-clamp-2">
                  {apartment.title}
                </h3>
                <p className="text-muted-foreground text-xs mt-1">
                  {apartment.location} • {apartment.capacity} personnes
                </p>
                <p className="font-heading font-bold text-accent text-lg mt-1">
                  {apartment.pricePerNight}€<span className="text-xs font-normal text-muted-foreground">/nuit</span>
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">
                  Prénom <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">
                  Nom <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className={`pl-10 ${errors.lastName ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Téléphone <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+212 6XX XXX XXX"
                  className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkInDate" className="text-foreground">
                  Date d'arrivée <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    id="checkInDate"
                    name="checkInDate"
                    type="date"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    className={`pl-10 ${errors.checkInDate ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.checkInDate && <p className="text-red-500 text-xs">{errors.checkInDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOutDate" className="text-foreground">
                  Date de départ <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    id="checkOutDate"
                    name="checkOutDate"
                    type="date"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    className={`pl-10 ${errors.checkOutDate ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.checkOutDate && <p className="text-red-500 text-xs">{errors.checkOutDate}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests" className="text-foreground">
                Nombre de personnes
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  max={apartment.capacity}
                  value={formData.guests}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests" className="text-foreground">
                Demandes spéciales (optionnel)
              </Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Demandes particulières, équipements souhaités..."
                className="resize-none"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground hover:brightness-110 mt-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Envoi en cours...
                </>
              ) : (
                "Confirmer la réservation"
              )}
            </Button>

            <p className="text-muted-foreground text-xs text-center mt-4">
              En confirmant, vous acceptez nos conditions de réservation. 
              Nous vous contacterons pour finaliser votre réservation.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReservationForm;
