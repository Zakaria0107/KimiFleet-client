import { motion } from "framer-motion";
import { Wrench, ShieldCheck, Activity } from "lucide-react";
import lifecycleImg from "@/assets/kimi_lifecycle.png";

const LifecycleSection = () => {
  return (
    <section className="py-32 bg-white text-gray-900 overflow-hidden relative">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative lg:order-1 order-2"
          >
            <div className="absolute inset-0 bg-blue-100 blur-[80px] rounded-full" />
            <img 
              src={lifecycleImg} 
              alt="Lifecycle tracking progress ring" 
              className="relative z-10 w-full max-w-lg mx-auto rounded-3xl shadow-xl hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:order-2 order-1"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              <Activity size={16} />
              <span>Distance-Based Maintenance</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Precision to the <span className="text-blue-600">kilometer.</span>
            </h2>
            
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              We don't just track location. We track life. Kimifleet monitors the exact wear on every element, alerting you before service becomes a cost.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <Wrench className="text-blue-600 mb-4" size={24} />
                <h3 className="font-heading font-bold text-lg mb-2">Automated Alerts</h3>
                <p className="text-sm text-gray-500">Filters, oils, and tires are tracked by exact odometer metrics.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <ShieldCheck className="text-blue-600 mb-4" size={24} />
                <h3 className="font-heading font-bold text-lg mb-2">Preserve Value</h3>
                <p className="text-sm text-gray-500">Preventative care ensures higher resale value for rental fleets.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LifecycleSection;
