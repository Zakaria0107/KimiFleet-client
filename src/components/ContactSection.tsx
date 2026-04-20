import { useState } from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Briefing request sent. An expert will context you shortly.");
    }, 1000);
  };

  return (
    <section id="contact" className="py-32 bg-white relative">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 mb-4">
            The Briefing.
          </h2>
          <p className="text-xl text-gray-500 font-light">
            Speak with an expert to configure Kimifleet for your scale.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] text-left space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Corporate Email</label>
              <input 
                type="email" 
                required 
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Fleet Size</label>
            <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all appearance-none cursor-pointer">
              <option disabled>Select size</option>
              <option>1-10 Vehicles</option>
              <option>11-50 Vehicles</option>
              <option>50+ Vehicles</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">How many businesses do you manage?</label>
            <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all appearance-none cursor-pointer">
              <option disabled>Select number of branches/entities</option>
              <option>1 (Single Business)</option>
              <option>2-5 Branches</option>
              <option>6+ Entities</option>
              <option>Franchise Operator</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-black text-white px-8 py-4 rounded-lg font-body font-bold text-lg hover:bg-gray-800 transition-all mt-4 tracking-tight"
          >
            {isSubmitting ? "Processing..." : "Request Access"}
          </button>
        </motion.form>

        <p className="text-sm text-gray-400 mt-8">
          Your data is strictly confidential and protected by enterprise-grade security.
        </p>

      </div>
    </section>
  );
};

export default ContactSection;
