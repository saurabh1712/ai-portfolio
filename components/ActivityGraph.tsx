"use client";
import React, { useEffect, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';

export default function ActivityGraph() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // REPLACE THIS WITH YOUR GITHUB USERNAME
  const username = "saurabh1712";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        const json = await response.json();

        if (json.contributions) {
          setData(json.contributions);
        }
      } catch (error) {
        console.error("Failed to load GitHub data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-xs font-mono text-gray-500 animate-pulse">
        LOADING_CONTRIBUTION_DATA...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full h-full p-4 overflow-hidden">
      <ActivityCalendar
        data={data}
        theme={{
          light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
          dark: ['#1f1f1f', '#0e4429', '#006d32', '#00f3ff', '#ffffff'],
        }}
        labels={{
          totalCount: '{{count}} contributions in the last year',
        }}
        colorScheme="dark"
        blockSize={12}
        blockMargin={4}
      />
    </div>
  );
}