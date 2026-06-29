import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const programs = [
  {
    id: 'lamp',
    title: 'LAMP',
    subtitle: 'Leadership and Management Program',
    desc: 'Equip your managers to drive performance and propel business growth.'
  },
  {
    id: 'bold',
    title: 'BOLD',
    subtitle: 'Business Oversight Leadership Development',
    desc: 'Define and own your leadership journey through ruthless prioritization.'
  },
  {
    id: 'lead-coach',
    title: 'LEAD COACH',
    subtitle: 'Cultivate People-Practices',
    desc: 'Boost your capacity to foster growth in others.'
  },
  {
    id: 'leadxprnc',
    title: 'LEADXPRNC',
    subtitle: 'Executive Coaching Platform',
    desc: 'Transform your executive presence through our 8-month intensive coaching platform.'
  }
];

const clients = [
  'KCB Group',
  'Standard Chartered',
  'SNDBX',
  'WYLDE International',
  'St. Hannahs',
  'Value 8',
  'Kiota School'
];

const testimonials = [
  {
    id: 1,
    quote: "ForwardSurge completely transformed our executive team's approach to strategic planning. Their LAMP program provided actionable insights that we immediately implemented.",
    name: "Sarah Jenkins",
    role: "Chief Operating Officer, TechCorp"
  },
  {
    id: 2,
    quote: "The coaching from Peril John was eye-opening. We were able to align our people strategies directly with our business goals, resulting in a 30% increase in productivity.",
    name: "David Mwangi",
    role: "HR Director, KCB Group"
  },
  {
    id: 3,
    quote: "Through the BOLD program, our leaders gained a deep understanding of their strengths and weaknesses. The cultural shift in our organization has been profound.",
    name: "Amina Hassan",
    role: "CEO, Innovate Solutions"
  }
];

