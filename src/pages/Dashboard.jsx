import React, { useState, useEffect } from 'react';
import { ShoppingBag, ListChecks, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { getTodayStats, getMonthlyStats } from '../api/analytics';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [today, monthly] = await Promise.all([
        getTodayStats(),
        getMonthlyStats()
      ]);
      
      setStats([
        { name: 'Today\'s Visits', value: today.count, icon: ListChecks, color: 'bg-blue-500' },
        { name: 'Monthly Visits', value: monthly.total_visits, icon: TrendingUp, color: 'bg-emerald-500' },
        { name: 'Total Medicines', value: '...', icon: ShoppingBag, color: 'bg-purple-500' }, // This could come from medicines API
        { name: 'Pending Orders', value: '...', icon: Clock, color: 'bg-orange-500' }, // This could come from orders API
      ]);
    } catch (error) {
      console.error('Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };


  const recentOrders = [
    { id: '#ORD-7712', customer: 'Rahul Verma', medicine: 'Arnica Montana', status: 'Pending', date: '2 mins ago' },
    { id: '#ORD-7711', customer: 'Anita Singh', medicine: 'Nux Vomica', status: 'Contacted', date: '1 hour ago' },
    { id: '#ORD-7710', customer: 'Suresh Kumar', medicine: 'Belladonna', status: 'Completed', date: '3 hours ago' },
    { id: '#ORD-7709', customer: 'Meena Devi', medicine: 'Rhus Tox', status: 'Completed', date: '5 hours ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.color} text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      )}


      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Orders</h3>
            <button className="text-primary font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm font-medium uppercase">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Medicine</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-8 py-4 font-bold text-sm">{order.id}</td>
                    <td className="px-8 py-4 text-sm">{order.customer}</td>
                    <td className="px-8 py-4 text-sm">{order.medicine}</td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : order.status === 'Contacted' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-xs text-slate-400">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center justify-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Add New Medicine</span>
            </button>
            <button className="w-full py-4 rounded-2xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center space-x-2">
              <ListChecks className="h-5 w-5 text-slate-500" />
              <span>Generate Order Report</span>
            </button>
          </div>
          
          <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold mb-2">Hospital Tip</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Ensure all pending orders are contacted within 24 hours to maintain high patient satisfaction scores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
