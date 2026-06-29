import { motion } from 'motion/react';

const strategyClients = [
  'Pivot Assets',
  'ASSEK',
  'Bandari Beauty',
  'SixOne Communications',
  'Luxe Nails & Spa',
  'Kibeti Kenya',
  'Contech',
  'Mofit Ltd.',
  'Karen Vineyard Church',
  'Kilimani Project Foundation',
  'Lusoma',
  'KCB Group',
  'Standard Chartered Bank',
  'SNDBX',
  'Angelo Kweli',
  'Beldinas Delicacies',
  'Luna MediSpa'
];

const lampClients = [
  'Kiota School',
  'Value 8 Group',
  'Nouvetta',
  'Nendo',
  'St. Peters Orthopaedic Hospital',
  'Bandari Beauty',
  'Pesaflow',
  'Wylde International',
  'Lami',
  'ICMHS',
  'Little Einsteins East Africa',
  'Habitat for Humanity',
  'Polucon',
  'Afrilabs',
  'Design Source',
  'Kenswed',
  'St. Hannahs',
  'Free Hand',
  'Halisi Hospital',
  'Pezesha',
  'Remark',
  'Tectona',
  'Konvergence',
  'Nairobits',
  'Techminds',
  'Archer Digital',
  'EldoHub',
  'IYBA-Seed',
  'Kenya Climate Ventures',
  'Olive tree Media',
  'Paul Njoroge'
];

export default function Clients() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="stripe-gradient py-24 lg:py-32 border-b border-slate-200 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="absolute inset-0 bg-surge-pattern opacity-40"></div>
        <div className="surge-line"></div>
        <div className="surge-line surge-line-delayed"></div>
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1] text-balance"
          >
            Trusted By <span className="text-amber-500">Industry Leaders.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            We have successfully served and partnered with organizations across various sectors to catalyze authentic leadership and structural governance.
          </motion.p>
        </div>
      </section>

      {/* Strategy Clients Marquee */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">Strategic Partners & Enterprise Clients</h2>
            <p className="text-amber-500 mt-2 text-[10px] uppercase tracking-widest font-bold">Strategy & Board Harmonization</p>
          </div>
        </div>
        
        <div className="flex whitespace-nowrap overflow-hidden py-8">
          <div className="flex animate-marquee hover:animation-paused">
            {[...strategyClients, ...strategyClients].map((client, idx) => (
              <div 
                key={`${client}-${idx}`}
                className="w-72 mx-4 flex-shrink-0 flex items-center justify-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-red-800 hover:shadow-red-900/10 transition-all group"
              >
                <span className="text-center font-display font-extrabold text-slate-900 text-lg group-hover:text-red-800 transition-colors whitespace-normal">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAMP Clients Marquee */}
      <section className="pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">LAMP & Leadership Development</h2>
            <p className="text-red-800 mt-2 text-[10px] uppercase tracking-widest font-bold">Management Training Implementations</p>
          </div>
        </div>
        
        <div className="flex whitespace-nowrap overflow-hidden py-8">
          <div className="flex animate-marquee hover:animation-paused" style={{ animationDirection: 'reverse' }}>
            {[...lampClients, ...lampClients].map((client, idx) => (
              <div 
                key={`${client}-${idx}`}
                className="w-64 mx-4 flex-shrink-0 flex items-center justify-center p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:bg-white hover:shadow-xl hover:border-amber-500 hover:shadow-amber-500/10 transition-all group"
              >
                <span className="text-center font-display font-bold text-slate-700 text-base group-hover:text-amber-600 transition-colors whitespace-normal">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