export default function Home() {
  const [activeProgram, setActiveProgram] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden stripe-gradient py-24 lg:py-32">
        <div className="absolute inset-0 bg-surge-pattern opacity-60"></div>
        <div className="surge-line"></div>
        <div className="surge-line surge-line-delayed"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full"
            >
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 underline decoration-amber-200">
                Lead Magnet: Get LEAP Framework v2.0
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 leading-[1.1] tracking-tight text-balance"
            >
              Aligning People Strategies to <span className="text-red-800">Business Goals.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl"
            >
              We propel business growth by offering fresh perspectives and innovative solutions in Strategy, Leadership, and Management to entities seeking increased productivity and employee engagement.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-wrap gap-4"
            >
              <Link 
                to="/contact" 
                className="bg-red-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-red-100 hover:bg-red-900 transition-colors"
              >
                Start Your Journey
              </Link>
              <Link
                to="/about"
                className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors"
              >
                Our Methodology
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Abstract Strategy Visual (Decorative background) */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 hidden lg:block w-[600px] h-[600px] opacity-40 pointer-events-none">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
            <motion.div 
              animate={{ rotate: [12, 192] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-slate-200 rounded-3xl bg-white/40 glass-card origin-center"
            ></motion.div>
            <motion.div 
              animate={{ rotate: [-12, -192] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-red-800 rounded-3xl origin-center"
            ></motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="text-red-800 flex flex-col items-center">
                <span className="text-6xl font-black">70%</span>
                <span className="text-sm uppercase font-bold tracking-widest mt-2">Application</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar Section */}
      <section className="bg-white border-y border-slate-100 py-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
        >
          <p className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            Trusted by industry leaders
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex whitespace-nowrap overflow-hidden"
        >
          <div className="flex animate-marquee opacity-50 grayscale hover:grayscale-0 transition-all duration-500 min-w-max">
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div key={`${client}-${i}`} className="text-lg font-black tracking-tighter text-slate-800 uppercase mx-8 inline-block">
                {client}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-800 text-sm font-semibold tracking-wide uppercase">
                The Vision Barrier
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900">
                Bridging the Gap
              </h2>
              <blockquote className="border-l-4 border-amber-500 pl-6 text-xl text-slate-600 italic leading-relaxed">
                "The manager who comes up with the right solution to the wrong problem is more dangerous than the manager who comes up with the wrong solution to the right problem."
                <footer className="text-sm text-slate-500 mt-4 font-semibold not-italic">— Peter F. Drucker</footer>
              </blockquote>
              <p className="text-lg text-slate-600 leading-relaxed">
                Does your team have the right people in the right seats? Are your activities linked to your ultimate strategy? We help you bridge the gap between vision and execution.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-[4/3] bg-slate-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop" 
                alt="Team strategy session" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-display font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
              Solutions for Every Stage of Leadership
            </h2>
            <p className="text-lg text-slate-600">
              Transformative programs designed to address specific organizational challenges and foster sustainable growth.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 h-[600px] md:h-[450px] w-full">
            {programs.map((program, index) => {
              const isActive = activeProgram === index;
              const colors = [
                { bg: 'bg-red-50', text: 'text-red-800', hoverBg: 'group-hover:bg-red-800', char: 'L' },
                { bg: 'bg-amber-50', text: 'text-amber-600', hoverBg: 'group-hover:bg-amber-600', char: 'B' },
                { bg: 'bg-slate-100', text: 'text-slate-600', hoverBg: 'group-hover:bg-slate-900', char: 'C' },
                { bg: 'bg-slate-50', text: 'text-slate-500', hoverBg: 'group-hover:bg-slate-800', char: 'X' },
              ];
              const c = colors[index % colors.length];

              return (
                <motion.div 
                  key={program.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setActiveProgram(index)}
                  className={`group relative overflow-hidden bg-white border border-slate-200 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out flex flex-col ${
                    isActive 
                      ? 'flex-grow basis-auto md:basis-2/3 shadow-xl shadow-slate-200' 
                      : 'basis-auto md:basis-[10%] hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-8 h-full flex ${isActive ? 'flex-col justify-between' : 'flex-row md:flex-col items-center md:justify-center'} w-full`}>
                    <div className={`w-12 h-12 flex-shrink-0 ${c.bg} rounded-xl flex items-center justify-center ${c.text} font-bold text-xl ${!isActive && 'mb-0 md:mb-6 mr-4 md:mr-0'} ${c.hoverBg} group-hover:text-white transition-colors`}>
                      {c.char}
                    </div>
                    
                    {!isActive && (
                      <div className="md:rotate-180 md:[writing-mode:vertical-rl] whitespace-nowrap overflow-hidden">
                        <h3 className="text-xl font-bold text-slate-900">{program.title}</h3>
                      </div>
                    )}

                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 md:mt-0 flex-grow flex flex-col justify-end"
                      >
                        <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{program.title}</h3>
                        <div className={`text-sm font-bold ${c.text} uppercase tracking-wider mb-4`}>
                          {program.subtitle}
                        </div>
                        <p className="text-lg text-slate-500 leading-relaxed max-w-lg mb-8">
                          {program.desc}
                        </p>
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          Explore Program <ArrowRight className={`w-5 h-5 ${c.text}`} />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/programs" className="inline-flex items-center text-red-800 font-semibold hover:text-red-900 transition-colors text-lg">
              View all programs in detail <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="absolute inset-0 bg-surge-pattern opacity-[0.03]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-display font-bold tracking-tight text-slate-900 mb-6">
              Client Success Stories
            </h2>
            <p className="text-lg text-slate-600">
              Hear how our strategic interventions have transformed leadership and driven growth for our partners.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
          >
            <div className="overflow-hidden relative min-h-[300px] flex items-center justify-center" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-16"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${activeTestimonial + 1} of ${testimonials.length}`}
                >
                  <Quote className="w-12 h-12 text-amber-500 mb-6 opacity-50" />
                  <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-sm font-bold text-red-800 uppercase tracking-wider mt-1">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-3" role="tablist">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={activeTestimonial === idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeTestimonial === idx ? 'w-8 bg-red-800' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Snippet */}
      <section className="py-24 lg:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 relative border border-slate-800"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-slate-800/50 to-transparent pointer-events-none"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 items-stretch">
              <div className="lg:col-span-2 relative min-h-[400px] md:min-h-full">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop" 
                  alt="Peril John Alubbe" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
              </div>
              <div className="lg:col-span-3 p-10 lg:p-16 flex flex-col justify-center z-10">
                <div className="mb-8">
                  <h3 className="text-3xl font-display font-extrabold text-white mb-2 tracking-tight">Peril John Alubbe</h3>
                  <p className="text-amber-500 font-bold tracking-[0.2em] uppercase text-[10px]">Founder & CEO</p>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light text-balance">
                  "Leadership is an active process of shaping the future. Our goal is to empower organizations by building authentic governance structures and nurturing intelligent leadership."
                </p>
                <Link to="/about" className="inline-flex items-center text-white font-bold hover:text-amber-500 transition-colors uppercase text-xs tracking-widest">
                  Read our full story <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
