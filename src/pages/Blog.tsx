import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedBlob } from '../components/AnimatedBlob';
import type { BlogPost } from '../types/content';
import { getContentRepository } from '../services/content/contentService';

export default function Blog() {
  const [postsList, setPostsList] = useState<BlogPost[]>([]);

  useEffect(() => {
    let mounted = true;
    getContentRepository()
      .getBlogPosts()
      .then((posts) => {
        if (mounted) setPostsList(posts);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <section className="stripe-gradient py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-surge-pattern opacity-40"></div>
        <AnimatedBlob />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white text-brand-700 border border-slate-200 px-3.5 py-1.5 rounded-full mb-8 text-[10px] font-bold tracking-widest uppercase shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500"></span>
            <span>Insights & Perspectives</span>
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
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-8 text-slate-900 leading-[1.1] text-balance flex flex-wrap justify-center gap-x-2"
          >
            {"Thoughts on".split(" ").map((word, index) => (
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
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 30, rotate: 2, color: "#0f172a" },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotate: 0, 
                  color: "#f8b800",
                  transition: { 
                    type: "spring", damping: 15, stiffness: 100,
                    color: { delay: 0.4, duration: 0.6 }
                  } 
                }
              }}
            >
              Leadership.
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Explore our latest articles, frameworks, and ideas on organizational development, strategic management, and authentic leadership.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {postsList.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-200 transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-500 transition-colors">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h2>
                  
                  <p className="text-slate-600 mb-8 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                    <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                      <User className="w-4 h-4 text-brand-500" />
                      <span>{post.author}</span>
                    </div>
                    <Link to={`/post/${post.id}`} className="text-brand-700 font-bold text-sm uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform">
                      Read
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
