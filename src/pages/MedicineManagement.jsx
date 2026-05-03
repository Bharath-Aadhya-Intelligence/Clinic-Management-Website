import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getMedicines, deleteMedicine, createMedicine, updateMedicine } from '../api/medicines';
import MedicineModal from '../components/MedicineModal';

const MedicineManagement = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

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

  const handleAdd = () => {
    setSelectedMedicine(null);
    setIsModalOpen(true);
  };

  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await deleteMedicine(id);
        setMedicines(medicines.filter(m => m.id !== id));
        toast.success('Medicine deleted successfully');
      } catch (error) {
        // Error is handled by axios interceptor toast
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedMedicine) {
        await updateMedicine(selectedMedicine.id, formData);
        toast.success('Medicine updated successfully');
      } else {
        await createMedicine(formData);
        toast.success('Medicine added successfully');
      }
      fetchMedicines();
    } catch (error) {
      // Error handled by interceptor
    }
  };

  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>

        <button 
          onClick={handleAdd}
          className="flex items-center space-x-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="h-5 w-5" />
          <span>Add Medicine</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Syncing medicine vault...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm font-medium uppercase border-b border-slate-50 dark:border-slate-800">
                  <th className="px-8 py-6">Medicine</th>
                  <th className="px-8 py-6">Description</th>
                  <th className="px-8 py-6">Price</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredMedicines.map((medicine) => (
                  <tr key={medicine.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                          {medicine.image_filename ? (
                            <img 
                              src={`${import.meta.env.VITE_API_URL}/static/medicines/${medicine.image_filename}`} 
                              alt={medicine.name} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{medicine.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm text-slate-500 line-clamp-1 max-w-[200px]">
                        {medicine.description || 'No description provided'}
                      </p>
                    </td>
                    <td className="px-8 py-4 font-bold text-primary text-lg">₹{medicine.price}</td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        medicine.is_active 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {medicine.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleEdit(medicine)}
                          className="p-2.5 rounded-xl hover:bg-blue-50 text-blue-500 transition-colors"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(medicine.id)}
                          className="p-2.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredMedicines.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-slate-500">No medicines found match your search.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <MedicineModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        medicine={selectedMedicine}
      />
    </div>
  );
};

export default MedicineManagement;
