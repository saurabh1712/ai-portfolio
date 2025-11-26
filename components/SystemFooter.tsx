"use client"; // This makes the hooks work!
import { useState, useEffect } from "react";

export default function SystemFooter() {
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const checkSystemHealth = async () => {
      const start = Date.now();
      try {
        await fetch('/api/chat'); // Pings the health check endpoint
        const end = Date.now();
        setLatency(end - start);
      } catch (err) {
        setLatency(null);
      }
    };

    checkSystemHealth();
    const interval = setInterval(checkSystemHealth, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-20 pb-8 z-10 text-gray-700 text-xs font-mono text-center w-full">
      <div className="flex justify-center items-center gap-4">
        <span>SYSTEM ID: 8492-AX</span>
        <span className="text-gray-800">|</span>

        {/* LATENCY INDICATOR */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            latency === null ? 'bg-red-500' :
            latency < 200 ? 'bg-success animate-pulse' :
            'bg-yellow-500'
          }`}></div>

          <span className={
            latency === null ? 'text-red-500' :
            latency < 200 ? 'text-success' :
            'text-yellow-500'
          }>
            LATENCY: {latency ? `${latency}ms` : 'PINGING...'}
          </span>
        </div>

        <span className="text-gray-800">|</span>
        <span>© 2025</span>
      </div>
    </footer>
  );
}