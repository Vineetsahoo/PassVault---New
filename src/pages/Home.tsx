import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, Smartphone, QrCode, Clock, RefreshCw, Users, ArrowRight, Check, Star, ChevronRight, Lock, Zap } from 'lucide-react';
// Add imports for Navbar and Footer
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Storage',
      description: 'Your passes are encrypted and stored securely in our vault.',
      link: '/features/secure-storage'
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Multi-Device Access',
      description: 'Access your passes from any device, anywhere.',
      link: '/features/multi-device'
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: 'QR Code Scanning',
      description: 'Quickly scan and store passes using your device camera.',
      link: '/features/qr-scan'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Expiration Alerts',
      description: 'Never miss an expiration date with smart notifications.',
      link: '/features/alerts'
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: 'Auto-Sync',
      description: 'Changes sync automatically across all your devices.',
      link: '/features/sync'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Pass Sharing',
      description: 'Share passes securely with family and friends.',
      link: '/features/sharing'
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-t-3 border-violet-600 animate-spin"></div>
            <div className="absolute inset-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 blur-sm opacity-70 animate-pulse"></div>
            <div className="absolute inset-5 rounded-full bg-white flex items-center justify-center">
              <Shield className="h-7 w-7 text-indigo-600" />
            </div>
          </div>
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-lg">Preparing your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafbff] overflow-hidden">
      {/* Add Navbar */}
      <Navbar />
      
      {/* Enhanced Hero Section with Better Visual Flow */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-violet-700 via-indigo-600 to-blue-700 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[120px] -top-40 -right-20"></div>
          <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px] top-60 -left-20"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/30"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 1 + 0.5,
                  opacity: Math.random() * 0.5 + 0.3
                }}
                animate={{
                  y: [null, Math.random() * -100],
                  opacity: [null, 0]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: Math.random() * 10 + 10,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              }
            }
          }}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 md:pt-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left">
              
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  Simplify Your Digital Life with 
                  <span className="relative inline-block ml-2">
                    PassVault
                    <span className="absolute -bottom-1.5 left-0 w-full h-1.5 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></span>
                  </span>
                </span>
              </motion.h1>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="text-xl text-purple-100/90 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                The smart way to manage all your digital passes in one secure place. Effortless organization meets military-grade security.
              </motion.p>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8"
              >
                <Link
                  to="/download"
                  className="group bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center"
                >
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  <span>Download Now</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-flex items-center"
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Link>
                <Link
                  to="/how-it-works"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <span>Learn More</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.6, duration: 0.8 } }
                }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['https://i.pravatar.cc/100?img=1', 'https://i.pravatar.cc/100?img=2', 'https://i.pravatar.cc/100?img=3', 'https://i.pravatar.cc/100?img=4'].map((avatar, i) => (
                      <img 
                        key={i}
                        src={avatar}
                        alt="User avatar"
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="font-medium text-emerald-300 whitespace-nowrap">10K+ happy users</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" className="h-4 w-4 text-yellow-300" />
                    ))}
                  </div>
                  <span className="font-medium text-yellow-300">4.9/5 rating</span>
                </div>
              </motion.div>
            </div>
            
            {/* Modern App Preview with mockup */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    delay: 0.4,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }
                }
              }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 perspective">
                {/* Primary screenshot with 3D effect */}
                <motion.div 
                  className="relative rounded-2xl shadow-2xl shadow-indigo-500/40 border-8 border-white/20 backdrop-blur-lg transform lg:rotate-y-6"
                  animate={{ 
                    rotateY: [6, 2, 6], 
                    rotateX: [0, 1, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 8,
                    ease: "easeInOut"
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
                    alt="PassVault App" 
                    className="w-full rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-800/10 to-transparent rounded-lg"></div>
                  
                  {/* Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 rounded-lg"></div>
                </motion.div>
                
                {/* Secondary floating UI elements */}
                <motion.div
                  initial={{ x: 30, y: -50 }}
                  animate={{ x: 50, y: -70 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 5
                  }}
                  className="absolute right-0 top-1/3 hidden md:block"
                >
                  <img
                    src="https://placehold.co/280x180/4338ca/ffffff?text=Pass+Details"
                    alt="Pass Details"
                    className="rounded-xl shadow-xl border-4 border-white/80"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: -20, y: 50 }}
                  animate={{ x: -40, y: 70 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 5,
                    delay: 0.5
                  }}
                  className="absolute left-0 bottom-1/4 hidden md:block"
                >
                  <img
                    src="https://placehold.co/230x140/5b21b6/ffffff?text=Mobile+View"
                    alt="Mobile View"
                    className="rounded-xl shadow-lg border-4 border-white/80"
                  />
                </motion.div>
                
                {/* Floating UI elements */}
                <motion.div
                  animate={{ y: [-8, 0, -8] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -top-10 left-12 bg-white rounded-xl shadow-xl p-3 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Lock className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">End-to-end encryption</p>
                      <div className="flex">
                        <div className="h-1.5 w-8 rounded-full bg-green-500"></div>
                        <div className="h-1.5 w-4 rounded-full bg-green-200 ml-0.5"></div>
                        <div className="h-1.5 w-2 rounded-full bg-green-200 ml-0.5"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -bottom-10 right-10 bg-white rounded-xl shadow-xl p-3 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-violet-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">Pass synced successfully</p>
                      <p className="text-xs text-gray-500">All devices updated</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Modern wave separator */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#fafbff"
              fillOpacity="1"
              d="M0,128L60,138.7C120,149,240,171,360,181.3C480,192,600,192,720,181.3C840,171,960,149,1080,133.3C1200,117,1320,107,1380,101.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section with Modern Card Design */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafbff] via-violet-50/30 to-[#fafbff]"></div>
        <div className="absolute inset-y-0 left-1/4 w-px bg-gradient-to-b from-transparent via-violet-200/50 to-transparent"></div>
        <div className="absolute inset-y-0 right-1/4 w-px bg-gradient-to-b from-transparent via-indigo-200/50 to-transparent"></div>
        
        {/* Add creative floating shapes */}
        <div className="absolute left-10 top-40 w-32 h-32 rounded-full border border-violet-200/50 animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute right-10 bottom-40 w-40 h-40 rounded-3xl border border-indigo-200/30 animate-[spin_30s_linear_infinite]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-4">
              POWERFUL FEATURES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 px-6">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why thousands of users trust PassVault for their digital pass management
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl overflow-hidden h-[340px] perspective"
              >
                {/* Card background with gradient and pattern */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-slate-100">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] via-transparent to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-full flex flex-col p-8">
                  {/* Icon with 3D effect */}
                  <div className="mb-6 relative">
                    <div className="absolute -inset-1.5 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-xl blur-sm"></div>
                    <div className="relative bg-gradient-to-br from-violet-500 to-indigo-600 text-white p-4 rounded-xl shadow-lg">
                      {React.cloneElement(feature.icon, { className: "h-8 w-8" })}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-violet-700 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 group-hover:text-gray-900 transition-colors flex-grow">
                    {feature.description}
                  </p>
                  
                  <Link 
                    to={feature.link} 
                    className="inline-flex items-center text-indigo-600 font-medium group/link transition-all"
                  >
                    <span className="border-b border-transparent group-hover/link:border-indigo-600 transition-all">
                      Learn more
                    </span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="inline-flex items-center"
                    >
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </motion.div>
                  </Link>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-100/50 via-indigo-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Card number */}
                  <div className="absolute bottom-6 right-6 font-bold text-5xl text-slate-100/30 group-hover:text-indigo-100/40 transition-colors">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Modern Card Design */}
      <section className="py-24 relative overflow-hidden bg-white">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-violet-50/50 to-transparent"></div>
        <div className="absolute -left-20 top-40 w-72 h-72 bg-violet-100 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute -right-20 bottom-40 w-80 h-80 bg-indigo-100 rounded-full blur-[100px] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-4">
              TESTIMONIALS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Loved by Users <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">Worldwide</span>
            </h2>
            <div className="flex justify-center gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" className="h-6 w-6 text-yellow-400" />
              ))}
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed how they manage digital passes
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Business Owner',
                image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98',
                quote:
                  'PassVault has transformed how I manage digital passes for my business. It\'s intuitive and secure.',
              },
              {
                name: 'Rahul Verma',
                role: 'Tech Enthusiast',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                quote:
                  'The auto-sync feature is a game-changer. I can access my passes on any device seamlessly.',
              },
              {
                name: 'Ananya Patel',
                role: 'Student',
                image: 'https://images.unsplash.com/photo-1611558709798-e009c8fd7706',
                quote:
                  'As a student, keeping track of various passes was a hassle. PassVault made it simple and organized.',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Top color accent */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-500 to-indigo-600"></div>
                
                <div className="p-8">
                  {/* Image and details in a row */}
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-br from-violet-500/40 to-indigo-500/40 rounded-full blur-sm group-hover:from-violet-500/60 group-hover:to-indigo-500/60 transition-all duration-300"></div>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="relative h-16 w-16 rounded-full object-cover border-2 border-white"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-lg text-gray-900">{testimonial.name}</h4>
                      <p className="text-violet-600 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {/* Quote with large quotation mark */}
                  <div className="relative">
                    <div className="absolute -top-2 -left-3 text-indigo-100">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 20H10C8.16 20 6.66667 21.4933 6.66667 23.3333V26.6667C6.66667 28.5067 8.16 30 10 30H13.3333C15.1733 30 16.6667 28.5067 16.6667 26.6667V20L13.3333 10H10L16 20ZM30 20H24C22.16 20 20.6667 21.4933 20.6667 23.3333V26.6667C20.6667 28.5067 22.16 30 24 30H27.3333C29.1733 30 30.6667 28.5067 30.6667 26.6667V20L27.3333 10H24L30 20Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <p className="text-gray-700 relative z-10 mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill="currentColor" className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Bottom right decoration */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-violet-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
          
          {/* View more testimonials button */}
          <div className="flex justify-center mt-12">
            <Link
              to="/testimonials"
              className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all border border-slate-100 text-slate-700 hover:text-violet-700"
            >
              <span>View all testimonials</span>
              <div className="bg-violet-100 rounded-full p-1 group-hover:bg-violet-200 transition-colors">
                <ChevronRight className="h-4 w-4 text-violet-700" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Modern CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Dynamic background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {/* Animated shapes */}
          <motion.div 
            className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-purple-500/20 blur-[100px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-500/20 blur-[100px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/40"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * 500,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0.7, 0]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: Math.random() * 10 + 10,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready to <span className="relative inline-block">
                    Simplify
                    <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></span>
                  </span> Your Digital Life?
                </h2>
                
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Join <span className="font-semibold text-yellow-300">thousands of satisfied users</span> and start managing your passes smarter today with our secure, cloud-based solution.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-5 mb-10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/download"
                      className="group bg-gradient-to-br from-white to-gray-100 text-violet-800 px-8 py-4 rounded-xl font-semibold shadow-lg shadow-violet-900/30 hover:shadow-xl hover:shadow-violet-900/40 transition-all flex items-center justify-center"
                    >
                      <Zap className="h-5 w-5 mr-2 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                      <span>Get Started Free</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="inline-flex items-center"
                      >
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:text-violet-900 transition-colors" />
                      </motion.div>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/pricing"
                      className="bg-violet-800/50 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-violet-800/70 transition-all flex items-center justify-center"
                    >
                      <span>View Pricing</span>
                      <div className="ml-2 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    </Link>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="flex flex-wrap justify-center gap-x-6 gap-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {[
                    { icon: <Check className="h-5 w-5" />, text: "No credit card required" },
                    { icon: <Star className="h-5 w-5" />, text: "Free plan available" },
                    { icon: <Lock className="h-5 w-5" />, text: "End-to-end encryption" },
                    { icon: <RefreshCw className="h-5 w-5" />, text: "Cancel anytime" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ y: -3 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm"
                    >
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Add Footer */}
      <Footer />
    </div>
  );
};

export default Home;