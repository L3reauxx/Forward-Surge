import { motion, AnimatePresence, useInView, useSpring } from 'motion/react';
import { Box, ChevronRight, BarChart3, TrendingUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from './AnimatedCounter';

export interface CaseStudy {
  id: number;
  title: string;
  company: string;
  metrics: { value: string; label: string }[];
  products: string[];
  image: string;
  programLink?: string;
}

export const defaultCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Bandari Beauty uses ForwardSurge to align leadership and achieve 3x regional conversion",
    company: "Bandari Beauty",
    metrics: [
      { value: "50k+", label: "active members achieved" },
      { value: "3x", label: "increase in regional conversion" }
    ],
    products: ["LAMP Framework", "Strategic Harmonization", "Custom Advisory"],
    image: `${import.meta.env.BASE_URL}images/strategy-collaboration.jpg`,
    programLink: "/programs/lamp"
  },
  {
    id: 2,
    title: "Kiota School sees 10x revenue growth with unified management framework",
    company: "Kiota School",
    metrics: [
      { value: "10x", label: "revenue growth" },
      { value: "100%", label: "staff onboarding rate" }
    ],
    products: ["LEAD COACH®", "Performance Management"],
    image: `${import.meta.env.BASE_URL}images/workshop-facilitation.jpg`,
    programLink: "/programs/lead-coach"
  },
  {
    id: 3,
    title: "TechFlow streamlines executive workflow for $2M operational savings",
    company: "TechFlow",
    metrics: [
      { value: "$2M", label: "operational savings" },
      { value: "40%", label: "reduction in time-to-market" }
    ],
    products: ["LEADXPRNC®", "Board Harmonization"],
    image: `${import.meta.env.BASE_URL}images/partnership-handshake.jpg`,
    programLink: "/programs/leadxprnc"
  }
];

function parseMetric(metric: string) {
  const match = metric.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (match) {
    const [, prefix, numStr, suffix] = match;
    const num = parseFloat(numStr.replace(/,/g, ''));
    return { prefix, num, suffix };
  }
  return null;
}

interface CaseStudiesProps {
  data?: CaseStudy[];
  caseStudies?: CaseStudy[];
}

export function CaseStudies({ data, caseStudies }: CaseStudiesProps) {
  const studies = caseStudies || data || defaultCaseStudies;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStudy = studies[activeIndex];

  if (!studies || studies.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-stretch min-h-[500px]">
          
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 border border-brand-200 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm">
                <span>Proven Impact</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Client Case Study
              </h2>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`metrics-${activeIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 border-l-2 border-brand-500 pl-6"
              >
                {activeStudy.metrics.map((metric, idx) => {
                  const parsed = parseMetric(metric.value);
                  return (
                    <div key={idx}>
                      <div className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mb-2 tracking-tight">
                        {parsed ? (
                          <AnimatedCounter 
                            prefix={parsed.prefix} 
                            value={parsed.num} 
                            suffix={parsed.suffix} 
                          />
                        ) : (
                          metric.value
                        )}
                      </div>
                      <div className="text-slate-600 font-medium">
                        {metric.label}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`products-${activeIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="border-l-2 border-brand-200 pl-6"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Programs & Interventions</h4>
                <ul className="space-y-3">
                  {activeStudy.products.map((product, idx) => (
                    <li key={idx} className="flex items-center text-slate-600 font-medium text-sm">
                      <Box className="w-4 h-4 mr-3 text-brand-500 flex-shrink-0" />
                      {product}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-full flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="flex-grow rounded-3xl overflow-hidden relative shadow-2xl flex flex-col justify-end p-8 md:p-12 bg-slate-900 border border-slate-800 group"
              >
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/15 rounded-full blur-[80px] pointer-events-none" />

                <div className="absolute inset-0">
                  <img 
                    src={activeStudy.image} 
                    alt={activeStudy.company}
                    className="w-full h-full object-cover opacity-30 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                </div>
                
                <div className="absolute top-10 right-10 flex items-end gap-2 h-24 opacity-25">
                  {[40, 60, 45, 80, 100].map((height, index) => (
                    <motion.div 
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1, type: "spring" }}
                      className="w-3.5 bg-brand-500 rounded-t-sm"
                    />
                  ))}
                </div>

                <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="mb-4 inline-flex items-center space-x-2 bg-brand-500/20 text-brand-400 border border-brand-500/30 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    <span>{activeStudy.company}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-8 max-w-2xl text-balance">
                    {activeStudy.title}
                  </h3>
                  <Link 
                    to={activeStudy.programLink || '/programs'}
                    className="inline-flex items-center space-x-2 text-white bg-white/10 hover:bg-brand-500 hover:text-slate-950 border border-white/20 hover:border-brand-500 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-brand-500/20"
                  >
                    <span>Explore {activeStudy.products[0] || 'Program'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {data.length > 1 && (
          <div className="mt-16 flex flex-wrap justify-center gap-3 md:gap-4 border-t border-slate-200 pt-8">
            {data.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setActiveIndex(index)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeIndex === index 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {study.company}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
