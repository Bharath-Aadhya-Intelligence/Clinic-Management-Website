import React from 'react';
import Modal from 'react-modal';
import { X, User, Phone, MapPin, Package, Calendar, Tag, CheckCircle, Clock, PhoneCall } from 'lucide-react';

Modal.setAppElement('#root');

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-600';
      case 'Contacted':
        return 'bg-blue-100 text-blue-600';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Contacted':
        return <PhoneCall className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-0 overflow-hidden outline-none"
      overlayClassName="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
    >
      <div className="relative">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Order Details</h2>
              <p className="text-sm text-slate-500 font-medium">#{(order.id || order._id)?.substring(0, 12)}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Status and Date */}
          <div className="flex flex-wrap gap-4">
             <div className={`px-4 py-2 rounded-2xl text-sm font-bold flex items-center space-x-2 ${getStatusStyle(order.status)}`}>
              {getStatusIcon(order.status)}
              <span>{order.status}</span>
            </div>
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{order.order_date ? new Date(order.order_date).toLocaleString() : 'N/A'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Customer Information</h3>
              
              <div className="flex items-start space-x-4">
                <div className="mt-1 p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Full Name</p>
                  <p className="text-lg font-bold">{order.customer_name}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Phone Number</p>
                  <p className="text-lg font-bold">{order.phone_number}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Delivery Address</p>
                  <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 mt-1">
                    {order.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Medicine Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Order Items</h3>
              
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Medicine</p>
                    <p className="text-lg font-bold text-primary">{order.medicine_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Price</p>
                    <p className="text-xl font-extrabold">₹{order.medicine_price}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-slate-400 bg-white dark:bg-slate-900 w-fit px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800">
                  <Tag className="h-3 w-3 mr-1" />
                  <span>ID: {order.medicine_id}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                 <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold">Total Amount</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">₹{order.medicine_price}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
