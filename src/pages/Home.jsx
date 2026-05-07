import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Users, Clock, Award, Sparkles } from 'lucide-react';
import { getMedicines } from '../api/medicines';
import MedicineCard from '../components/MedicineCard';
import OrderModal from '../components/OrderModal';
import heroImage from '../assets/hero.png';

const Home = () => {
  const [featuredMedicines, setFeaturedMedicines] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedMedicine, setSelectedMedicine] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getMedicines();
        setFeaturedMedicines(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch featured medicines');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleOrder = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const stats = [
    { label: 'Years of Experience', value: '20+', icon: Clock },
    { label: 'Happy Patients', value: '15,000+', icon: Users },
    { label: 'Medicines Available', value: '500+', icon: ShieldCheck },
    { label: 'Awards Won', value: '12', icon: Award },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Hospital Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Holistic Healing <br />
            <span className="text-primary-light">For Your Family</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl text-slate-200">
            Welcome to Homeopathy Hospital. We provide personalized homeopathic treatments that address the root cause of your health issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/medicines" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all transform hover:scale-105"
            >
              Browse Medicines
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/about" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-lg">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full tracking-wider uppercase">
                About Our Clinic
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Traditional Wisdom Meets <br />
                <span className="text-primary">Modern Healthcare</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Homeopathy Hospital was founded on the principle that true health comes from balance. Our expert doctors use specialized homeopathic remedies to stimulate the body's natural healing processes.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you're dealing with chronic conditions or looking for preventive care, our team is here to guide you on your journey to wellness.
              </p>
              <div className="pt-4">
                <Link to="/about" className="text-primary font-bold inline-flex items-center hover:underline group">
                  Read our full story 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" 
                  alt="Doctor consultation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-0"></div>
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Medicines Preview */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Top Remedies</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Browse our curated selection of high-quality homeopathic medicines available for online ordering.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/5] bg-slate-100 dark:bg-slate-900 animate-pulse rounded-3xl" />
              ))}
            </div>
          ) : featuredMedicines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {featuredMedicines.map((medicine) => (
                <MedicineCard 
                  key={medicine.id} 
                  medicine={medicine} 
                  onOrder={handleOrder} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-300 dark:border-slate-800">
              <Sparkles className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">New remedies arriving soon!</p>
            </div>
          )}
          
          <div className="text-center mt-16">
            <Link 
              to="/medicines" 
              className="inline-flex items-center px-10 py-4 bg-white dark:bg-slate-900 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/10"
            >
              Explore Full Catalog
            </Link>
          </div>
        </div>
      </section>

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        medicine={selectedMedicine} 
      />
    </div>
  );
};

export default Home;
