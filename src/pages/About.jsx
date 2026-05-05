import React from 'react';
import { Target, Eye, Award, CheckCircle2 } from 'lucide-react';
import doctorImg from '../assets/doctor.png';

const About = () => {
  const milestones = [
    { year: '2004', event: 'Homeopathy Hospital Founded' },
    { year: '2010', event: 'Reached 5,000 Treated Patients' },
    { year: '2015', event: 'Best Alternative Medicine Clinic Award' },
    { year: '2022', event: 'Launched Online Medicine Catalog' },
  ];

  return (
    <div className="pt-24 pb-24">
      {/* Page Header */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story & Legacy</h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            Healing humanity through nature since 2004. Discover the journey of Homeopathy Hospital and our commitment to holistic health.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">A Legacy of Excellence</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Founded in 2004 by Dr. S. K. Sharma, Homeopathy Hospital began as a small clinic with a big vision: to make high-quality homeopathic care accessible to everyone. 
              </p>
              <p>
                Over the past two decades, we have grown into a multi-specialty homeopathic center, treating everything from common allergies to chronic autoimmune conditions. Our approach combines the traditional laws of homeopathy with modern diagnostic insights.
              </p>
              <p>
                We believe that every patient is unique. That's why we spend time understanding your physical, mental, and emotional health before prescribing a remedy.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
              alt="Hospital Interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-primary/5 py-24 mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl shadow-sm border border-primary/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To provide compassionate, evidence-based homeopathic treatment that empowers patients to achieve lasting health and vitality naturally.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl shadow-sm border border-secondary/10">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8">
                <Eye className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To be a global leader in homeopathic healthcare, recognized for our innovative research, clinical excellence, and patient-centric approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet Our Chief Doctor</h2>
          <p className="text-slate-500">Leading the way in holistic medicine.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center shadow-2xl">
          <div className="w-full md:w-1/2 h-[400px]">
            <img src={doctorImg} alt="Dr. Sharma" className="w-full h-full object-cover object-top" />
          </div>
          <div className="w-full md:w-1/2 p-12 text-white">
            <div className="inline-block px-3 py-1 bg-primary rounded-full text-xs font-bold mb-4 uppercase tracking-tighter">Chief Administrator</div>
            <h3 className="text-3xl font-bold mb-2">Dr. Priya Sharma</h3>
            <p className="text-primary-light font-medium mb-6">BHMS, MD (Homeopathy), 18+ Years Exp.</p>
            <p className="text-slate-400 leading-relaxed mb-8">
              "My goal is not just to treat the disease, but to treat the person who has the disease. Every remedy we provide is a step towards total wellness."
            </p>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <Award className="h-4 w-4 text-primary" />
                <span>Gold Medalist</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Verified Expert</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Our Milestones</h2>
        </div>
        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0 md:flex md:border-l-0 md:border-t-2 md:pt-12">
          {milestones.map((item, idx) => (
            <div key={idx} className="mb-10 ml-8 md:mb-0 md:ml-0 md:flex-1 relative">
              <div className="absolute -left-[35px] md:-left-0 md:-top-[55px] w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-slate-950"></div>
              <div className="md:pr-8">
                <span className="text-primary font-bold text-xl mb-2 block">{item.year}</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
