import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopNavBar from '../components/Headers/TopNavBar';
import Footer from '../components/Footer/Footer';
import { Button } from '../components/UI/Button';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setSubmitted(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <div 
        className="relative min-h-screen w-full bg-gray-50"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(247,250,252,0.8), rgba(247,250,252,1))'
        }}
      >
        {/* Hero Section with Background */}
        <div className="relative w-full h-[50vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/img/main-hero.webp)',
              backgroundPosition: 'center 25%',
              backgroundSize: 'cover'
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Navigation */}
          <TopNavBar />

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-['Patrick_Hand'] text-white drop-shadow-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Kontakt
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Masz pytanie? Skontaktuj się z nami!
            </motion.p>
          </div>

          {/* Curved transition */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-36 z-10 pointer-events-none"
               style={{
                 background: 'linear-gradient(to top, rgba(247,250,252,1), rgba(247,250,252,0.7), rgba(247,250,252,0))'
               }}
            ></div>
            <div 
              className="w-[150%] h-16 bg-[#F7FAFC] absolute -left-[25%]"
              style={{
                borderTopLeftRadius: '100%',
                borderTopRightRadius: '100%',
                boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.08)',
                backgroundImage: 'linear-gradient(to bottom, rgba(247,250,252,0.8), rgba(247,250,252,1))'
              }}
            ></div>
          </div>
        </div>

        {/* Contact Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Left Column - Image and Info */}
            <motion.div 
              className="w-full md:w-2/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-green-600/10 to-amber-500/10 rounded-2xl p-6 shadow-lg">
                {/* Image placeholder */}
                <div className="w-full h-72 md:h-80 lg:h-96 bg-gradient-to-br from-green-600/20 to-amber-500/20 rounded-xl mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 text-center p-4">
                      <svg className="w-20 h-20 mx-auto mb-2 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                      <p className="text-xl font-['Patrick_Hand']">Twoje zdjęcie</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-['Patrick_Hand'] text-gray-800 mb-2">Autyzm od Kuchni</h3>
                  
                  <div className="flex items-start space-x-3 text-gray-700">
                    <svg className="w-5 h-5 mt-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-lg">kontakt@autyzmkuchni.pl</span>
                  </div>
                  
                  <div className="flex items-start space-x-3 text-gray-700">
                    <svg className="w-5 h-5 mt-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span className="text-lg">+48 123 456 789</span>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex items-center gap-4 mt-6">
                    {[
                      { name: 'Facebook', icon: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' },
                      { name: 'Instagram', icon: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' },
                      { name: 'TikTok', icon: 'M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 11-5-5v2a3 3 0 103 3V0z' }
                    ].map((social, index) => (
                      <a 
                        key={index}
                        href="#" 
                        className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white hover:from-green-500 hover:to-green-600 transition-all duration-300 hover:scale-110 shadow-md"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d={social.icon}></path>
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div 
              className="w-full md:w-3/5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                <h2 className="text-3xl font-['Patrick_Hand'] text-gray-800 mb-6">Napisz do nas</h2>
                
                {submitted ? (
                  <motion.div 
                    className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-2xl font-['Patrick_Hand'] text-gray-800 mb-2">Dziękujemy!</h3>
                    <p className="text-gray-600">Twoja wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 mb-1 font-medium">Imię i nazwisko</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                          placeholder="Twoje imię"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                          placeholder="Twój email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 mb-1 font-medium">Temat</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                        placeholder="Temat wiadomości"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-700 mb-1 font-medium">Wiadomość</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none resize-none"
                        placeholder="Twoja wiadomość..."
                      ></textarea>
                    </div>
                    
                    <div className="pt-2">
                      <Button
                        type="submit"
                        text={submitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                        variant="primary"
                        size="lg"
                        disabled={submitting}
                        customStyles={{
                          opacity: submitting ? 0.7 : 1,
                          cursor: submitting ? 'wait' : 'pointer'
                        }}
                        fullWidth
                      />
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage; 