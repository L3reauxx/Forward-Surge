import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, ShieldCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export const COOKIE_PREFERENCES_KEY = 'fs_cookie_preferences';

export function openCookiePreferences() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
  }
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (!raw) {
      // Legacy check fallback
      const legacyConsent = localStorage.getItem('cookieConsent');
      if (legacyConsent === 'true') {
        const defaultPrefs: CookiePreferences = {
          necessary: true,
          analytics: true,
          marketing: true,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(defaultPrefs));
      } else {
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } else {
      try {
        const parsed: CookiePreferences = JSON.parse(raw);
        setAnalytics(Boolean(parsed.analytics));
        setMarketing(Boolean(parsed.marketing));
      } catch {
        // invalid json
      }
    }

    const handleOpen = () => {
      setShowDetails(true);
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-preferences', handleOpen);
    return () => window.removeEventListener('open-cookie-preferences', handleOpen);
  }, []);

  const savePreferences = (prefs: { analytics: boolean; marketing: boolean }) => {
    const payload: CookiePreferences = {
      necessary: true,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(payload));
    localStorage.setItem('cookieConsent', 'true');
    setAnalytics(prefs.analytics);
    setMarketing(prefs.marketing);
    setIsVisible(false);
    setShowDetails(false);
  };

  const handleAcceptAll = () => {
    savePreferences({ analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    savePreferences({ analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    savePreferences({ analytics, marketing });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 md:p-6 pointer-events-auto backdrop-blur-md">
            {!showDetails ? (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-500" />
                    <h3 className="text-sm font-bold text-slate-900">Cookie & Privacy Preferences</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We use cookies to ensure website security, analyze traffic, and enhance your advisory browsing experience. You can choose to accept all, reject non-essential cookies, or customize your preferences anytime. Read our{' '}
                    <Link to="/privacy" className="text-brand-700 hover:underline font-semibold">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowDetails(true)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Customize
                  </button>
                  <button
                    type="button"
                    onClick={handleRejectNonEssential}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-5 py-2 bg-slate-900 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                  >
                    Accept All
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsVisible(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors ml-1"
                    aria-label="Close banner without changing preferences"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-brand-500" />
                    <h3 className="text-sm font-bold text-slate-900">Customize Cookie Preferences</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDetails(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">Strictly Necessary</span>
                      <span className="text-[10px] font-bold uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Core security, session management, and routing fallbacks. Always active.
                    </p>
                  </div>

                  <label className="p-3.5 rounded-xl border border-slate-200 hover:border-brand-300 transition-colors cursor-pointer bg-white flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">Analytics & Performance</span>
                        <input
                          type="checkbox"
                          checked={analytics}
                          onChange={(e) => setAnalytics(e.target.checked)}
                          className="w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-400 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Helps us measure site interactions and optimize advisory content delivery.
                      </p>
                    </div>
                  </label>

                  <label className="p-3.5 rounded-xl border border-slate-200 hover:border-brand-300 transition-colors cursor-pointer bg-white flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">Marketing & Personalization</span>
                        <input
                          type="checkbox"
                          checked={marketing}
                          onChange={(e) => setMarketing(e.target.checked)}
                          className="w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-400 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Tailors leadership program recommendations and insight alerts to your interests.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleRejectNonEssential}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Reject All Optional
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="px-4 py-2 bg-slate-900 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Save My Preferences
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

