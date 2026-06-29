import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import React, { useRef, useState } from 'react';
import { ArrowRight, BookOpen, Compass, Users, Award, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const programs = [
  {
    id: 'lamp',
    title: 'LAMP',
    subtitle: 'Leadership and Management Program',
    icon: BookOpen,
    description: 'A 6-month journey covering mission-critical areas of management. LAMP equips managers to think critically, devolve decision-making, ask the right questions, and clarify strategic priorities.',
    modules: [
      {
        name: 'LAMP 1.0 (Foundations)',
        details: 'Covers Leadership in 3D, personality insights, quality thinking, situational leadership, time management, and productivity.'
      },
      {
        name: 'LAMP 2.0 (Organizational)',
        details: 'Focuses on political savviness, organizational culture, feedback, failure management, and change management.'
      }
    ],
    audience: 'Emergent & Growth Stage Leaders',
    ctaText: 'Enroll in LAMP',
    ctaLink: '/contact?program=lamp'
  },
  {
    id: 'bold',
    title: 'BOLD',
    subtitle: 'Business Oversight Leadership Development',
    icon: Compass,
    description: 'What is the real job of a leader? Effective leaders make tough decisions through ruthless prioritization. BOLD helps you cultivate an acute sense of self-awareness regarding your capabilities, strengths, and weaknesses.',
    modules: [],
    audience: 'Strategic & Legacy Leaders',
    ctaText: 'Discover BOLD',
    ctaLink: '/contact?program=bold'
  },
  {
    id: 'lead-coach',
    title: 'LEAD COACH®',
    subtitle: 'Cultivate the right people-practices',
    icon: Users,
    description: 'LEAD COACH helps you create a coaching culture, groom high-potential performers, and facilitate crucial conversations using the law of the harvest: Condition the soil, Sow the seed, Water it, Reap the harvest.',
    modules: [],
    audience: 'Executive Coaches & Mentors',
    ctaText: 'Become a Lead Coach',
    ctaLink: '/contact?program=lead-coach'
  },
  {
    id: 'leadxprnc',
    title: 'LEADXPRNC®',
    subtitle: 'Executive Coaching Program',
    icon: Award,
    description: 'An 8-month executive coaching program curated around the ForwardSurge 10Ps leadership framework. Use personal leadership branding to enhance self-awareness, understand personal influence, and drive corporate performance.',
    modules: [],
    audience: 'C-Suite & Senior Executives',
    ctaText: 'Start Your Journey',
    ctaLink: '/contact?program=leadxprnc'
  }
];

function ProgramCard({ program, index }: { program: any; index: number }) {
  const Icon = program.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.15);
    mouseY.set(y * 0.15);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-xl shadow-slate-100 border border-slate-200 relative overflow-hidden group"
    >
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-50 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl pointer-events-none transition-colors group-hover:bg-amber-100/60"
      />
      
      <div className="grid lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-white shadow-lg border border-slate-800">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight">{program.title}</h2>
            <h3 className="text-sm font-bold text-red-800 mt-2 uppercase tracking-widest">{program.subtitle}</h3>
          </div>
          <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">
            Target: {program.audience}
          </div>
        </div>
        
        <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            {program.description}
          </p>
          
          {program.modules && program.modules.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-slate-200">
              {program.modules.map((mod: any, i: number) => (
                <div key={i} className="flex space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{mod.name}</h4>
                    <p className="text-slate-600 mt-1 font-medium">{mod.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-6 mt-auto">
            <Link 
              to={program.ctaLink} 
              className="inline-flex items-center text-sm font-bold text-slate-900 uppercase tracking-wider group/btn hover:text-red-800 transition-colors"
            >
              {program.ctaText}
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const faqs = [
  {
    question: 'How long do the leadership programs typically last?',
    answer: 'Our core programs vary in length. LAMP is a 6-month journey, LEADXPRNC® is an 8-month executive coaching program, and custom corporate interventions can be tailored from a few days to a year depending on organizational needs.'
  },
  {
    question: 'Can programs be customized for our specific industry?',
    answer: 'Absolutely. While our frameworks (like the ForwardSurge 10Ps) remain consistent, we heavily contextualize the case studies, scenarios, and application modules to match your industry\'s unique challenges and strategic goals.'
  },
  {
    question: 'Who facilitates the leadership sessions?',
    answer: 'Sessions are led by our Founder, Peril John Alubbe, and our network of seasoned executive coaches who have deep, practical experience in corporate leadership and organizational strategy.'
  },
  {
    question: 'Do you offer virtual or in-person sessions?',
    answer: 'We offer both. We can facilitate fully in-person retreats, virtual cohorts, or a hybrid model that maximizes engagement while accommodating distributed teams.'
  },
  {
    question: 'What is the expected ROI from these programs?',
    answer: 'Organizations typically see improvements in executive alignment, reduced leadership turnover, more effective delegation, and clearer execution of strategic goals. We help you establish key performance indicators at the start of the engagement.'
  }
];

function FAQAccordion({ faq, isOpen, onClick }: { faq: any, isOpen: boolean, onClick: () => void }) {
  const contentId = `faq-answer-${faq.question.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-red-800/30 transition-colors shadow-sm hover:shadow-md">
      <button 
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:bg-slate-50"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="font-bold text-slate-900 pr-8 text-lg">{faq.question}</span>
        <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 bg-red-50 text-red-800' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Programs() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="stripe-gradient py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="absolute inset-0 bg-cross-pattern opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white text-amber-500 px-4 py-2 rounded-full mb-8 text-[10px] font-bold tracking-widest uppercase border border-slate-200 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-red-800"></span>
            <span>Specializations Built for Impact</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tight mb-8 text-slate-900 leading-[1.1]"
          >
            Aligning People Strategies <br className="hidden md:block"/><span className="text-red-800">to Business Goals.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium text-balance"
          >
            We specialize in Board Harmonization, Leadership Development, Performance Management, Strategy Formulation, and Executive Coaching.
          </motion.p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {programs.map((program, idx) => (
              <ProgramCard key={program.id} program={program} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Common questions about our programs and engagement process.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQAccordion 
                key={index} 
                faq={faq} 
                isOpen={openFaq === index} 
                onClick={() => setOpenFaq(openFaq === index ? null : index)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 stripe-gradient border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mb-6 tracking-tight">
            Which program is right for your team?
          </h2>
          <p className="text-lg text-slate-600 mb-10 font-medium">
            Let's have a conversation to understand your specific challenges and match you with the right developmental framework.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-slate-200"
          >
            Let's Talk
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
