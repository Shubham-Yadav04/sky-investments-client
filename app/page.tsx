'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3,
  Briefcase,
  CircleDollarSign,
  PieChart,
  Landmark,
  Wallet,
  Globe,
  Coins
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Footer from '@/components/Footer';
import AnimatedSpanText from '@/components/AnimatedSpanText';

// Floating Icon Component
const FloatingIcon = ({ icon: Icon, delay, x, y }: { icon: any, delay: number, x: string, y: string }) => (
  <motion.div
    className={`absolute text-white/70 pointer-events-none z-0`}
    style={{ top: y, left: x }}
    animate={{
      opacity: [0.1, 0.5, 0.1],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
  >
    <Icon size={48} />
  </motion.div>
);


export default function Home() {
  const [mounted, setMounted] = useState(false);

  
const floatingIcons = [
  { icon: TrendingUp, delay: 0 },
 
 
  { icon: PieChart, delay: 1.5 },
  { icon: Landmark, delay: 3 },
  { icon: Wallet, delay: 2.5 },
 { icon: CircleDollarSign, delay: 2 },
  { icon: Coins, delay: 3.5 },
];
const trigSpread = (
   index: number,
  min = 10,
  max = 90
) => {
  const range = (max - min);
  const angle = index * 1.3999632297; // golden angle

  const x = (Math.cos(angle) + 1) / 2;
  const y = (Math.sin(angle) + 1) / 2;

  return {
    x: `${min-index + (x * range)}%`,
    y: `${min+index + (y * range)}%`,
  };
};
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white  w-full h-fit">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden  text-white w-full bg-gradient-to-b from-white via-sky-50 to-white ">
       <div className=' max-w-3xl  flex flex-col items-center justify-start mx-auto mt-5 '>
        <div className='relative flex flex-col items-center  px-3 py-6  w-full'>
          <h1 className="text-slate-900 font-black text-[3rem] leading-tight w-full">
  Hi, I am{" "}
  <span className="bg-gradient-to-b from-blue-700 via-sky-400 to-transparent text-transparent bg-clip-text">
    <AnimatedSpanText
      props={{ textContent: ["Akash Singh", "An Investor", "A Trader"] }}
    />
  </span>
</h1>

<p className="mt-4 text-slate-600 w-full text-start">
A stock market investor & trader with 5+ years of experience navigating
equities, commodities, and market cycles.
</p>
<p className="mt-3 italic text-slate-700 text-sm md:text-lg font-medium text-end w-full">
  I don’t trade charts alone—I study the business behind them.
</p>
<div className='absolute bottom-0 w-[50%] bg-gradient-to-r from-transparent via-zinc-600 to-transparent h-[1px]'></div>
        </div>
<div className="mt-20 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm px-8 py-10 shadow-md">
  <h2 className="text-3xl font-extrabold text-slate-900 text-center">
    Sky Investment
  </h2>

  <div className="mx-auto mt-3  h-[1px] w-25 bg-gradient-to-r from-transparent via-sky-600 to-transparent" />
  <p className="mt-6 text-slate-700 text-justify leading-relaxed">
    This website is my canvas - A place where investing meets clarity, logic,
    and real-world experience. No noise. No fake gurus. Just honest analysis,
    real processes, and a mindset built to evolve.
  </p>
  <p className="mt-6 text-slate-700 text-justify leading-relaxed">Welcome to the journey. Let’s learn, build, and compound knowledge-   one insight at a time.</p>
</div>
<p className="mt-10 text-xs text-slate-400 max-w-xl text-center">
  Educational content only. Not SEBI-registered. Please consult a qualified
  financial advisor before making investment decisions.
</p>
       </div>
      </section>
      <InfoSection />
<BlogShowCase/>
      <Footer />
    </div>
  );
} 


function InfoSection() {
  return (
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold  text-slate-900 mb-4 w-full">Why Sky Investment</h2>
            <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent mx-auto rounded-full" />
              {/* <h2 className="text-3xl text-slate-900">
      What I Write About
    </h2> */}
    <p className="mt-3  text-slate-600 w-full text-center ">
      Research-driven insights on markets, businesses, and the psychology
      behind capital and decision-making.
    </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-6 auto-rows-fr max-w-5xl mx-auto perspective-wrapper">
          <div className="md:col-span-4 rounded-2xl border border-slate-200 bg-slate-50 p-8 hover:shadow-lg
          hover:shadow-slate-100  hover:bg-gradient-to-br hover:from-slate-300 hover:to-white/80 grid-items">
  <h3 className="text-xl font-bold text-slate-900">
    India’s Growth Story
  </h3>
  <p className="mt-3 text-slate-700">
    Deep dives into the sectors, businesses, and capital flows shaping India’s
    long-term economic expansion and market leadership.
  </p>
</div>
<div className="md:col-span-2 rounded-2xl border border-slate-200 hover:bg-gradient-to-br hover:from-red-300/20 
to-white backdrop-blur-md p-6 grid-items">
  <h3 className="font-semibold text-slate-900">
    Equities & Sectoral Opportunities
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Growth companies, emerging sector leaders, and business models driving
    earnings and scale.
  </p>
</div>
<div className="md:col-span-2 rounded-2xl border border-slate-200 hover:bg-gradient-to-br hover:from-sky-300/20 
to-white backdrop-blur-md p-6 grid-items">
  <h3 className="font-semibold text-slate-900">
    Commodities & Macro Trends
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Commodity cycles, demand–supply dynamics, and macro forces influencing
    prices and market sentiment.
  </p>
</div>
<div className="md:col-span-2 rounded-2xl border border-slate-200 hover:bg-gradient-to-br hover:from-indigo-300/20 
to-white backdrop-blur-md p-6 grid-items">
  <h3 className="font-semibold text-slate-900">
    Market Psychology
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Investor behaviour, trading psychology, and emotional patterns that shape
    decision-making in markets.
  </p>
</div>
<div className="md:col-span-2 rounded-2xl border border-slate-200 hover:bg-gradient-to-br hover:from-purple-300/20 
to-white backdrop-blur-md p-6 grid-items">
  <h3 className="font-semibold text-slate-900">
    Money, Risk & Financial Literacy
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Frameworks for managing risk, understanding money, and building clarity
    around long-term investing decisions.
  </p>
</div>
<div className="md:col-span-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 hover:bg-gradient-to-br hover:from-violet-100
to-white backdrop-blur-md  grid-items">
  <h3 className="text-lg font-bold text-slate-900">
    Global Events & Geopolitical Context
  </h3>
  <p className="mt-3 text-slate-700">
    Occasionally exploring global events, geopolitics, and cross-border
    developments that influence capital flows and market narratives.
  </p>
</div>  
          </div>
        </div>
      </section>
  )
}


function BlogShowCase(){
  const blogs = [
  {
    id: 1,
    title: "India’s Growth Story and the Sectors Leading the Next Decade",
    excerpt:
      "A deep dive into the sectors driving India’s economic expansion and the companies positioned to benefit.",
    image: "/blogs/india-growth.jpg",
    category: "India Growth",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "Understanding Market Psychology During Volatile Phases",
    excerpt:
      "Why emotions dominate decision-making during market stress and how to think clearly.",
    image: "/blogs/market-psychology.jpg",
    category: "Psychology",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Commodities Explained: Cycles, Demand, and Price Behaviour",
    excerpt:
      "An overview of commodity cycles and how macro forces influence pricing.",
    image: "/blogs/commodities.jpg",
    category: "Commodities",
    readTime: "7 min read",
  },
];
  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Blog & Insights
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Research-driven writing on markets, businesses, and the psychology
            behind capital and decision-making.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1765634898818-93107993be03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={blog.title}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2 text-xs font-medium text-sky-500 uppercase">
                  {blog.category}
                </div>

                <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                  {blog.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <span>{blog.readTime}</span>
                  <span className="font-medium text-slate-700 group-hover:text-sky-500 transition">
                    Read analysis →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100 transition">
            View all blogs
          </button>
        </div>
      </div>
    </section>
  );
}
