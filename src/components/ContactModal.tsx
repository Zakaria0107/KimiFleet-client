import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ContactModal = ({ open, onClose }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Le nom est requis";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.message.trim()) e.message = "Le message est requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);

    const whatsappMessage = `Hello FleetOps Experts!%0A%0AFullName: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0A%0AMessage:%0A${form.message}`;
    const whatsappUrl = `https://wa.me/212641800086?text=${whatsappMessage}`;

    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="bg-gray-900 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">Get in Touch</h2>
                  <p className="text-gray-400 text-sm">Direct Expert Line</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Fermer">
                <X size={24} />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 text-center"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-white" size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">Redirecting...</h3>
                <p className="text-gray-500 font-body">Open WhatsApp to send your inquiry</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-blue-700 font-body text-sm text-center">
                    💬 Your message will be sent directly via WhatsApp
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-body">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all placeholder:text-gray-400 font-body"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-body">Business Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all placeholder:text-gray-400 font-body"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-body">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all placeholder:text-gray-400 font-body"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-body">Fleet Size & Current Hardware *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your current fleet size and Teltonika devices..."
                    rows={4}
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all resize-none placeholder:text-gray-400 font-body"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-body font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                  <Send size={18} />
                  Request Demo via WhatsApp
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
