import { motion } from 'motion/react';
import { Target, Eye, Shield, Users, Layers, TrendingUp } from 'lucide-react';

const values = [
  { name: 'Commitment', icon: Target, desc: 'Unwavering dedication to your organizational success.' },
  { name: 'Integrity', icon: Shield, desc: 'Operating with the highest ethical standards and transparency.' },
  { name: 'Organisation', icon: Layers, desc: 'Structured approaches to chaotic business challenges.' },
  { name: 'Discipline', icon: TrendingUp, desc: 'Consistent execution driving measurable results.' },
];

const team = [
  {
    name: 'Peril John Alubbe',
    role: 'Founder & CEO',
    bio: 'PJ is a certified leadership and business consultant with over 20 years of experience coaching corporate and SME executives. He is a board harmonizer, conflict manager, and social architect passionate about intelligent leadership.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop'
  },
  {
    name: 'Moses Sitati Munoko',
    role: 'Advisory Board Member',
    bio: 'Bringing decades of strategic insight to guide our overarching mission and vision for leadership in Africa.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop'
  },
  {
    name: 'Kennedy Luvembe',
    role: 'Consultant and Life Coach',
    bio: 'Specializes in personal development and organizational behavior, driving individual growth within corporate frameworks.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2940&auto=format&fit=crop'
  }
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden stripe-gradient py-24 lg:py-32">
        <div className="absolute inset-0 bg-surge-pattern opacity-40"></div>
        <div className="surge-line"></div>
        <div className="surge-line surge-line-delayed"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2940&auto=format&fit=crop" 
            alt="Mountain peak at sunrise" 
            className="w-full h-full object-cover opacity-10 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 mb-8 tracking-tight max-w-4xl mx-auto leading-[1.1] text-balance"
          >
            Shaped by Vision. Guided by <span className="text-red-800">Strategy.</span> Grounded in <span className="text-amber-500">Values.</span>
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md border border-slate-200 p-8 rounded-2xl shadow-xl shadow-slate-100"
            >
              <div className="flex items-center space-x-3 mb-4 text-amber-500">
                <Eye className="w-6 h-6" />
                <h3 className="text-xl font-display font-bold text-slate-900 uppercase tracking-wider">Vision</h3>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">
                To impact 3,000 transformed leaders who catalyze and establish authentic governance structures in Africa and beyond by the year 2050.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-md border border-slate-200 p-8 rounded-2xl shadow-xl shadow-slate-100"
            >
              <div className="flex items-center space-x-3 mb-4 text-red-800">
                <Target className="w-6 h-6" />
                <h3 className="text-xl font-display font-bold text-slate-900 uppercase tracking-wider">Mission</h3>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">
                Nurturing intelligent leadership who advance and champion value-based structures, systems, and processes in the marketplace.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600">The foundational pillars that guide our every interaction and strategic decision.</p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={value.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-800 mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative aspect-square bg-slate-900 rounded-3xl p-12 flex flex-col justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/40 via-slate-900 to-slate-900"></div>
              
              <div className="relative z-10 space-y-12">
                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-white mb-2">10%</div>
                  <div className="text-red-500 font-medium uppercase tracking-widest text-sm">Intellectual Learning</div>
                  <div className="text-slate-400 text-sm mt-2">Creating Awareness</div>
                </div>
                
                <div className="text-center">
                  <div className="text-6xl font-display font-bold text-white mb-2">20%</div>
                  <div className="text-red-500 font-medium uppercase tracking-widest text-sm">Adaptive Learning</div>
                  <div className="text-slate-400 text-sm mt-2">Acceptance & Adaptation</div>
                </div>
                
                <div className="text-center">
                  <div className="text-8xl font-display font-bold text-white mb-2">70%</div>
                  <div className="text-red-500 font-medium uppercase tracking-widest text-sm">Application</div>
                  <div className="text-slate-400 text-sm mt-2">Learning by Doing via Coaching</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
                The 10/20/70 Methodology
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                Our training is designed for sustainable behavior change acknowledged by others. We focus on the powerful intersection of Toolset, Skillset, and Mindset.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Intellectual Learning (10%)</h4>
                    <p className="text-slate-600 mt-1">Creating awareness and introducing new concepts and frameworks.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Adaptive Learning (20%)</h4>
                    <p className="text-slate-600 mt-1">Creating acceptance and shaping leaders on how to adapt training for the workplace.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Application (70%)</h4>
                    <p className="text-slate-600 mt-1">"Learning by doing." Real-time coaching that supports behavior change and addresses leadership growth areas.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-slate-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Leadership & Board</h2>
            <p className="text-lg text-slate-600">The experienced minds shaping the future of African enterprise.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-slate-900 shadow-xl">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-300"></div>
                  
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-1 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">{member.name}</h3>
                    <p className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">{member.role}</p>
                    
                    <div className="overflow-hidden">
                      <p className="text-slate-300 leading-relaxed text-sm opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out delay-150">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
