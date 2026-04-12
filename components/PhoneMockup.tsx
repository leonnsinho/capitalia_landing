import React from 'react';

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl ${className}`}>
      {/* Side buttons */}
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      
      {/* Screen */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800 relative">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[24px] w-[100px] bg-black z-20 rounded-b-xl flex justify-center items-center">
             <div className="w-16 h-4 bg-black rounded-full relative">
                <div className="absolute right-2 top-1 w-2 h-2 rounded-full bg-gray-800/50"></div>
             </div>
        </div>
        
        {/* Status Bar Mock */}
        <div className="w-full h-8 bg-white absolute top-0 left-0 z-10 flex justify-between px-6 items-center text-[10px] font-bold text-gray-800">
            <span>9:41</span>
            <div className="flex gap-1">
                <div className="w-4 h-2 bg-gray-800 rounded-sm"></div>
                <div className="w-3 h-2 bg-gray-800 rounded-sm"></div>
            </div>
        </div>

        {/* Content */}
        <div className="w-full h-full pt-8 overflow-y-auto hide-scrollbar bg-gray-50">
           {children}
        </div>
      </div>
    </div>
  );
};