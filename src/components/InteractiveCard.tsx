'use client';

import React, { useState, ReactNode } from 'react';

type InteractiveCardProps = {
  children: ReactNode;
  className?: string;
};

export default function InteractiveCard({ children, className = "" }: InteractiveCardProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div 
      className={`${isHover ? 'shadow-2xl bg-neutral-200' : 'shadow-lg bg-white'} 
        rounded-lg transition-all duration-300 w-full md:w-64 h-[300px] text-black ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
    </div>
  );
}