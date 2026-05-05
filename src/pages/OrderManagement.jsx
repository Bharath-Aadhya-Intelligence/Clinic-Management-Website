import React, { useState, useEffect } from 'react';
import { Search, Filter, EllipsisVertical, CheckCircle, Clock, PhoneCall, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAdminOrders, updateOrderStatus, clearAllOrders } from '../api/orders';
import OrderDetailModal from '../components/OrderDetailModal';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAdminOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you absolutely sure you want to clear ALL order history? This action cannot be undone.')) {
      setIsClearing(true);
      try {
        await clearAllOrders();
        setOrders([]);
        toast.success('All order history has been cleared.');
      } catch (error) {
        console.error('Failed to clear orders');
        toast.error('Failed to clear order history.');
      } finally {
        setIsClearing(false);
      }
    }
  };

  const handleUpdateStatus = async (id, newStatus, e) => {
    e.stopPropagation(); // Prevent opening modal when clicking status button
    try {
      await updateOrderStatus(id, newStatus);
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update order status');
    }
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
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
              placeholder="Search orders..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        )}

        <div className="flex gap-4">
          <button 
            onClick={handleClearHistory}
            disabled={isClearing || orders.length === 0}
            className={`flex items-center space-x-2 px-6 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${orders.length === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 shadow-red-500/10'}`}
          >
            <Trash2 className="h-5 w-5" />
            <span>{isClearing ? 'Clearing...' : 'Clear All History'}</span>
          </button>
           <button className="flex items-center space-x-2 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold hover:bg-slate-50 transition-all">
            <Filter className="h-5 w-5 text-slate-500" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm font-medium uppercase">
              <th className="px-8 py-6">Order Details</th>
              <th className="px-8 py-6">Customer Info</th>
              <th className="px-8 py-6">Medicine</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {orders.map((order) => (
              <tr 
                key={order.id} 
                onClick={() => handleRowClick(order)}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
              >
                <td className="px-8 py-6">
                  <p className="font-bold text-xs text-slate-400 group-hover:text-primary transition-colors">#{(order.id || order._id)?.substring(0, 8)}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}
                  </p>
                </td>
                <td className="px-8 py-6">
                  <p className="font-semibold">{order.customer_name}</p>
                  <p className="text-sm text-slate-500">{order.phone_number}</p>
                </td>
                <td className="px-8 py-6 text-sm font-medium">{order.medicine_name}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center w-fit space-x-1 ${order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : order.status === 'Contacted' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {order.status === 'Pending' && <Clock className="h-3 w-3" />}
                    {order.status === 'Contacted' && <PhoneCall className="h-3 w-3" />}
                    {order.status === 'Completed' && <CheckCircle className="h-3 w-3" />}
                    <span>{order.status}</span>
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-2">
                    {order.status === 'Pending' && (
                      <button 
                        onClick={(e) => handleUpdateStatus(order.id, 'Contacted', e)}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                      >
                        Mark Contacted
                      </button>
                    )}
                    {order.status === 'Contacted' && (
                      <button 
                        onClick={(e) => handleUpdateStatus(order.id, 'Completed', e)}
                        className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors"
                      >
                        Mark Completed
                      </button>
                    )}

                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                    >
                      <EllipsisVertical className="h-5 w-5" />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OrderDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderManagement;

