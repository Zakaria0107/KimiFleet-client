import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import { findRoute, langFromPath, pathFor } from "@/seo/routes";

const Navbar = ({ onContactOpen }: { onContactOpen?: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const isHomePage = findRoute(location.pathname)?.page === "home";
  const lang = langFromPath(location.pathname);
  const homePath = pathFor("home", lang);
  const shouldShowWhite = !isHomePage || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Links are real URLs ("/fr/#pricing") so they work without JavaScript and from other pages.
  // On the home page they scroll smoothly instead.
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (hash === "#contact" && onContactOpen) {
      e.preventDefault();
      onContactOpen();
      setMobileOpen(false);
      return;
    }
    if (isHomePage) {
      e.preventDefault();
      document.getElementById(hash.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", hash);
    }
    setMobileOpen(false);
  }, [isHomePage, onContactOpen]);

  // Items with `hash` are sections of the home page; items with `href` are pages of their own.
  const navItems: { label: string; hash?: string; href?: string }[] = [
    { label: t("navbar.home"), hash: "#home" },
    { label: t("navbar.solution"), hash: "#solution" },
    { label: t("navbar.fleet"), hash: "#fleet" },
    { label: t("navbar.how_it_works"), hash: "#how-it-works" },
    { label: t("navbar.pricing"), href: pathFor("pricing", lang) },
    { label: t("navbar.faq"), hash: "#faq" },
    // There is no #contact section; the link opens the contact modal on pages that provide one.
    ...(onContactOpen ? [{ label: t("navbar.contact"), hash: "#contact" }] : []),
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${shouldShowWhite ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-5"
          }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
          <a href={homePath} className="flex items-center">
            <div className="h-10 w-32 overflow-hidden flex items-center">
              <img
                src="/logo2.png"
                alt="KimiFleet"
                className={` h-32 object-cover transition-all duration-300 ${shouldShowWhite ? "" : "brightness-0 invert"
                  }`}
              />
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href ?? `${homePath}${item.hash}`}
                onClick={item.hash ? (e) => handleAnchorClick(e, item.hash!) : undefined}
                className={`font-body text-sm font-medium tracking-tight transition-colors hover:text-blue-600 ${shouldShowWhite ? "text-gray-700" : "text-white/90"
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector isWhite={shouldShowWhite} />
            <a
              href="https://kimifleet.com/dashboard/"
              target="_blank"
              rel="noopener"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-body text-sm font-medium tracking-tight hover:bg-blue-700 transition-all"
            >
              {t("navbar.get_started")}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${shouldShowWhite ? "text-gray-700" : "text-white"}`}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href ?? `${homePath}${item.hash}`}
                    onClick={item.hash ? (e) => handleAnchorClick(e, item.hash!) : undefined}
                    className="font-body text-base text-gray-700 hover:text-blue-600 transition-colors py-2"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="https://kimifleet.com/dashboard/"
                  target="_blank"
                  rel="noopener"
                  onClick={() => setMobileOpen(false)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-body text-sm font-medium text-center mt-2"
                >
                  {t("navbar.get_started")}
                </a>
                <div className="flex justify-center pt-4 border-t border-gray-100">
                  <LanguageSelector isWhite={true} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/212773273153"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="whatsapp-float"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </>
  );
};

export default Navbar;
