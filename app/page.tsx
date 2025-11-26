"use client"; // Needed for the interactive components

import TypingIntro from "@/components/TypingIntro";
import techStackData from "../techstack.json";
import NeuralBackground from "@/components/NeuralBackground";
import ObjectDetector from "@/components/ObjectDetector";
import GlowingCard from "@/components/GlowingCard";
import ChatComponent from "@/components/ChatComponent";
import ProjectList from "@/components/ProjectList";
import ResumeButton from "@/components/ResumeButton";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import SystemFooter from "@/components/SystemFooter";
import { ActivityCalendar } from 'react-activity-calendar'; // Ensure correct import
import ActivityGraph from "@/components/ActivityGraph";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center p-4 md:p-8 lg:p-12 font-sans selection:bg-primary/30">
      <NeuralBackground />

      {/* 1. Header Section */}
      <header className="z-10 w-full max-w-7xl mt-8 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            SAURABH<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">GUJAR</span>
          </h1>

          <div className="flex items-center gap-2 mt-2 justify-center md:justify-start text-gray-400 font-mono text-sm md:text-base h-6">
             <Terminal size={14} className="text-success shrink-0" />
             <span className="text-success mr-2">&gt;</span>
             <TypingIntro />
          </div>
        </div>
        <ResumeButton />
      </header>

      {/* 2. The Bento Grid - "Command Center" Layout */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl w-full">

        {/* --- TOP ROW: THE "HOOK" (Interactive Demos) --- */}

        {/* A. Live Vision System */}
        <GlowingCard title="VISION_SYSTEM_V1" className="col-span-1 lg:col-span-2 h-[500px]">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-2 shrink-0">
                  <p className="text-[10px] text-success font-mono uppercase tracking-widest">[STATUS: ONLINE]</p>
              </div>
              <div className="flex-grow rounded border border-white/10 bg-black relative min-h-0">
                <ObjectDetector />
              </div>
            </div>
        </GlowingCard>

        {/* B. AI Chat Interface (Moved Up!) */}
        <GlowingCard title="AI_AGENT_INTERFACE" className="col-span-1 lg:col-span-2 h-[500px]">
            <ChatComponent />
        </GlowingCard>


        {/* --- MIDDLE ROW: THE "DATA" (Profile & Skills) --- */}

        {/* C. Identity */}
        <GlowingCard title="IDENTITY" className="col-span-1 lg:col-span-1 h-[350px]">
           <div className="flex flex-col justify-between h-full gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-300 leading-relaxed font-mono">
                    <span className="text-primary font-bold">MS Applied ML @ UMD ('27)</span><br/>
                    5+ Years Exp. Ranked 1st in Undergrad.
                </p>
                <p className="text-xs text-gray-500 font-mono">
                   Ex-Cohesity & Veritas. Seeking Summer 2026 Data Science Internships.
                </p>
              </div>
              <div className="flex gap-4 items-end mt-auto">
                <a href="https://linkedin.com/in/saurabh-gujar" target="_blank" className="p-2 bg-white/5 rounded-full hover:text-white hover:bg-white/10 transition-all text-gray-400"><Linkedin size={18}/></a>
                <a href="mailto:saurabhgujar17@gmail.com" className="p-2 bg-white/5 rounded-full hover:text-white hover:bg-white/10 transition-all text-gray-400"><Mail size={18}/></a>
                <a href="https://github.com/saurabh1712" target="_blank" className="p-2 bg-white/5 rounded-full hover:text-white hover:bg-white/10 transition-all text-gray-400"><Github size={18}/></a>
              </div>
           </div>
        </GlowingCard>

        {/* D. Tech Stack */}
        <GlowingCard title="TECH_STACK" className="col-span-1 lg:col-span-1 h-[350px]">
          <ul className="h-full space-y-3 text-xs text-gray-300 font-mono overflow-y-auto custom-scrollbar pr-2 pb-2">
            {techStackData.map((skill) => (
              <li key={skill.name} className="flex justify-between items-center border-b border-gray-800 pb-2 shrink-0">
                <span className="truncate pr-2">{skill.name}</span>
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden shrink-0">
                    <div className="h-full bg-primary/70" style={{ width: `${skill.level}%` }}></div>
                </div>
              </li>
            ))}
          </ul>
        </GlowingCard>

        {/* E. Projects Archive */}
        <GlowingCard title="PROJECT_DATABASE" className="col-span-1 md:col-span-2 lg:col-span-2 h-[350px]">
           <ProjectList />
        </GlowingCard>


        {/* --- BOTTOM ROW: THE "PROOF" (Activity) --- */}
        {/* F. GitHub Activity Graph */}
        <GlowingCard title="CODING_ACTIVITY_LOG" className="col-span-1 md:col-span-2 lg:col-span-4 h-[220px]">
           <ActivityGraph />
        </GlowingCard>

      </div>

      <SystemFooter />
    </main>
  );
}