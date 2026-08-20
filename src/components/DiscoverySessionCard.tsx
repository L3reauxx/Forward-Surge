import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, UserCheck, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Program } from '../types/content';

type DiscoveryFormData = {
  workEmail: string;
  primaryChallenge: string;
};

interface DiscoverySessionCardProps {
  program: Program;
}

export function DiscoverySessionCard({ program }: DiscoverySessionCardProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<DiscoveryFormData>({
    mode: 'onTouched'
  });

  const onSubmit = async (formData: DiscoveryFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    console.log(`[Discovery Session Lead - ${program.title}]:`, formData);
    setIsSubmitted(true);
  };

  const headline = program.discoveryHeadline || "Claim Your Leadership Readiness Assessment";
  const subheadline = program.discoverySubheadline || "A complimentary 30-minute diagnostic session with a Senior Leadership Consultant to audit your strategic alignment and execution readiness.";
  
  const deliverables = program.discoveryDeliverables && program.discoveryDeliverables.length > 0 
    ? program.discoveryDeliverables 
    : [
        "Executive Alignment Diagnostic — Identify where team execution currently stalls.",
        "Curriculum & Framework Fit — Determine the high-leverage interventions for your team.",
        "Actionable 30-Day Strategy Roadmap — Clear, measurable next steps for your leadership."
      ];

  const challenges = program.discoveryChallenges && program.discoveryChallenges.length > 0
    ? program.discoveryChallenges
    : [
        "Strategic execution & vision alignment",
        "Manager-to-leader mindset transition",
        "Team accountability & performance bottlenecks",
        "Retaining & developing high-potential talent"
      ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative bg-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-800"
        >
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-500/20 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-500/10 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-brand-500/15 border border-brand-500/30 text-brand-400 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complimentary 30-Min Diagnostic</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                {headline}
              </h3>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                {subheadline}
              </p>

              <div className="pt-2 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  What you receive during the session:
                </p>
                <div className="space-y-3">
                  {deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-brand-500/20 border border-brand-400/40 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                        {deliverable}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <span>30 Minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-brand-400" />
                  <span>Senior Consultant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-brand-400" />
                  <span>100% Confidential</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-6 sm:py-8 space-y-4"
                    >
                      <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto text-brand-500 shadow-sm border border-brand-100">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
                        Session Requested!
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        Thank you for claiming your <strong>{program.title} Readiness Assessment</strong>. A senior consultant will review your focus area and email you within 24 hours with schedule availability.
                      </p>
                      <div className="pt-4">
                        <span className="inline-flex items-center text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100">
                          Priority Queue: {program.title}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div>
                        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block mb-1">
                          Quick Intake • 2 Fields
                        </span>
                        <h4 className="text-xl font-bold font-display text-slate-900 tracking-tight">
                          Claim Your Session
                        </h4>
                      </div>

                      <div>
                        <label 
                          htmlFor={`email-${program.id}`} 
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                        >
                          Work Email Address <span className="text-brand-500">*</span>
                        </label>
                        <input
                          id={`email-${program.id}`}
                          type="email"
                          autoComplete="email"
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50 placeholder-slate-400 outline-none transition-all ${
                            errors.workEmail 
                              ? 'border-brand-500 focus:ring-2 focus:ring-brand-200' 
                              : 'border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:bg-white'
                          }`}
                          {...register('workEmail', {
                            required: 'Work email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Please enter a valid work email'
                            }
                          })}
                        />
                        {errors.workEmail && (
                          <p className="text-brand-600 text-xs font-bold mt-1.5">
                            {errors.workEmail.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label 
                          htmlFor={`challenge-${program.id}`} 
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                        >
                          Primary Focus or Challenge <span className="text-brand-500">*</span>
                        </label>
                        <select
                          id={`challenge-${program.id}`}
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50 outline-none transition-all ${
                            errors.primaryChallenge 
                              ? 'border-brand-500 focus:ring-2 focus:ring-brand-200' 
                              : 'border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:bg-white'
                          }`}
                          defaultValue=""
                          {...register('primaryChallenge', {
                            required: 'Please select your primary challenge'
                          })}
                        >
                          <option value="" disabled>Select your core challenge...</option>
                          {challenges.map((challengeOption, index) => (
                            <option key={index} value={challengeOption}>
                              {challengeOption}
                            </option>
                          ))}
                          <option value="Other strategic priorities">Other strategic leadership priority</option>
                        </select>
                        {errors.primaryChallenge && (
                          <p className="text-brand-600 text-xs font-bold mt-1.5">
                            {errors.primaryChallenge.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center px-6 py-4 bg-slate-900 text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-brand-500 hover:text-slate-950 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-xl hover:shadow-brand-500/20 disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer focus:ring-4 focus:ring-brand-200"
                      >
                        {isSubmitting ? (
                          <>
                            <span>Scheduling Assessment...</span>
                            <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            <span>Claim Free Discovery Session</span>
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <p className="text-xs text-slate-500 text-center leading-relaxed font-medium">
                        No sales pitch. 100% confidential. By submitting, you agree to our{' '}
                        <Link to="/privacy" className="text-brand-700 hover:underline font-bold">
                          Privacy Policy
                        </Link>.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
