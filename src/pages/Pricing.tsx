import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCheck, FaCrown, FaRocket, FaUser, FaShieldAlt, 
  FaServer, FaLock, FaMobileAlt, FaHeadset
} from 'react-icons/fa';
// Import Navbar and Footer
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(1); // Default to Pro plan
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const plans = [
    {
      title: "Basic",
      price: billingPeriod === 'monthly' ? "₹10" : "₹96",
      icon: <FaUser className="text-4xl" />,
      description: "Perfect for individuals getting started",
      features: [
        "Up to 50 passes storage",
        "Basic encryption",
        "Email support",
        "Mobile access",
        "1 device sync"
      ],
      color: "from-blue-500 to-cyan-500",
      bgPattern: "radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 90%)"
    },
    {
      title: "Pro",
      price: billingPeriod === 'monthly' ? "₹30" : "₹288",
      icon: <FaRocket className="text-4xl" />,
      description: "Ideal for professionals and small teams",
      features: [
        "Unlimited passes storage",
        "Advanced encryption",
        "Priority support",
        "Multi-device sync",
        "Custom categories"
      ],
      isPopular: true,
      color: "from-violet-500 to-purple-500",
      bgPattern: "radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 90%)"
    },
    {
      title: "Enterprise",
      price: billingPeriod === 'monthly' ? "₹100" : "₹960",
      icon: <FaCrown className="text-4xl" />,
      description: "Full suite for large organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "24/7 phone support",
        "Custom integration",
        "Advanced analytics"
      ],
      color: "from-amber-500 to-orange-500",
      bgPattern: "radial-gradient(circle at 10% 20%, rgba(245, 158, 11, 0.1) 0%, rgba(249, 115, 22, 0.1) 90%)"
    }
  ];

  const comparisonFeatures = [
    { 
      feature: "Password Storage", 
      basic: "50", 
      pro: "Unlimited", 
      enterprise: "Unlimited",
      icon: <FaLock />
    },
    { 
      feature: "Secure Notes", 
      basic: "Limited", 
      pro: "Unlimited", 
      enterprise: "Unlimited",
      icon: <FaShieldAlt />
    },
    { 
      feature: "Two-Factor Authentication", 
      basic: "✓", 
      pro: "✓", 
      enterprise: "✓",
      icon: <FaLock />
    },
    { 
      feature: "Password Generator", 
      basic: "Basic", 
      pro: "Advanced", 
      enterprise: "Advanced",
      icon: <FaServer />
    },
    { 
      feature: "Password Health Check", 
      basic: "×", 
      pro: "✓", 
      enterprise: "✓",
      icon: <FaShieldAlt />
    },
    { 
      feature: "Dark Web Monitoring", 
      basic: "×", 
      pro: "Limited", 
      enterprise: "Full",
      icon: <FaServer />
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const featureRowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      backgroundColor: "rgba(124, 58, 237, 0.05)",
      transition: { duration: 0.2 }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-t-3 border-violet-600 animate-spin"></div>
            <div className="absolute inset-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 blur-sm opacity-70 animate-pulse"></div>
            <div className="absolute inset-5 rounded-full bg-white flex items-center justify-center">
              <FaCrown className="h-7 w-7 text-violet-600" />
            </div>
          </div>
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-lg">Loading pricing options...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Add Navbar at the top */}
      <Navbar />
      
      {/* Add spacing for fixed navbar */}
      <div className="h-20"></div>
    
      <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden">
        {/* Modern background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(124,58,237,0.08),transparent)]" />
        
        {/* Decorative elements */}
        <div className="absolute top-40 right-0 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl -z-10" />
        
        <section className="relative py-20 px-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-7xl mx-auto"
          >
            {/* Enhanced header section */}
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 bg-violet-100 text-violet-800 rounded-full text-sm font-medium inline-block mb-4">
                PRICING PLANS
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                Choose Your Plan
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select the perfect plan for your needs with our flexible pricing options
              </p>
            </div>

            {/* Enhanced Billing Period Toggle */}
            <motion.div 
              className="flex items-center justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span 
                className={`mr-4 font-medium ${billingPeriod === 'monthly' ? 'text-violet-600' : 'text-gray-400'}`}
                animate={{ scale: billingPeriod === 'monthly' ? 1.05 : 1 }}
              >
                Monthly
              </motion.span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-16 h-8 bg-violet-200 rounded-full px-1 flex items-center cursor-pointer hover:bg-violet-300 transition-colors"
              >
                <motion.div
                  className="w-6 h-6 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg"
                  animate={{ x: billingPeriod === 'yearly' ? 32 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
              <div className="ml-4">
                <motion.span 
                  className={`font-medium ${billingPeriod === 'yearly' ? 'text-violet-600' : 'text-gray-400'}`}
                  animate={{ scale: billingPeriod === 'yearly' ? 1.05 : 1 }}
                >
                  Yearly
                </motion.span>
                <span className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs py-0.5 px-2 rounded-md font-medium">
                  20% off
                </span>
              </div>
            </motion.div>

            {/* Enhanced Pricing Cards with Modern Design */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
            >
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  className={`relative backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-500
                    ${selectedPlan === index 
                      ? 'bg-white shadow-xl shadow-violet-500/20 border-2 border-violet-500' 
                      : 'bg-white/80 shadow-lg border border-slate-100/80'} 
                    ${plan.isPopular ? 'md:scale-105 md:-translate-y-2' : ''}`}
                  onClick={() => setSelectedPlan(index)}
                  style={{ backgroundImage: plan.bgPattern }}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-5 inset-x-0 flex justify-center">
                      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-lg shadow-violet-500/30 flex items-center space-x-1">
                        <FaCrown className="text-amber-300 mr-1.5" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    <div className={`bg-gradient-to-br ${plan.color} text-white p-4 rounded-2xl inline-block mb-4 shadow-lg`}>
                      {plan.icon}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800">{plan.title}</h2>
                    <div className="mt-4 mb-6">
                      <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                        {plan.price}
                      </span>
                      <span className="text-gray-500 ml-1">{billingPeriod === 'monthly' ? '/mo' : '/yr'}</span>
                    </div>
                    <p className="text-gray-600 mb-8 min-h-[50px]">{plan.description}</p>

                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="bg-violet-100 p-1 rounded-full mr-3 mt-0.5">
                            <FaCheck className="text-violet-600 text-xs" />
                          </div>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3.5 px-6 rounded-xl font-medium shadow-lg transition-all duration-300 
                      ${selectedPlan === index
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-violet-500/30'
                        : 'bg-white text-gray-700 border border-slate-200 hover:border-violet-300'}`}
                    >
                      {selectedPlan === index ? 'Current Selection' : 'Select Plan'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Feature Comparison Table with Increased Font Size */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-28 relative"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                  Feature Comparison
                </h2>
                <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
                  Detailed breakdown of features available in each plan
                </p>
              </div>

              <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-transparent">
                <table className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-100/80">
                  <thead>
                    <tr className="bg-gradient-to-r from-violet-100/50 to-indigo-100/50">
                      <th className="px-6 py-5 text-left text-slate-700 text-lg">Feature</th>
                      <th className="px-6 py-5 text-center text-slate-700 text-lg">Basic</th>
                      <th className="px-6 py-5 text-center text-slate-700 text-lg">Pro</th>
                      <th className="px-6 py-5 text-center text-slate-700 text-lg">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {comparisonFeatures.map((item, index) => (
                      <motion.tr
                        key={index}
                        custom={index}
                        variants={featureRowVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                        className="border-t border-slate-100 transition-colors"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <div className="mr-3 text-violet-500 text-lg">
                              {item.icon}
                            </div>
                            <span className="text-base font-medium">{item.feature}</span>
                          </div>
                        </td>
                        
                        <td className={`px-6 py-5 text-center ${item.basic === '×' ? 'text-slate-400' : 'text-slate-700'} text-base`}>
                          {item.basic}
                        </td>
                        
                        <td className="px-6 py-5 text-center">
                          {item.pro === '✓' ? (
                            <div className="flex justify-center">
                              <div className="bg-green-100 text-green-600 p-1.5 rounded-full">
                                <FaCheck className="text-sm" />
                              </div>
                            </div>
                          ) : item.pro === '×' ? (
                            <span className="text-slate-400 text-base">×</span>
                          ) : (
                            <span className="font-medium text-indigo-600 text-base">{item.pro}</span>
                          )}
                        </td>
                        
                        <td className="px-6 py-5 text-center">
                          {item.enterprise === '✓' ? (
                            <div className="flex justify-center">
                              <div className="bg-green-100 text-green-600 p-1.5 rounded-full">
                                <FaCheck className="text-sm" />
                              </div>
                            </div>
                          ) : item.enterprise === '×' ? (
                            <span className="text-slate-400 text-base">×</span>
                          ) : (
                            <span className="font-medium text-indigo-600 text-base">{item.enterprise}</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Call to Action - adjust margin-top since we removed the FAQ section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-24 text-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-12 shadow-xl shadow-violet-500/20 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3" />
              
              <div className="relative z-10">
                <FaHeadset className="text-4xl text-white/80 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Ready to get started?
                </h2>
                <p className="text-white/80 mb-8 max-w-md mx-auto">
                  Choose the perfect plan for your needs and start securing your digital life today
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-violet-700 font-medium rounded-xl hover:bg-violet-50 transition-colors shadow-lg"
                >
                  Try PassVault Free for 14 Days
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
      
      {/* Add Footer at the bottom */}
      <Footer />
    </>
  );
};

export default Pricing;