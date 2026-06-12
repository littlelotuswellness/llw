import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Leaf, 
  Smile, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Flower2,
  Clock
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const navigateTo = (view: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitting(true);
    setNewsletterError('');
    setNewsletterSuccess(false);

    try {
      const formData = new FormData();
      formData.append('EMAIL', newsletterEmail);
      formData.append('locale', 'en');

      await fetch('https://eea1bd3f.sibforms.com/serve/MUIFAHszwd8q8mqO-a1ApY9K_9l6F8PLgNb_nTFLUhixvK2zUXo88R9-fe6Ok8NVlDHOsQb5S7577BfiW9ssIlaYTsAx7EFsdaSxmOejIiCTwTPhNkU6MKvkvWiKIMC7vVCX4U476GLTuYNHsQ3YhBonoS_CkHD46aoOPchkQJ3Sj96FDhxxXMEU_M306pVypX7QcClnRgtu67T_7Q==', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      setNewsletterSuccess(true);
      setNewsletterEmail('');
    } catch (err) {
      console.error(err);
      setNewsletterError('Something went wrong. Please try again.');
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans text-gray-800 flex flex-col">
      {/* Work in Progress Banner */}
      <div className="bg-amber-100 border-b border-amber-200 py-2.5 text-center px-4">
        <p className="text-xs sm:text-sm text-amber-800 font-medium tracking-wide">
          ⚠️ This website is NOT IN USE - WORKING IN PROCESS. Thank you for your patience!
        </p>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => navigateTo('home')}
            >
              <img src="/logo.jpg" alt="Little Lotus Wellness Logo" className="h-16 w-16 object-contain rounded-full border border-rose-100 shadow-sm" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif text-[#6b8e7a] leading-none tracking-wide">Little Lotus</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-red-500 font-semibold mt-1">Wellness</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigateTo('home')} className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-rose-500' : 'text-gray-600 hover:text-[#6b8e7a]'}`}>Home</button>
              <button onClick={() => navigateTo('services')} className={`text-sm font-medium transition-colors ${currentView === 'services' ? 'text-rose-500' : 'text-gray-600 hover:text-[#6b8e7a]'}`}>Services</button>
              <button onClick={() => navigateTo('shop')} className={`text-sm font-medium transition-colors ${currentView === 'shop' ? 'text-rose-500' : 'text-gray-600 hover:text-[#6b8e7a]'}`}>Boutique</button>
              <button onClick={() => navigateTo('faq')} className={`text-sm font-medium transition-colors ${currentView === 'faq' ? 'text-rose-500' : 'text-gray-600 hover:text-[#6b8e7a]'}`}>FAQ</button>
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-[#6b8e7a] hover:bg-[#5a7a68] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow flex items-center gap-2"
              >
                <Calendar size={16} />
                Book an Appointment
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-[#6b8e7a]">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-rose-100 px-4 pt-2 pb-6 space-y-2 shadow-lg">
            <button onClick={() => navigateTo('home')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 rounded-lg">Home</button>
            <button onClick={() => navigateTo('services')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 rounded-lg">Services</button>
            <button onClick={() => navigateTo('shop')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 rounded-lg">Boutique</button>
            <button onClick={() => navigateTo('faq')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 rounded-lg">FAQ</button>
            <div className="pt-2">
              <button 
                onClick={() => {setIsBookingModalOpen(true); setIsMobileMenuOpen(false);}}
                className="w-full bg-[#6b8e7a] text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <Calendar size={18} />
                Book an Appointment
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'home' && <HomeView onBook={() => setIsBookingModalOpen(true)} onNavigate={navigateTo} />}
        {currentView === 'services' && <ServicesView onBook={() => setIsBookingModalOpen(true)} />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'faq' && <FaqView />}
      </main>

      {/* Footer */}
      <footer className="bg-[#6b8e7a] text-emerald-50 py-12 border-t-4 border-rose-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.jpg" alt="Little Lotus Wellness Logo" className="h-14 w-14 object-contain rounded-full border border-rose-200/50 bg-white p-0.5" />
              <span className="text-2xl font-serif text-white">Little Lotus</span>
            </div>
            <p className="text-emerald-100 text-sm mb-6 max-w-xs">
              Nurturing Little Bodies • Calming Little Minds • Growing Wellness
            </p>
            <div className="space-y-3 text-sm text-emerald-50">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-rose-200 shrink-0 mt-0.5" />
                <p>316 Alexander St SE, Suite 2<br/>Marietta, GA 30060</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-rose-200 shrink-0" />
                <p>404-217-2717</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-rose-200 shrink-0" />
                <a href="mailto:littlelotuswellness@proton.me" className="hover:underline hover:text-white transition-colors">
                  littlelotuswellness@proton.me
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">Our Services</button></li>
              <li><button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">Online Boutique</button></li>
              <li><button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">Parent FAQ</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Join Our Newsletter</h3>
            <p className="text-sm text-emerald-100 mb-4">Get holistic health tips and exclusive updates.</p>
            {newsletterSuccess ? (
              <div className="p-3 bg-emerald-800/50 text-emerald-100 rounded-lg text-sm border border-emerald-700/50 animate-in fade-in duration-300">
                🌸 Thank you for subscribing! A welcome letter has been sent to your email.
              </div>
            ) : (
              <form className="flex flex-col gap-2" onSubmit={handleNewsletterSubscribe}>
                <input 
                  required
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                {newsletterError && (
                  <p className="text-rose-200 text-xs mt-1">⚠️ {newsletterError}</p>
                )}
                <button 
                  type="submit"
                  disabled={newsletterSubmitting}
                  className="bg-rose-300 hover:bg-rose-400 disabled:bg-emerald-800/40 text-[#5a7a68] disabled:text-emerald-300 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {newsletterSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-[#5a7a68]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-emerald-700/50 text-center text-xs text-emerald-200">
          <p>&copy; {new Date().getFullYear()} Little Lotus Wellness. All rights reserved.</p>
        </div>
      </footer>

      {/* Booking Modal */}
      {isBookingModalOpen && <BookingModal onClose={() => setIsBookingModalOpen(false)} />}
    </div>
  );
}

/* =========================================
   VIEWS
========================================= */

interface HomeViewProps {
  onBook: () => void;
  onNavigate: (view: string) => void;
}

function HomeView({ onBook, onNavigate }: HomeViewProps) {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           {/* Decorative background shapes mimicking calming environment */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-600 text-sm font-medium mb-6">
              Pediatric Massage Therapy in Marietta, GA
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight mb-6">
              Nurturing Little Bodies.<br/>
              <span className="text-[#6b8e7a]">Calming Little Minds.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              A specialized sanctuary providing safe, age-appropriate therapeutic touch exclusively for infants, children, and adolescents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onBook}
                className="bg-[#6b8e7a] hover:bg-[#5a7a68] text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2"
              >
                Book a Session
              </button>
              <button 
                onClick={() => onNavigate('services')}
                className="bg-white border-2 border-[#6b8e7a] text-[#6b8e7a] hover:bg-emerald-50 px-8 py-4 rounded-full font-medium text-lg transition-all flex justify-center items-center gap-2"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <div className="bg-rose-300 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <span className="text-[#5a7a68] font-medium">🌸 Starting your family's preventative care journey?</span>
          <button onClick={onBook} className="text-white font-bold underline hover:text-rose-50 transition-colors">
            Ask about our Introductory Wellness Packages!
          </button>
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-tr from-emerald-100 to-purple-100 flex items-center justify-center p-8 shadow-inner overflow-hidden relative">
                 {/* Abstract representation of the clinic room */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-800/20">
                    <Flower2 size={120} strokeWidth={1} />
                    <Heart size={60} strokeWidth={1} className="mt-8" />
                 </div>
                 <div className="relative z-10 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 text-center shadow-sm">
                    <p className="text-xl font-serif text-[#6b8e7a]">"A peaceful environment where wellness becomes a positive part of every child’s growth."</p>
                 </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">About Little Lotus Wellness</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Welcome to Little Lotus Wellness, a sanctuary dedicated exclusively to the physical, emotional, and developmental well-being of infants, children, and adolescents.
                </p>
                <p>
                  We understand that children have unique needs that differ from adults. By providing safe, gentle, and age-appropriate therapeutic touch, we strive to help young clients manage daily stress, recover from sports-related tension, alleviate growing pains, and navigate sensory challenges.
                </p>
                <p>
                  We believe that parents are vital partners in this process, and we encourage active communication and family-centered care to ensure every child thrives in mind, body, and spirit.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-rose-400 mt-1 shrink-0" size={24} />
                  <div>
                    <h4 className="font-medium text-gray-900">Safety First</h4>
                    <p className="text-sm text-gray-500">Licensed & certified care</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Smile className="text-rose-400 mt-1 shrink-0" size={24} />
                  <div>
                    <h4 className="font-medium text-gray-900">Family-Centered</h4>
                    <p className="text-sm text-gray-500">Parents always welcome</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ServicesViewProps {
  onBook: () => void;
}

function ServicesView({ onBook }: ServicesViewProps) {
  const packages = [
    {
      title: "Athletic Recovery & Performance",
      description: "Designed for young athletes, this session focuses on muscle recovery, tension release, and improving range of motion to support active lifestyles.",
      icon: <Leaf className="text-emerald-500" size={32} />,
      color: "bg-emerald-50"
    },
    {
      title: "Calm & Centered",
      description: "A supportive approach for children navigating school-related stress, anxiety, or busy schedules. Promotes deep relaxation and emotional well-being.",
      icon: <Heart className="text-rose-400" size={32} />,
      color: "bg-rose-50"
    },
    {
      title: "Growing Comfort",
      description: "Targeted relief for children experiencing growing pains and physical discomfort associated with rapid growth spurts.",
      icon: <Smile className="text-amber-500" size={32} />,
      color: "bg-amber-50"
    },
    {
      title: "Sensory Support",
      description: "A specialized, individualized session that uses gentle, grounding touch to support children with sensory processing needs.",
      icon: <Flower2 className="text-purple-500" size={32} />,
      color: "bg-purple-50"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 py-16 bg-[#faf9f7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Tailored Pediatric Care</h1>
          <p className="text-lg text-gray-600">
            Every child's journey is unique. Our sessions are carefully tailored to meet the physical, emotional, and sensory needs of your child.
          </p>
        </div>

        {/* Core Offering */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-rose-100 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-rose-100 px-6 py-2 rounded-bl-3xl font-medium text-rose-600">
            Primary Service
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-serif text-[#6b8e7a] mb-2">Pediatric Massage Therapy</h2>
              <div className="flex items-center gap-2 text-gray-500 mb-6">
                <Clock size={18} />
                <span>60 Minutes</span>
                <span className="mx-2">•</span>
                <span className="font-semibold text-gray-800 text-lg">$85</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our foundational therapeutic session provides a safe, gentle, and age-appropriate experience. Every appointment includes a brief, personalized consultation to ensure the treatment aligns with your child’s current developmental stage and wellness goals.
              </p>
              <button 
                onClick={onBook}
                className="bg-rose-300 hover:bg-rose-400 text-[#5a7a68] font-medium px-8 py-3 rounded-full transition-colors inline-flex items-center gap-2"
              >
                Schedule Session <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Specialized Packages */}
        <h3 className="text-2xl font-serif text-gray-900 mb-8 text-center">Specialized Wellness Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg, idx) => (
            <div key={idx} className={`${pkg.color} rounded-2xl p-8 border border-white/50 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm mb-6">
                {pkg.icon}
              </div>
              <h4 className="text-xl font-medium text-gray-900 mb-3">{pkg.title}</h4>
              <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
            </div>
          ))}
        </div>

        {/* Parent Partnership */}
        <div className="mt-16 bg-[#6b8e7a] text-white rounded-3xl p-8 md:p-12 text-center shadow-lg">
          <Heart className="mx-auto mb-4 text-rose-200" size={40} />
          <h3 className="text-2xl font-serif mb-4">Parental Partnership</h3>
          <p className="text-emerald-50 max-w-2xl mx-auto leading-relaxed">
            We believe parents are the most important partners in a child's wellness journey. You are always welcome and encouraged to remain present during your child’s session to ensure they feel safe, supported, and comfortable.
          </p>
        </div>

      </div>
    </div>
  );
}

function ShopView() {
  const products = [
    {
      id: 1,
      name: "Little Lotus Plush Companion",
      category: "Soothing Companions",
      price: "$24.00",
      desc: "Our signature soft, comforting friend perfect for helping children feel secure during bedtime.",
      bgColor: "bg-rose-100",
      icon: <Heart size={40} className="text-rose-400" />
    },
    {
      id: 2,
      name: "Lavender Dreams Roll-On",
      category: "Calming Aromatherapy",
      price: "$15.00",
      desc: "Child-safe essential oil blend formulated to promote a peaceful atmosphere and settle busy minds.",
      bgColor: "bg-purple-100",
      icon: <Leaf size={40} className="text-purple-400" />
    },
    {
      id: 3,
      name: "Gentle Touch Massage Tool",
      category: "Wellness Supplies",
      price: "$18.00",
      desc: "A soft, easy-to-grip tool to help your child maintain the benefits of therapeutic sessions at home.",
      bgColor: "bg-emerald-100",
      icon: <Smile size={40} className="text-emerald-400" />
    },
    {
      id: 4,
      name: "Weighted Sensory Lap Pad",
      category: "Comfort Supplies",
      price: "$35.00",
      desc: "Provides gentle, grounding pressure to support sensory processing needs during seated activities.",
      bgColor: "bg-amber-100",
      icon: <ShieldCheck size={40} className="text-amber-400" />
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ShoppingBag className="mx-auto mb-4 text-[#6b8e7a]" size={48} />
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Online Boutique</h1>
          <p className="text-lg text-gray-600">
            Bringing the tranquility of our clinic into your home. Carefully curated items to support your child’s wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className={`aspect-square ${product.bgColor} flex items-center justify-center relative overflow-hidden`}>
                {product.icon}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
              <div className="p-6 flex flex-col h-[280px]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6b8e7a] mb-2">{product.category}</p>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-gray-900">{product.price}</span>
                  <button className="text-rose-500 hover:text-rose-600 font-medium text-sm flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-full transition-colors">
                    Add <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-rose-50 rounded-3xl p-8 md:p-12 text-center border border-rose-100">
          <h3 className="text-2xl font-serif text-[#6b8e7a] mb-4">Why Shop With Us?</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Every product in our boutique is tested for safety, durability, and its ability to contribute positively to a child’s sensory and emotional health. When you shop at Little Lotus Wellness, you are choosing quality products that align with the holistic care your child receives in our treatment rooms.
          </p>
        </div>
      </div>
    </div>
  );
}

function FaqView() {
  const faqs = [
    {
      q: "What is pediatric massage?",
      a: "Pediatric massage is a safe, gentle, and age-appropriate therapeutic touch designed specifically for the unique physical and emotional needs of children. It is a holistic approach to wellness, not a miniaturized version of adult massage."
    },
    {
      q: "Who is your target audience?",
      a: "We provide specialized massage therapy for infants, children, and adolescents, from birth through 18 years of age."
    },
    {
      q: "Can parents stay in the room during the session?",
      a: "Yes! We prioritize a family-centered approach. Parents are welcome and encouraged to remain present during the session to ensure your child feels safe, supported, and comfortable."
    },
    {
      q: "What are the benefits of pediatric massage?",
      a: "Regular sessions can provide numerous benefits, including stress & anxiety reduction (helping children navigate the pressures of school), physical recovery for young athletes, improved body awareness, and sensory support using grounding techniques."
    },
    {
      q: "How do I prepare for my child’s first visit?",
      a: "When booking, you will complete a pre-appointment intake form. This allows us to understand your child’s developmental stage, sensory needs, and specific wellness goals, ensuring we can provide a truly individualized treatment session."
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 py-16 bg-[#faf9f7]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Everything you need to know about preparing for your visit.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-[#6b8e7a] mb-3">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Location Box embedded in FAQ/Contact area */}
        <div className="mt-16 bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col md:flex-row">
          <div className="bg-rose-50 p-8 md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl font-serif text-gray-900 mb-6">Visit Our Sanctuary</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#6b8e7a] shrink-0 mt-1" size={20} />
                <span>316 Alexander St SE, Suite 2<br/>Marietta, GA 30060</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#6b8e7a] shrink-0" size={20} />
                <span>404-217-2717</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#6b8e7a] shrink-0" size={20} />
                <a href="mailto:littlelotuswellness@proton.me" className="hover:underline hover:text-[#5a7a68] transition-colors">
                  littlelotuswellness@proton.me
                </a>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-rose-200">
              <p className="text-sm text-gray-500 font-medium">✓ On-site parking available</p>
              <p className="text-sm text-gray-500 font-medium">✓ Close to public transportation</p>
              <p className="text-sm text-gray-500 font-medium">✓ Just minutes from Marietta Square</p>
            </div>
          </div>
          <div className="md:w-1/2 bg-gray-200 min-h-[300px] relative flex items-center justify-center">
            {/* Visual map placeholder to prevent loading real iframe which might break or have API key issues */}
            <div className="absolute inset-0 bg-emerald-100/50 flex flex-col items-center justify-center p-8 text-center">
              <MapPin size={48} className="text-[#6b8e7a] mb-4 opacity-50" />
              <p className="text-[#5a7a68] font-medium">Interactive Google Map Area</p>
              <p className="text-sm text-emerald-700/70 mt-2">Near Green Acres Elementary School</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   MODALS
========================================= */

interface BookingModalProps {
  onClose: () => void;
}

function BookingModal({ onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [parentName, setParentName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Pediatric Massage (Standard 60 min)');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<Record<string, { status: string; available_slots: number }>>({});

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ];

  // Fetch date availability on mount
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch('/api/availability');
        if (response.ok) {
          const data = await response.json();
          const map: Record<string, { status: string; available_slots: number }> = {};
          data.forEach((item: any) => {
            map[item.date] = { status: item.status, available_slots: item.available_slots };
          });
          setAvailability(map);
        } else {
          throw new Error('API response error');
        }
      } catch (err) {
        console.warn('Backend API availability not found, utilizing local deterministic simulation.');
        // Fallback simulation for 60 days
        const mockMap: Record<string, { status: string; available_slots: number }> = {};
        for (let i = 0; i < 60; i++) {
          const d = new Date();
          d.setDate(d.getDate() + i);
          const dateStr = d.toISOString().split('T')[0];
          
          let hash = 0;
          for (let j = 0; j < dateStr.length; j++) {
            hash = dateStr.charCodeAt(j) + ((hash << 5) - hash);
          }
          // Deterministic booked date: ~14% chance of being fully booked
          const isBooked = Math.abs(hash % 7) === 0;
          mockMap[dateStr] = {
            status: isBooked ? 'booked' : 'available',
            available_slots: isBooked ? 0 : Math.abs(hash % 5) + 1
          };
        }
        setAvailability(mockMap);
      }
    };
    fetchAvailability();
  }, []);

  // Helper to format HTML date string (YYYY-MM-DD) to MM/DD/YYYY
  const formatDateToMMDDYYYY = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${month}/${day}/${year}`;
  };

  // Deterministic generator of booked slots based on the selected date
  const getBookedSlotsForDate = (dateStr: string): string[] => {
    if (!dateStr) return [];
    
    // Check if the overall date status is booked from our availability dataset
    const dateAvail = availability[dateStr];
    if (dateAvail && (dateAvail.status === 'booked' || dateAvail.available_slots === 0)) {
      return [...timeSlots]; // All slots booked
    }
    
    // Simple deterministic hash based on date string
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const booked: string[] = [];
    // Deterministically book 1 to 5 slots
    const numBooked = Math.abs(hash % 5) + 1; 
    for (let i = 0; i < numBooked; i++) {
      const slotIndex = Math.abs((hash + i * 17) % timeSlots.length);
      const slot = timeSlots[slotIndex];
      if (!booked.includes(slot)) {
        booked.push(slot);
      }
    }
    return booked;
  };

  // Check if a time slot has already passed for today
  const isTimeSlotInPast = (slot: string, dateStr: string): boolean => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (dateStr !== todayStr) return false; // Only check for today
    
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    
    const [time, modifier] = slot.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    
    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
    
    if (hours < currentHours) return true;
    if (hours === currentHours && minutes <= currentMinutes) return true;
    return false;
  };

  const bookedTimes = date ? getBookedSlotsForDate(date) : [];
  const availableSlots = timeSlots.filter(slot => {
    if (slot === '12:00 PM') return false; // Always block out 12:00 PM (lunch hour)
    const isBooked = bookedTimes.includes(slot);
    const isPastTime = isTimeSlotInPast(slot, date);
    return !isBooked && !isPastTime;
  });

  // Reset selected time if it becomes unavailable when date changes
  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    setTimeSlot(''); // Reset time selection on date change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError('Please select a date.');
      return;
    }
    if (!timeSlot) {
      setError('Please select a preferred time slot.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const formattedDate = formatDateToMMDDYYYY(date);

    try {
      const response = await fetch('https://formsubmit.co/ajax/littlelotuswellness@proton.me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'email': email, // Required by FormSubmit for autoresponse
          'Parent Name': parentName,
          'Child Age': childAge,
          'Service Needed': service,
          'Preferred Date (MM/DD/YYYY)': formattedDate,
          'Preferred Time': timeSlot,
          'Notes / Sensory Needs': notes,
          '_subject': 'Appointment Request Confirmed - Little Lotus Wellness 🪷',
          '_autoresponse': `Hi ${parentName},\n\nThank you for requesting an appointment with Little Lotus Wellness! We have received your request and will contact you shortly to confirm your booking.\n\nHere are your request details:\n- Service: ${service}\n- Date: ${formattedDate}\n- Time Slot: ${timeSlot}\n\nSincerely,\nLittle Lotus Wellness\nMarietta, GA`
        })
      });

      if (response.ok) {
        setStep(2);
      } else {
        throw new Error('Form submission failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Calendar Grid layout
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Padding
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }
    
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const todayMidnight = new Date();
    todayMidnight.setHours(0,0,0,0);

    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(year, month, day);
      const yearStr = d.getFullYear();
      const monthStr = String(d.getMonth() + 1).padStart(2, '0');
      const dayStr = String(d.getDate()).padStart(2, '0');
      const dateStr = `${yearStr}-${monthStr}-${dayStr}`;
      
      const isPast = d < todayMidnight;
      const dayAvail = availability[dateStr];
      const isBooked = dayAvail ? (dayAvail.status === 'booked' || dayAvail.available_slots === 0) : false;
      const isSelected = date === dateStr;
      
      let btnClass = "h-8 w-8 rounded-full text-xs flex items-center justify-center transition-all ";
      let isDisabled = isPast || isBooked;
      
      if (isSelected) {
        btnClass += "bg-[#6b8e7a] text-white font-semibold shadow-sm";
      } else if (isDisabled) {
        btnClass += "text-gray-300 line-through cursor-not-allowed bg-gray-50";
      } else {
        btnClass += "text-gray-700 hover:bg-rose-50 hover:text-[#6b8e7a] font-medium";
      }
      
      days.push(
        <button
          key={`day-${day}`}
          type="button"
          disabled={isDisabled}
          onClick={() => handleDateChange(dateStr)}
          className={btnClass}
          title={isBooked ? "Fully Booked" : ""}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="border border-gray-100 rounded-xl p-3 bg-white shadow-sm mt-1">
        <div className="flex justify-between items-center mb-2">
          <button 
            type="button" 
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            className="p-1 rounded hover:bg-gray-100 text-gray-600 font-bold"
          >
            &larr;
          </button>
          <span className="text-xs font-semibold text-gray-700">{monthNames[month]} {year}</span>
          <button 
            type="button" 
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            className="p-1 rounded hover:bg-gray-100 text-gray-600 font-bold"
          >
            &rarr;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-semibold text-gray-400 mb-1">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/45 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Window Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 text-white hover:text-rose-200 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full p-3 transition-colors z-[110] shadow-md border border-white/10"
        aria-label="Close window"
      >
        <X size={24} />
      </button>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative">
        {step === 1 ? (
          <div className="p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-serif text-[#6b8e7a] mb-2">Request an Appointment</h2>
            <p className="text-gray-500 text-sm mb-6">Please fill out this brief pre-appointment intake form so we can individualize your child's session.</p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Parent's Name</label>
                  <input 
                    required 
                    type="text" 
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6b8e7a] focus:border-transparent outline-none bg-white text-gray-800" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Child's Age</label>
                  <input 
                    required 
                    type="number" 
                    min="0" 
                    max="18" 
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6b8e7a] focus:border-transparent outline-none bg-white text-gray-800" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Contact Email</label>
                <input 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6b8e7a] focus:border-transparent outline-none bg-white text-gray-800" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Service Needed</label>
                <select 
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6b8e7a] focus:border-transparent outline-none bg-white text-gray-800"
                >
                  <option>Pediatric Massage (Standard 60 min)</option>
                  <option>Athletic Recovery & Performance</option>
                  <option>Calm & Centered (Stress Relief)</option>
                  <option>Growing Comfort</option>
                  <option>Sensory Support</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 font-semibold">Select Date</label>
                  {renderCalendar()}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 font-semibold">Available Times</label>
                  {date ? (
                    availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-1.5 animate-in fade-in duration-300">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setTimeSlot(slot);
                              if (error === 'Please select a preferred time slot.') setError('');
                            }}
                            className={`text-[10px] sm:text-xs py-2 px-1 rounded-lg border text-center transition-all ${
                              timeSlot === slot
                                ? 'bg-[#6b8e7a] border-[#6b8e7a] text-white font-medium'
                                : 'border-gray-200 text-gray-600 hover:border-[#6b8e7a] hover:bg-rose-50'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs text-center font-medium animate-in slide-in-from-top-2 duration-300">
                        ⚠️ Fully booked. Please select another date.
                      </div>
                    )
                  ) : (
                    <div className="text-xs text-gray-400 italic py-2 border border-dashed border-gray-200 rounded-lg text-center bg-gray-50">
                      Select a date to see times
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Special Wellness Needs or Sensory Notes</label>
                <textarea 
                  rows={2} 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6b8e7a] focus:border-transparent outline-none resize-none bg-white text-gray-800"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#6b8e7a] hover:bg-[#5a7a68] disabled:bg-gray-400 text-white font-medium py-3 rounded-xl transition-colors mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Request'}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6">
              <CheckIcon size={32} strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-serif text-gray-900 mb-2">Request Received!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for choosing Little Lotus Wellness. Your request for **{formatDateToMMDDYYYY(date)}** at **{timeSlot}** has been sent to **littlelotuswellness@proton.me**. We will contact you shortly to confirm your appointment time.
            </p>
            <button 
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-8 py-3 rounded-full transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple check icon for the success state
function CheckIcon(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  const { size = 24, ...rest } = props;
  return (
    <svg 
      width={size}
      height={size}
      {...rest} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
