import React from 'react';

const MedicineSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-pulse">
      <div className="aspect-square bg-slate-200 dark:bg-slate-800" />
      <div className="p-6">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 mb-4" />
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-5/6" />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="space-y-1">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-8" />
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-16" />
          </div>
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-32" />
        </div>
      </div>
    </div>
  );
};

export default MedicineSkeleton;
