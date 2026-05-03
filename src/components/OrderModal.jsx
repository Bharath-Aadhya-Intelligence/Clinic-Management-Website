import React, { useState } from 'react';
import Modal from 'react-modal';
import { X, CheckCircle, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { placeOrder } from '../api/orders';

Modal.setAppElement('#root');

const OrderModal = ({ isOpen, onClose, medicine }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setIsSubmitting(true);
    try {
      await placeOrder({
        customer_name: formData.name,
        phone_number: formData.phone,
        address: formData.address,
        medicine_id: medicine.id,
        medicine_name: medicine.name,
        medicine_price: medicine.price
      });
      setIsSubmitted(true);
      toast.success('Our team will contact you within two days.');
    } catch (error) {
      console.error('Order placement failed');
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!medicine) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-0 overflow-hidden outline-none"
      overlayClassName="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
    >
      <div className="relative p-8 pt-12">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Order Medicine</h2>
                <p className="text-slate-500">You are ordering <span className="text-primary font-bold">{medicine.name}</span></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Full Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Delivery Address</label>
                <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Street name, landmark, city, pincode"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 transition-all active:scale-95 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
                >
                  {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Order Received!</h2>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto text-lg font-medium">
              Our team will contact you within two days.
            </p>
            <button
              onClick={onClose}
              className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-bold transition-all hover:bg-slate-800"
            >
              Back to Catalog
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default OrderModal;
