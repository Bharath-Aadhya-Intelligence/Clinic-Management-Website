import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';

const MedicineCard = ({ medicine, onOrder }) => {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-all hover:shadow-2xl hover:-translate-y-2">
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={medicine.image_data 
            ? medicine.image_data 
            : medicine.image_filename 
              ? `${import.meta.env.VITE_API_URL}/static/medicines/${medicine.image_filename}` 
              : medicine.id % 2 === 0 
                ? '/medicines/remedy1.png' 
                : '/medicines/remedy2.png'} 
          alt={medicine.name} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            // Robust fallback to a varied high-quality unsplash image if local fails
            e.target.src = `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500&sig=${medicine.id || medicine.name}`;
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full shadow-sm">
            In Stock
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{medicine.name}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {medicine.description || "Effective homeopathic remedy for natural healing and wellness."}
        </p>
        
        <div className="flex items-center justify-between mt-6">
          <div>
            <span className="text-sm text-slate-400 block">Price</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">₹{medicine.price}</span>
          </div>
          <button 
            onClick={() => onOrder(medicine)}
            className="flex items-center space-x-2 px-5 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Order Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
