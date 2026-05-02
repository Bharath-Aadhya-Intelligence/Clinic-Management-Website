import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
    e.target.reset();
  };

  const contactInfo = [
    { icon: Phone, title: 'Call Us', detail: '+91 98765 43210', sub: 'Mon-Sat, 9am - 6pm' },
    { icon: Mail, title: 'Email Us', detail: 'info@homeocare.com', sub: '24/7 Support' },
    { icon: MapPin, title: 'Visit Us', detail: '123 Healing St, City', sub: 'Wellness District' },
  ];

  return (
    <div className="pt-24 pb-24 min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Have questions? Our team is here to help you on your path to natural wellness.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-6 p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-lg">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary shrink-0">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-slate-900 dark:text-white font-semibold">{item.detail}</p>
                  <p className="text-sm text-slate-400 mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
            
            <div className="p-8 rounded-[2rem] bg-slate-900 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Clinic Hours</h3>
              </div>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex justify-between"><span>Monday - Friday</span> <span>09:00 AM - 07:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 04:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span className="text-red-400 font-bold">Closed</span></li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Send us a message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 ml-1">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1">Subject</label>
                  <input required type="text" placeholder="Appointment Inquiry" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1">Your Message</label>
                  <textarea required rows="5" placeholder="How can we help you?" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"></textarea>
                </div>
                <button type="submit" className="w-full md:w-auto px-12 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
