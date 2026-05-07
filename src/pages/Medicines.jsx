import React, { useState, useEffect } from 'react';
import MedicineCard from '../components/MedicineCard';
import OrderModal from '../components/OrderModal';
import { Search, Filter, Loader2, Sparkles } from 'lucide-react';
import { getMedicines } from '../api/medicines';
import MedicineSkeleton from '../components/MedicineSkeleton';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    // Try to load from cache first
    const cachedMedicines = localStorage.getItem('medicines_cache');
    if (cachedMedicines) {
      try {
        const parsed = JSON.parse(cachedMedicines);
        if (parsed && Array.isArray(parsed)) {
          setMedicines(parsed);
          setLoading(false); // If we have cache, we can stop the initial spinner
        }
      } catch (e) {
        console.error('Failed to parse cached medicines', e);
      }
    }
    
    fetchMedicines();

    // Show "Slow Load" message after 3 seconds
    const timer = setTimeout(() => {
      setIsSlow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const fetchMedicines = async () => {
    try {
      const data = await getMedicines();
      setMedicines(data);
      // Update cache
      localStorage.setItem('medicines_cache', JSON.stringify(data));
      setIsSlow(false);
    } catch (error) {
      console.error('Failed to fetch medicines');
    } finally {
      setLoading(false);
    }
  };


  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrder = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Medicine Catalog</h1>
            <p className="text-slate-500 text-lg">
              Explore our wide range of authentic homeopathic remedies. All our medicines are prepared under strict quality standards.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search remedies..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
              />
            </div>
            <button className="flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition-colors">
              <Filter className="h-5 w-5 text-slate-500" />
              <span className="font-semibold">Filters</span>
            </button>
          </div>
        </div>

        {/* Catalog Grid */}
        {loading && medicines.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <MedicineSkeleton key={i} />
            ))}
          </div>
        ) : loading && medicines.length > 0 ? (
          /* Background loading state when we have cached data */
          <>
            <div className="flex items-center justify-center mb-8 space-x-2 animate-pulse">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Updating Catalog...</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 opacity-70">
              {filteredMedicines.map((medicine) => (
                <MedicineCard 
                  key={medicine.id} 
                  medicine={medicine} 
                  onOrder={handleOrder} 
                />
              ))}
            </div>
          </>
        ) : filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredMedicines.map((medicine) => (
              <MedicineCard 
                key={medicine.id} 
                medicine={medicine} 
                onOrder={handleOrder} 
              />
            ))}
          </div>
        ) : (

          <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-300 dark:border-slate-800">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">No remedies found</h3>
            <p className="text-slate-500">Try searching with a different name or browse the full catalog.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-6 text-primary font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {isSlow && loading && (
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-3xl flex items-center space-x-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 dark:text-blue-100">Almost there!</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Our server is waking up to bring you the latest remedies. This usually takes a few extra seconds on the first load.
              </p>
            </div>
          </div>
        )}
      </section>

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        medicine={selectedMedicine} 
      />
    </div>
  );
};

export default Medicines;
