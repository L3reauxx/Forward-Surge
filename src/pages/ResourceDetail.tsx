import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PlayCircle, Download, FileText, Lock } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import type { ResourceItem } from '../types/content';
import { getContentRepository } from '../services/content/contentService';
import { AnimatedBlob } from '../components/AnimatedBlob';

export default function ResourceDetail() {
  const { id } = useParams();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', marketingConsent: false });
  const [fetchedResource, setFetchedResource] = useState<ResourceItem | null>(null);

  useEffect(() => {
    let mounted = true;
    if (id) {
      getContentRepository()
        .getResourceItemByIdOrSlug(id)
        .then((resourceItem) => {
          if (mounted && resourceItem) setFetchedResource(resourceItem);
        });
    }
    return () => {
      mounted = false;
    };
  }, [id]);

  const resource = fetchedResource
    ? {
        title: fetchedResource.title,
        category: (fetchedResource.resourceType || fetchedResource.category || 'Playbook').toUpperCase(),
        type: (fetchedResource.resourceType || fetchedResource.category || 'playbook').toLowerCase(),
        image: `${import.meta.env.BASE_URL}images/leadership-presentation.jpg`,
        description: fetchedResource.description || "Comprehensive guide and strategic resource created by Forward Surge Consultants.",
        speakers: [
          { name: "Peril John Alubbe", role: "Principal Partner" },
          { name: "Moses Sitati Munoko", role: "Lead Consultant" },
        ],
        duration: "25:00",
        tags: ["Leadership", "Strategy"],
      }
    : {
        title:
          "Transforming hospitality: How SaaS platforms are ushering in a new era of growth",
        category: "Playbooks",
        type: "playbook",
        image: `${import.meta.env.BASE_URL}images/leadership-presentation.jpg`,
        description:
          "Few industries have transformed as much in the past five years as hospitality and in-person experiences. Discover how Mews, Olo, and Tripleseat are using emerging technology such as AI to deliver seamless customer experiences at scale, drive growth for merchants, and redefine the role of hospitality teams.",
        speakers: [
          { name: "Tor Opedal", role: "SVP and GM, Payments, Olo" },
          { name: "Drew Pierce", role: "Chief Operating Officer, Tripleseat" },
          { name: "Richard Valtr", role: "Founder, Mews" },
        ],
        duration: "31:37",
        tags: ["Frictionless flows", "Runtime"],
      };

  const isGated = resource.type === 'playbook' || resource.type === 'template';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setIsUnlocked(true);
    }
  };

  const handleDownload = () => {
    if (fetchedResource?.downloadUrl) {
      window.open(fetchedResource.downloadUrl, '_blank', 'noopener,noreferrer');
    } else {
      const element = document.createElement('a');
      const file = new Blob([
        `FORWARD SURGE CONSULTANTS - RESOURCE DOWNLOAD\n\nTitle: ${resource.title}\nCategory: ${resource.category}\n\nDescription:\n${resource.description}\n\nFor advisory and executive coaching inquiries, contact: info@forwardsurge.org`
      ], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      element.download = `${resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <AnimatedBlob />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-[1fr_3fr] gap-12 lg:gap-24 items-start">
          <div className="space-y-8 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/resources" className="inline-flex items-center text-slate-500 hover:text-brand-500 transition-colors font-medium text-sm uppercase tracking-wider mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to resources
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {resource.tags.map((tag, index) => (
                <div key={index} className="border-l-2 border-brand-500 pl-4">
                  <div className="text-sm font-bold text-slate-900">{tag}</div>
                </div>
              ))}
              {resource.duration && (
                <div className="border-l-2 border-slate-200 pl-4">
                  <div className="text-sm font-bold text-slate-900">Runtime</div>
                  <div className="text-sm text-slate-500 font-medium">{resource.duration}</div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="space-y-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance"
            >
              {resource.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-200"
            >
              <div className="aspect-video relative">
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${!isUnlocked && isGated ? 'opacity-50 blur-sm grayscale' : 'opacity-80'}`}
                />
                
                {(!isGated || isUnlocked) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={handleDownload}
                      className="bg-white text-slate-900 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-3 hover:scale-105 transition-transform cursor-pointer shadow-lg hover:bg-slate-50 border border-slate-200"
                    >
                      {resource.type === 'playbook' || resource.type === 'template' ? (
                        <><Download className="w-4 h-4 text-brand-500" /> <span>Download Resource</span></>
                      ) : (
                        <><PlayCircle className="w-4 h-4 text-brand-500" /> <span>Watch Preview</span></>
                      )}
                    </button>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent pointer-events-none" />
              </div>

              <AnimatePresence>
                {isGated && !isUnlocked && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-slate-900/40 backdrop-blur-md"
                  >
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-slate-100">
                      <div className="w-12 h-12 bg-brand-50 text-brand-700 border border-brand-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Lock className="w-5 h-5 text-brand-700" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Unlock this resource</h3>
                      <p className="text-sm text-slate-600 mb-6 font-medium">Please provide your details to access the full {resource.category.toLowerCase()}.</p>
                      
                      <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <div>
                          <input 
                            type="text" 
                            required
                            placeholder="Full name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-brand-100 focus:border-brand-500 outline-none transition-all font-medium"
                          />
                        </div>
                        <div>
                          <input 
                            type="email" 
                            required
                            placeholder="Work email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-brand-100 focus:border-brand-500 outline-none transition-all font-medium"
                          />
                        </div>
                        <div>
                          <input 
                            type="tel" 
                            required
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-brand-100 focus:border-brand-500 outline-none transition-all font-medium"
                          />
                        </div>
                        <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={formData.marketingConsent}
                            onChange={(e) => setFormData({...formData, marketingConsent: e.target.checked})}
                            className="mt-0.5 w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-400 cursor-pointer shrink-0"
                          />
                          <span className="text-xs text-slate-500 leading-snug font-medium">
                            (Optional) Send me executive leadership updates and relevant advisory materials.
                          </span>
                        </label>
                        <button type="submit" className="w-full bg-slate-900 hover:bg-brand-500 hover:text-slate-950 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer">
                          Get Access
                        </button>
                      </form>
                      <p className="text-xs text-slate-400 mt-4 leading-relaxed font-medium">
                        ForwardSurge processes your data to deliver this resource pursuant to our{' '}
                        <Link to="/privacy" className="text-brand-700 hover:underline font-semibold">
                          Privacy Policy
                        </Link>.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg prose-slate prose-p:font-medium prose-p:leading-relaxed text-slate-600"
            >
              <p>{resource.description}</p>
            </motion.div>

            {resource.speakers && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Speakers</h3>
                <ul className="space-y-4">
                  {resource.speakers.map((speaker, index) => (
                    <li key={index} className="flex flex-col sm:flex-row sm:items-baseline">
                      <span className="font-bold text-slate-900 mr-2">{speaker.name},</span>
                      <span className="text-slate-600 font-medium">{speaker.role}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
