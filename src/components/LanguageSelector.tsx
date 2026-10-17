import { Languages, Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { alternatesFor, findRoute, langFromPath, type Lang } from "@/seo/routes";

const LANGUAGE_LABELS: Record<Lang, { name: string; flag: string }> = {
  fr: { name: "Français", flag: "🇫🇷" },
  en: { name: "English", flag: "🇺🇸" },
};

export const LanguageSelector = ({ isWhite = false }: { isWhite?: boolean }) => {
  const location = useLocation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = langFromPath(location.pathname);
  const route = findRoute(location.pathname);
  // Each language has its own URL: switching loads the same page in the other language.
  const options = route ? alternatesFor(route.page) : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (options.length < 2) return null;

  return (
    <div className="relative" ref={langRef}>
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        aria-expanded={isLangOpen}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isWhite
            ? "hover:bg-gray-100 text-gray-700"
            : "hover:bg-white/10 text-white/90"
          }`}
      >
        <Languages size={18} />
        <span className="text-sm font-medium uppercase tracking-wider">{currentLang}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Always in the HTML (hidden with CSS) so the alternate-language links are crawlable. */}
      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[60] origin-top-right transition duration-200 ${isLangOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "invisible opacity-0 scale-95 translate-y-2.5"
          }`}
      >
        <div className="py-2">
          {options.map((option) => (
            <a
              key={option.lang}
              href={option.path}
              hrefLang={option.lang}
              lang={option.lang}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{LANGUAGE_LABELS[option.lang].flag}</span>
                <span className={`text-sm font-medium ${currentLang === option.lang ? 'text-blue-600' : 'text-gray-700'}`}>
                  {LANGUAGE_LABELS[option.lang].name}
                </span>
              </div>
              {currentLang === option.lang && (
                <Check size={16} className="text-blue-600" />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
