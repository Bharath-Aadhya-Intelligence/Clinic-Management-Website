import React, { useState, useEffect } from 'react';
import MedicineCard from '../components/MedicineCard';
import OrderModal from '../components/OrderModal';
import { Search, Filter, Loader2 } from 'lucide-react';
import { getMedicines } from '../api/medicines';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const data = await getMedicines();
      setMedicines(data);
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading our natural remedies...</p>
          </div>
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
