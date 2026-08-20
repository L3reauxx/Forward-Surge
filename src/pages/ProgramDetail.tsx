import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import type { Program } from '../types/content';
import { getContentRepository } from '../services/content/contentService';
import { AnimatedBlob } from '../components/AnimatedBlob';
import { CaseStudies } from '../components/CaseStudies';
import { DiscoverySessionCard } from '../components/DiscoverySessionCard';

export default function ProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    if (id) {
      getContentRepository()
        .getProgramById(id)
        .then((programData) => {
          if (mounted) setProgram(programData || null);
        });
    } else {
      setProgram(null);
    }
    return () => {
      mounted = false;
    };
  }, [id]);

  if (program === undefined) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!program) {
    return <Navigate to="/programs" replace />;
  }

  const Icon = program.icon || BookOpen;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50 border-b border-slate-200">
        <AnimatedBlob />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white text-brand-700 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border border-slate-200 shadow-sm">
              <Icon className="w-4 h-4" />
              <span>{program.subtitle}</span>
            </div>
            {program.durationBadge && (
              <span className="inline-flex items-center bg-slate-900 text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
                {program.durationBadge}
              </span>
            )}
            {program.formatBadge && (
              <span className="inline-flex items-center bg-brand-50 text-brand-800 border border-brand-200 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
                {program.formatBadge}
              </span>
            )}
          </motion.div>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-8 text-slate-900 leading-[1.1] text-balance flex flex-wrap justify-center gap-x-2"
          >
            {program.title.split(" ").map((word, index) => (
              <motion.span 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 30, rotate: 2 },
                  visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", damping: 15, stiffness: 100 } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            {program.description}
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 border border-brand-200 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm">
                <span>The Challenge</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                {program.problemHeadline}
              </h2>
              <div className="w-20 h-1.5 bg-brand-500 rounded-full mb-8"></div>
              <div className="prose prose-lg prose-slate prose-p:font-medium prose-p:leading-relaxed">
                {program.problemCopy.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
            
            <div>
              {program.problemBarriers && program.problemBarriers.length > 0 ? (
                <div className="relative border-l-2 border-slate-200 pl-8 space-y-12 py-4">
                  {program.problemBarriers.map((barrier, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-brand-500 border-4 border-white shadow-sm" />
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{barrier.title}</h3>
                      <p className="text-slate-600 leading-relaxed font-medium">{barrier.description}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm"
                >
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Navigating the Challenge</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    The complexity of modern leadership requires not just understanding the problem, but having the strategic insight and frameworks to address it systematically. We provide the clarity needed to cut through the noise.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-brand-500/20 text-brand-400 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-brand-500/30">
                <span>The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-[1.15] text-balance">
                {program.solutionHeadline}
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
                {program.solutionCopy}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden aspect-square md:aspect-auto md:h-full min-h-[400px] border border-slate-800 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 to-slate-900/80 mix-blend-multiply z-10" />
              <img 
                src={
                  program.id === 'lamp'
                    ? `${import.meta.env.BASE_URL}images/leadership-presentation.jpg`
                    : program.id === 'bold'
                    ? `${import.meta.env.BASE_URL}images/strategy-collaboration.jpg`
                    : program.id === 'lead-coach'
                    ? `${import.meta.env.BASE_URL}images/workshop-facilitation.jpg`
                    : program.id === 'leadxprnc'
                    ? `${import.meta.env.BASE_URL}images/executive-speaking.jpg`
                    : `${import.meta.env.BASE_URL}images/leadership-presentation.jpg`
                } 
                alt={program.title} 
                className="w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                  <Icon className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <DiscoverySessionCard program={program} />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 border border-brand-200 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm">
              <span>Curriculum & Structure</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {program.overviewHeadline}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg prose-slate mx-auto prose-p:font-medium prose-p:leading-relaxed text-slate-600 text-center mb-12"
          >
            {program.overviewCopy.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>

          {program.overviewList && program.overviewList.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-sm"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-6">Key Program Outcomes</h4>
              <ul className="space-y-5">
                {program.overviewList.map((outcomeItem, index) => (
                  <li 
                    key={index}
                    className="flex items-start"
                  >
                    <div className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-brand-700" />
                    </div>
                    <span className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed">{outcomeItem}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </section>
      
      <CaseStudies />

      <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-white text-brand-700 border border-slate-200 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
              <span>Next Steps</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mb-10 tracking-tight text-balance leading-snug">
              {program.ctaHeadline}
            </h2>
            <Link 
              to={program.ctaLink} 
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-xl text-white bg-slate-900 hover:bg-brand-500 hover:text-slate-950 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl hover:shadow-brand-500/20 focus:ring-4 focus:ring-brand-200 group"
            >
              <span>{program.ctaButtonText}</span>
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
