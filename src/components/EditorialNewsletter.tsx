import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Mail, ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

type EditorialNewsletterForm = {
  email: string;
};

export function EditorialNewsletter() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<EditorialNewsletterForm>({
    mode: 'onTouched'
  });

  const onSubmit = async (formData: EditorialNewsletterForm) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log('[Newsletter Subscription]:', formData);
    setIsSubscribed(true);
  };

  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative bg-slate-900 rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-800"
        >
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-500/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-brand-500/10 rounded-full blur-[70px] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700 text-brand-400 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3 text-brand-400" />
                <span>The Executive Briefing</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-snug text-balance">
                Strategic insights that shape <span className="text-brand-400">leadership.</span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
                Fortnightly frameworks on leadership governance, board harmonization, and people strategy delivered straight to your inbox.
              </p>
            </div>

            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 text-center space-y-2"
                  >
                    <div className="w-10 h-10 bg-brand-500/20 text-brand-400 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      You're on the list.
                    </h4>
                    <p className="text-slate-300 text-xs font-medium">
                      Welcome to The Executive Briefing. Look out for our next dispatch.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                      <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          autoComplete="email"
                          placeholder="Enter your work email..."
                          aria-label="Work Email Address"
                          className={`w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm text-white bg-slate-800/90 placeholder-slate-400 outline-none transition-all ${
                            errors.email
                              ? 'border-brand-500 focus:ring-2 focus:ring-brand-400'
                              : 'border-slate-700 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:bg-slate-800'
                          }`}
                          {...register('email', {
                            required: 'Work email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Please enter a valid work email'
                            }
                          })}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-500 text-slate-950 hover:bg-brand-400 active:scale-95 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg hover:shadow-brand-500/20 disabled:opacity-70 disabled:cursor-not-allowed shrink-0 cursor-pointer focus:ring-2 focus:ring-brand-300"
                      >
                        {isSubmitting ? (
                          <>
                            <span>Subscribing</span>
                            <Loader2 className="ml-1.5 w-3.5 h-3.5 animate-spin" />
                          </>
                        ) : (
                          <>
                            <span>Join Briefing</span>
                            <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    {errors.email && (
                      <p className="text-brand-400 text-xs font-bold pl-1">
                        {errors.email.message}
                      </p>
                    )}

                    <p className="text-[11px] text-slate-400 pl-1 font-medium">
                      Zero spam. Unsubscribe anytime. Read our{' '}
                      <Link to="/privacy" className="text-slate-300 hover:text-brand-400 underline transition-colors">
                        Privacy Policy
                      </Link>.
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
