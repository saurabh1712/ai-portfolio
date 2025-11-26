import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function GlowingCard({ children, title, className = "" }: CardProps) {
  return (
    <div className={`group relative rounded-xl border border-white/10 bg-surface px-6 py-6 shadow-2xl overflow-hidden flex flex-col ${className}`}>

      {/* Background Gradient */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
           style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 243, 255, 0.1), transparent 40%)` }}
      />

      {/* Content Container */}
      <div className="relative h-full flex flex-col z-10 w-full">
        {title && (
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <h3 className="text-sm font-bold text-primary font-mono tracking-wider">./{title}</h3>
          </div>
        )}

        {/* CRITICAL FIX: min-h-0 allows the flex child (your list) to scroll properly */}
        <div className="flex-grow min-h-0 relative">
            {children}
        </div>
      </div>
    </div>
  );
}