import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  Scissors, 
  ChevronRight,
  ExternalLink,
  Award,
  History
} from 'lucide-react';

const SERVICES = [
  { 
    name: "The Blueprint (Standard Cut)", 
    price: "£18", 
    description: "Classic scissors and clipper work, tailored to your style. Finished with premium styling products." 
  },
  { 
    name: "The Skin Fade", 
    price: "£22", 
    description: "Seamless, razor-sharp skin fade with precision foil work." 
  },
  { 
    name: "The Executive (Cut & Beard)", 
    price: "£30", 
    description: "The full package. A precision haircut paired with a hot towel beard sculpt and line-up." 
  },
  { 
    name: "Beard Sculpt & Line-Up", 
    price: "£15", 
    description: "Complete reshaping, razor line-up, and hot towel finish with premium beard oils." 
  },
  { 
    name: "Kids Cut (Under 12)", 
    price: "£14", 
    description: "Keep the young ones looking sharp." 
  },
];

const REVIEWS = [
  {
    name: "Local Guide",
    text: "Best fade in Manchester, hands down. The attention to detail is unmatched and the lads always make you feel welcome.",
    rating: 5
  },
  {
    name: "Verified Client",
    text: "Finally found my regular spot in Prestwich. Top-tier service, great atmosphere, and a perfect cut every time.",
    rating: 5
  },
  {
    name: "Verified Client",
    text: "5 stars isn't enough. They take their time and get it right. Highly recommend booking ahead!",
    rating: 5
  }
];

const LOOKBOOK_IMAGES = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1621605815841-28d944683b83?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1599351431247-f57949f42edc?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1622286332618-f2803b1950d4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1593702295094-2825854b0bf8?auto=format&fit=crop&q=80&w=800",
];

type Theme = 'modern' | 'vintage';

