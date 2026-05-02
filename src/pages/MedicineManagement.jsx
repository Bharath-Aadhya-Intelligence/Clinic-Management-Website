import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getMedicines, deleteMedicine } from '../api/medicines';

const MedicineManagement = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await deleteMedicine(id);
        setMedicines(medicines.filter(m => m.id !== id));
        toast.success('Medicine deleted successfully');
      } catch (error) {
        console.error('Failed to delete medicine');
      }
    }
  };


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {loading ? (
          <div className="flex items-center justify-center w-full py-20">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search catalog..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        )}

        <button className="flex items-center space-x-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
          <Plus className="h-5 w-5" />
          <span>Add Medicine</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm font-medium uppercase">
              <th className="px-8 py-6">Image</th>
              <th className="px-8 py-6">Name</th>
              <th className="px-8 py-6">Category</th>
              <th className="px-8 py-6">Price</th>
              <th className="px-8 py-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {medicines.map((medicine) => (
              <tr key={medicine.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-8 py-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-slate-400" />
                  </div>
                </td>
                <td className="px-8 py-4 font-bold">{medicine.name}</td>
                <td className="px-8 py-4 text-sm text-slate-500">{medicine.category}</td>
                <td className="px-8 py-4 font-semibold text-primary">₹{medicine.price}</td>
                <td className="px-8 py-4">
                  <div className="flex items-center space-x-3">
                    <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(medicine.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineManagement;
