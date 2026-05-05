import React, { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';

const MedicineModal = ({ isOpen, onClose, onSave, medicine = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name || '',
        price: medicine.price || '',
        description: medicine.description || '',
      });
      if (medicine.image_data) {
        setPreview(medicine.image_data);
      } else if (medicine.image_filename) {
        setPreview(`${import.meta.env.VITE_API_URL}/static/medicines/${medicine.image_filename}`);
      }
    } else {
      setFormData({ name: '', price: '', description: '' });
      setImage(null);
      setPreview(null);
    }
  }, [medicine, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    if (image) {
      data.append('image', image);
    }

    try {
      await onSave(data);
      onClose();
    } catch (error) {
      console.error('Failed to save medicine');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold">{medicine ? 'Edit Medicine' : 'Add New Medicine'}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500 ml-1">Medicine Image</label>
            <div className="relative group cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                required={!medicine}
              />
              <div className={`w-full h-48 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden
                ${preview ? 'border-primary' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'}`}>
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-2 group-hover:scale-110 transition-transform">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-slate-500">Upload high-quality image</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 ml-1">Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Arnica 30C"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 ml-1">Price (₹)</label>
              <input 
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="0.00"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500 ml-1">Description (Optional)</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Tell us more about this remedy..."
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none h-32"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center space-x-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span>{medicine ? 'Update' : 'Add'} Medicine</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicineModal;