export default function App() {
  const [theme, setTheme] = useState<Theme>('modern');

  return (
    <>
      <div className="fixed top-6 right-6 z-[100]">
        <button 
          onClick={() => setTheme(theme === 'modern' ? 'vintage' : 'modern')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg border-2 ${
            theme === 'modern' 
              ? 'bg-gold text-black border-gold hover:bg-gold-hover' 
              : 'bg-copper text-white border-gold hover:bg-gold/80'
          }`}
        >
          {theme === 'modern' ? 'Option 2 (Vintage)' : 'Option 1 (Modern)'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {theme === 'modern' ? (
          <ModernTheme key="modern" />
        ) : (
          <VintageTheme key="vintage" />
        )}
      </AnimatePresence>
    </>
  );
}

function ModernTheme() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen font-sans selection:bg-gold selection:text-black bg-matte-black text-white"
    >
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-matte-black/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-2xl font-display font-extrabold tracking-tighter cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            GLARIS <span className="text-gold">BARBER</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-gold transition-colors">Services</button>
            <button onClick={() => scrollToSection('lookbook')} className="text-sm font-medium hover:text-gold transition-colors">Lookbook</button>
            <button onClick={() => scrollToSection('location')} className="text-sm font-medium hover:text-gold transition-colors">Find Us</button>
            <button className="bg-gold hover:bg-gold-hover text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95">
              BOOK NOW
            </button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-matte-black flex flex-col items-center justify-center space-y-8 text-2xl font-display"
          >
            <button onClick={() => scrollToSection('services')}>Services</button>
            <button onClick={() => scrollToSection('lookbook')}>Lookbook</button>
            <button onClick={() => scrollToSection('location')}>Find Us</button>
            <button className="bg-gold text-black px-10 py-4 rounded-full font-bold">BOOK NOW</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1920" 
            alt="Barber Shop Interior" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-matte-black/60 via-transparent to-matte-black" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-none tracking-tight">
              PRESTWICH’S PREMIER <br />
              <span className="text-gold">5-STAR</span> BARBERSHOP
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 font-light max-w-2xl mx-auto">
              Precision cuts, flawless fades, and traditional service. Open 7 days a week on Whittaker Lane.
            </p>
            <div className="flex flex-col items-center space-y-6">
              <button className="bg-gold hover:bg-gold-hover text-black px-12 py-5 rounded-full text-lg font-black transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                BOOK YOUR CUT
              </button>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">⭐ 5.0 Rating on Google</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">Don't Just Take Our Word For It.</h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-matte-black p-8 rounded-2xl border border-white/5 hover:border-gold/30 transition-all group"
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-white/70 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="font-bold text-gold uppercase tracking-wider text-sm">— {review.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-matte-black relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
          <Scissors size={400} className="rotate-45" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">PREMIUM CUTS, NO COMPROMISE.</h2>
            <p className="text-white/50 uppercase tracking-[0.3em] text-sm">Expert Craftsmanship</p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
            {SERVICES.map((item, i) => (
              <div key={i} className="group cursor-default">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-xl font-bold group-hover:text-gold transition-colors">{item.name}</div>
                  <div className="text-2xl font-display font-black ml-4 text-gold">{item.price}</div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                <div className="h-px bg-white/5 w-full mt-4 group-hover:bg-gold/20 transition-all" />
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="bg-gold hover:bg-gold-hover text-black px-10 py-4 rounded-full font-black transition-all transform hover:scale-105">
              SECURE YOUR CHAIR
            </button>
          </div>
        </div>
      </section>

      {/* Lookbook Section */}
      <section id="lookbook" className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">THE LOOKBOOK</h2>
              <p className="text-white/50 uppercase tracking-[0.3em] text-sm mt-2">Sharp Cuts & Precision Fades</p>
            </div>
            <a href="#" className="flex items-center text-gold font-bold hover:underline">
              FOLLOW ON INSTAGRAM <Instagram className="ml-2" size={20} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {LOOKBOOK_IMAGES.map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-[4/5] overflow-hidden rounded-2xl group relative"
              >
                <img 
                  src={src} 
                  alt={`Glaris Barber Style ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <Instagram size={32} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section id="location" className="py-24 bg-matte-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">Open 7 Days. Walk-Ins Welcome, Bookings Prioritized.</h2>
                <p className="text-white/60 mb-8 text-lg">Located just off Bury Old Road. Skip the queue by securing your spot online.</p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gold/10 p-3 rounded-xl text-gold">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-xl mb-1">Address</div>
                      <p className="text-white/60">33 Whittaker Ln, Prestwich,<br />Manchester M25 1HA</p>
                      <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gold text-sm font-bold mt-2 hover:underline"
                      >
                        GET DIRECTIONS <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gold/10 p-3 rounded-xl text-gold">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-xl mb-1">Contact</div>
                      <p className="text-white/60">0161 123 4567</p>
                      <p className="text-white/60">hello@glarisbarber.co.uk</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-charcoal p-8 rounded-3xl border border-white/5">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="text-gold" />
                  <h3 className="text-2xl font-bold">Opening Hours</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Monday – Friday", hours: "09:00 AM – 7:00 PM" },
                    { day: "Saturday", hours: "09:00 AM – 6:00 PM" },
                    { day: "Sunday", hours: "10:00 AM – 4:00 PM" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className={item.day === "Sunday" ? "text-gold font-bold" : "text-white/70"}>{item.day}</span>
                      <span className="font-mono">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <span className="bg-gold/20 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Open 7 Days a Week
                  </span>
                </div>
              </div>
            </div>

            <div className="h-full min-h-[400px] bg-charcoal rounded-3xl overflow-hidden border border-white/5 relative group">
              {/* Placeholder for Google Map */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <MapPin size={48} className="text-gold mb-4 opacity-50" />
                <h4 className="text-xl font-bold mb-2">Interactive Map</h4>
                <p className="text-white/40 text-sm max-w-xs">
                  In a production environment, this would be an embedded Google Map showing our location in Prestwich.
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                alt="Map Placeholder" 
                className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-matte-black py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-display font-black tracking-tighter">
            GLARIS <span className="text-gold">BARBER</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/50 hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/50 hover:text-gold transition-colors"><Facebook size={20} /></a>
          </div>

          <div className="text-white/30 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Glaris Barber Prestwich. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-50 bg-gradient-to-t from-matte-black to-transparent">
        <button className="w-full bg-gold text-black py-4 rounded-full font-black text-lg shadow-2xl flex items-center justify-center">
          BOOK APPOINTMENT <ChevronRight className="ml-2" />
        </button>
      </div>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </motion.div>
  );
}

function VintageTheme() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen font-serif vintage-bg text-parchment selection:bg-copper selection:text-white"
    >
      {/* Vintage Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#2A1B12]/95 py-4 border-b-2 border-gold/30 shadow-2xl' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-3xl font-serif font-black tracking-widest cursor-pointer italic"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            GLARIS <span className="text-gold">EST. 2024</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <button onClick={() => scrollToSection('v-services')} className="text-sm font-bold uppercase tracking-widest hover:text-gold transition-colors">The Menu</button>
            <button onClick={() => scrollToSection('v-lookbook')} className="text-sm font-bold uppercase tracking-widest hover:text-gold transition-colors">Gallery</button>
            <button onClick={() => scrollToSection('v-location')} className="text-sm font-bold uppercase tracking-widest hover:text-gold transition-colors">Location</button>
            <button className="bg-copper hover:bg-gold text-white px-8 py-3 rounded-sm text-sm font-black uppercase tracking-widest transition-all border border-gold/50 shadow-inner">
              Secure Appointment
            </button>
          </div>
        </div>
      </nav>

      {/* Vintage Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b-8 border-[#1A0F0A]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/Images/Background.png" 
            alt="Vintage Barber Shop Interior" 
            className="w-full h-full object-cover opacity-40 sepia-[0.2] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3D2B1F]/90 via-transparent to-[#3D2B1F]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl vintage-border p-12 bg-[#2A1B12]/60 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex justify-center mb-6">
              <Award size={48} className="text-gold animate-pulse" />
            </div>
            <h1 className="text-6xl md:text-9xl font-serif font-black mb-8 leading-tight tracking-tight italic text-white drop-shadow-2xl">
              Prestwich’s Premier <br />
              <span className="text-gold">Fine Grooming</span>
            </h1>
            <p className="text-2xl md:text-3xl text-parchment/90 mb-12 font-classic italic max-w-3xl mx-auto border-y border-gold/30 py-6">
              Precision cuts, flawless fades, and traditional service. <br />
              Open 7 days a week on Whittaker Lane.
            </p>
            <div className="flex flex-col items-center space-y-8">
              <button className="bg-copper hover:bg-gold text-white px-16 py-6 rounded-sm text-xl font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 shadow-2xl border-2 border-gold/50">
                Book Your Cut
              </button>
              <div className="flex items-center space-x-4">
                <div className="h-px w-12 bg-gold/50" />
                <span className="text-lg font-bold italic tracking-widest text-gold">⭐ 5.0 Rating on Google</span>
                <div className="h-px w-12 bg-gold/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vintage Social Proof */}
      <section className="py-32 bg-[#3D2B1F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-black mb-6 italic">Don't Just Take Our Word For It</h2>
            <div className="w-48 h-1 bg-gold mx-auto opacity-50" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {REVIEWS.map((review, i) => (
              <motion.div 
                key={i}
                className="bg-[#1A0F0A]/60 p-10 rounded-sm border-l-4 border-gold relative italic font-classic text-xl leading-relaxed shadow-xl"
              >
                <div className="absolute -top-4 -left-4 bg-gold text-[#3D2B1F] p-2 rounded-full shadow-lg">
                  <Star size={20} className="fill-[#3D2B1F]" />
                </div>
                <p className="mb-8">"{review.text}"</p>
                <div className="font-bold text-gold uppercase tracking-widest text-sm not-italic">— {review.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vintage Services */}
      <section id="v-services" className="py-32 bg-[#1A0F0A] relative border-y-4 border-gold/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24 border-double border-4 border-gold/30 p-10 bg-[#2A1B12]/40">
            <h2 className="text-5xl md:text-7xl font-serif font-black mb-4 italic">Premium Cuts, No Compromise</h2>
            <p className="text-gold uppercase tracking-[0.4em] text-sm font-bold">The Gentleman's Selection</p>
          </div>

          <div className="space-y-16">
            {SERVICES.map((item, i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-center gap-6 border-b border-gold/10 pb-12">
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-3xl font-serif font-bold group-hover:text-gold transition-colors italic">{item.name}</h3>
                    <span className="text-3xl font-serif font-black text-gold ml-4">{item.price}</span>
                  </div>
                  <p className="text-parchment/60 font-classic text-lg italic leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <button className="bg-copper hover:bg-gold text-white px-12 py-5 rounded-sm font-black uppercase tracking-widest transition-all border-2 border-gold/50">
              Secure Your Chair
            </button>
          </div>
        </div>
      </section>

      {/* Vintage Lookbook */}
      <section id="v-lookbook" className="py-32 bg-[#3D2B1F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-serif font-black mb-4 italic">The Lookbook</h2>
            <p className="text-gold uppercase tracking-[0.4em] text-sm font-bold">Craftsmanship in Every Cut</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {LOOKBOOK_IMAGES.map((src, i) => (
              <div key={i} className="relative group p-4 border-2 border-gold/20 bg-[#1A0F0A]/40 shadow-2xl">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={src} 
                    alt="Barber Style" 
                    className="w-full h-full object-cover grayscale-[0.3] sepia-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:sepia-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 border-8 border-transparent group-hover:border-gold/20 transition-all pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vintage Location */}
      <section id="v-location" className="py-32 bg-[#1A0F0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="vintage-border p-10 bg-[#2A1B12]/60 shadow-2xl">
                <h2 className="text-4xl md:text-6xl font-serif font-black mb-8 italic leading-tight">Open 7 Days. <br />Walk-Ins Welcome.</h2>
                <p className="text-parchment/70 mb-10 text-xl font-classic italic">Located just off Bury Old Road. Skip the queue by securing your spot online.</p>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <MapPin className="text-gold mt-1" size={28} />
                    <div>
                      <div className="font-bold text-xl uppercase tracking-widest mb-2">The Shop</div>
                      <p className="text-parchment/60 text-lg italic font-classic">33 Whittaker Ln, Prestwich,<br />Manchester M25 1HA</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <Phone className="text-gold mt-1" size={28} />
                    <div>
                      <div className="font-bold text-xl uppercase tracking-widest mb-2">Speak With Us</div>
                      <p className="text-parchment/60 text-lg italic font-classic">0161 123 4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="bg-[#3D2B1F] p-12 rounded-sm border-4 border-double border-gold/30 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-10">
                    <History className="text-gold" size={32} />
                    <h3 className="text-3xl font-serif font-bold italic">Trading Hours</h3>
                  </div>
                  <div className="space-y-6">
                    {[
                      { day: "Monday – Friday", hours: "09:00 AM – 7:00 PM" },
                      { day: "Saturday", hours: "09:00 AM – 6:00 PM" },
                      { day: "Sunday", hours: "10:00 AM – 4:00 PM" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-gold/10 pb-4">
                        <span className="text-lg font-bold uppercase tracking-widest">{item.day}</span>
                        <span className="font-mono text-gold">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vintage Footer */}
      <footer className="bg-[#3D2B1F] py-20 border-t-8 border-[#1A0F0A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="text-4xl font-serif font-black tracking-[0.3em] mb-8 italic">
            GLARIS <span className="text-gold">BARBER</span>
          </div>
          <div className="flex justify-center space-x-10 mb-10">
            <a href="#" className="text-gold hover:text-white transition-colors"><Instagram size={28} /></a>
            <a href="#" className="text-gold hover:text-white transition-colors"><Facebook size={28} /></a>
          </div>
          <div className="text-gold/40 text-sm font-bold uppercase tracking-[0.5em]">
            Established MMXXIV • Prestwich, Manchester
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
