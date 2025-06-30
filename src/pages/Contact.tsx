import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaComments } from 'react-icons/fa';
// Import Navbar and Footer
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    subject: '',
    message: '' 
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!emailRegex.test(formData.email)) errors.email = 'Valid email is required';
    if (formData.phone && !phoneRegex.test(formData.phone)) errors.phone = 'Valid phone number is required';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitted(true);
    // Add your form submission logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-t-3 border-violet-600 animate-spin"></div>
            <div className="absolute inset-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 blur-sm opacity-70 animate-pulse"></div>
            <div className="absolute inset-5 rounded-full bg-white flex items-center justify-center">
              <FaEnvelope className="h-7 w-7 text-violet-600" />
            </div>
          </div>
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-lg">Connecting you with us...</p>
        </div>
      </div>
    );
  }

  const contactInfo = [
    { 
      icon: <FaEnvelope />, 
      title: 'Email', 
      info: 'contact@bolt.com', 
      detail: 'Available 24/7 for your queries', 
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50"
    },
    { 
      icon: <FaPhone />, 
      title: 'Phone', 
      info: '+91 (891) 234-5678', 
      detail: 'Mon-Fri: 9:00 AM - 6:00 PM IST', 
      color: "from-violet-500 to-indigo-500",
      bgColor: "bg-violet-50"
    },
    { 
      icon: <FaMapMarkerAlt />, 
      title: 'Location', 
      info: 'Chennai, Tamil Nadu', 
      detail: 'SRM University, Kattankulathur', 
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50"
    },
  ];

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
        
        <section className="relative py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Enhanced header section */}
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 bg-violet-100 text-violet-800 rounded-full text-sm font-medium inline-block mb-4">
                CONTACT US
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            {/* Enhanced Contact Section with Modern Card Design */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Contact Information Cards with New Design */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 lg:col-span-1"
              >
                {/* Modern stacked contact info cards */}
                <motion.div
                  className="backdrop-blur-sm bg-white/90 rounded-2xl overflow-hidden shadow-lg border border-slate-100/80"
                >
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className={`${index !== 0 ? 'border-t border-slate-100' : ''}`}
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <div className={`${item.bgColor} p-2 rounded-lg`}>
                            <div className={`bg-gradient-to-br ${item.color} text-white p-2 rounded-lg shadow-md`}>
                              {item.icon}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-slate-800 ml-3">{item.title}</h3>
                        </div>
                        
                        <div className="pl-12">
                          <p className="text-lg text-violet-600 font-semibold mb-1">{item.info}</p>
                          <p className="text-slate-500 text-sm">{item.detail}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Map with enhanced styling */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="backdrop-blur-sm bg-white/90 rounded-2xl overflow-hidden shadow-lg border border-slate-100/80 relative"
                >
                  <div className="p-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      <h3 className="font-medium">Our Campus Location</h3>
                    </div>
                  </div>
                  <div className="h-64">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.040704806372!2d80.0421958!3d12.8230831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f712b57a2b37%3A0xaa225c163e3aa750!2sSRM%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1679900000000!5m2!1sen!2sin"
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Contact Form with Modern Design */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="backdrop-blur-sm bg-white/90 p-8 rounded-2xl shadow-lg border border-slate-100/80 lg:col-span-2 relative overflow-hidden"
              >
                {/* Decorative elements for the form background */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-100/30 to-indigo-100/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white p-3 rounded-xl shadow-lg mr-4">
                      <FaComments />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Send us a Message</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name input with increased font size */}
                      <div>
                        <label htmlFor="name" className="text-base font-medium text-slate-700 mb-1.5 block">
                          Name <span className="text-violet-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`w-full px-4 py-3.5 rounded-xl border text-base ${
                            formErrors.name ? 'border-red-500' : 'border-slate-200'
                          } focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 bg-white/50 transition-colors placeholder:text-slate-400 placeholder:text-base`}
                        />
                        {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                      </div>

                      {/* Email input with increased font size */}
                      <div>
                        <label htmlFor="email" className="text-base font-medium text-slate-700 mb-1.5 block">
                          Email <span className="text-violet-600">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className={`w-full px-4 py-3.5 rounded-xl border text-base ${
                            formErrors.email ? 'border-red-500' : 'border-slate-200'
                          } focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 bg-white/50 transition-colors`}
                        />
                        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Phone input */}
                      <div>
                        <label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-1 block">
                          Phone <span className="text-slate-400">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 (XXX) XXX-XXXX"
                          className={`w-full px-4 py-3 rounded-xl border ${
                            formErrors.phone ? 'border-red-500' : 'border-slate-200'
                          } focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 bg-white/50 transition-colors`}
                        />
                        {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                      </div>

                      {/* Subject input */}
                      <div>
                        <label htmlFor="subject" className="text-sm font-medium text-slate-700 mb-1 block">
                          Subject <span className="text-violet-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          className={`w-full px-4 py-3 rounded-xl border ${
                            formErrors.subject ? 'border-red-500' : 'border-slate-200'
                          } focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 bg-white/50 transition-colors`}
                        />
                        {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
                      </div>
                    </div>

                    {/* Message input */}
                    <div>
                      <label htmlFor="message" className="text-sm font-medium text-slate-700 mb-1 block">
                        Message <span className="text-violet-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Please describe your question or inquiry in detail..."
                        className={`w-full px-4 py-3 rounded-xl border ${
                          formErrors.message ? 'border-red-500' : 'border-slate-200'
                        } focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 bg-white/50 transition-colors resize-none`}
                      ></textarea>
                      {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                    </div>

                    {/* Submit button or success message with enhanced animations */}
                    <AnimatePresence>
                      {formSubmitted ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="mt-6 p-4 bg-gradient-to-r from-green-600/10 to-emerald-600/10 text-green-600 rounded-xl flex items-center"
                        >
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-full text-white mr-3">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1], rotate: [0, 0, 360] }}
                              transition={{ duration: 0.6, times: [0, 0.5, 1] }}
                            >
                              <FaCheck />
                            </motion.div>
                          </div>
                          <div>
                            <p className="font-semibold">Message sent successfully!</p>
                            <p className="text-sm text-green-600/80">Thank you for reaching out. We'll get back to you shortly.</p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2 shadow-lg shadow-violet-500/20 mt-6 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                          <FaPaperPlane className="relative z-10" />
                          <span className="relative z-10">Send Message</span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
        
        {/* FAQ Section */}
        <section className="relative py-16 px-4 bg-gradient-to-b from-transparent to-slate-50/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-14">
              <span className="px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium inline-block mb-4">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                Questions You May Have
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find quick answers to common questions about our services, support, and more.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How quickly do you respond to inquiries?",
                  answer: "We aim to respond to all inquiries within 24 hours on business days. For urgent matters, we recommend including 'Urgent' in your subject line."
                },
                {
                  question: "Do you offer technical support for your products?",
                  answer: "Yes, we provide comprehensive technical support for all our products. Our dedicated support team is available via email, phone, and live chat during business hours."
                },
                {
                  question: "Can I schedule a demo or consultation?",
                  answer: "Absolutely! You can request a demo or consultation through our contact form. Simply specify your requirements in the message field, and our team will get back to you to schedule a convenient time."
                },
                {
                  question: "What are your business hours?",
                  answer: "Our offices are open Monday through Friday, 9:00 AM to 6:00 PM IST. Online support is available 24/7 for urgent matters through our support portal."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 20px rgba(124, 58, 237, 0.1)"
                  }}
                  className="backdrop-blur-sm bg-white/90 p-8 rounded-2xl shadow-md border border-slate-100/80 relative overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute -right-8 -top-8 w-16 h-16 bg-violet-100/50 rounded-full"></div>
                  <div className="absolute -left-4 -bottom-4 w-8 h-8 bg-indigo-100/50 rounded-full"></div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Visual divider - reduced height */}
        <div className="relative h-16 overflow-hidden">
          <div className="absolute inset-x-0 w-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-slate-50/80 fill-current">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
          </div>
        </div>
        
        {/* CTA Section - with reduced top padding */}
        <section className="relative py-10 px-4 bg-gradient-to-b from-slate-50/80 to-white">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* CTA Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-10 shadow-xl overflow-hidden relative"
            >
              {/* Animated floating circles */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  animate={{ 
                    y: [0, -15, 0],
                    x: [0, 10, 0] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 8,
                    ease: "easeInOut" 
                  }}
                  className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
                />
                <motion.div 
                  animate={{ 
                    y: [0, 20, 0],
                    x: [0, -15, 0] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 10,
                    ease: "easeInOut" 
                  }}
                  className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-lg"
                />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to get started?</h3>
                  <p className="text-white/90 max-w-lg">
                    Our team is ready to answer your questions and help you find the perfect solution for your needs.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white rounded-xl font-medium text-violet-600 shadow-lg flex items-center gap-2 hover:bg-violet-50 transition-colors group"
                >
                  <span>Schedule a Consultation</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 16 16"
                  >
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg>
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

export default Contact;