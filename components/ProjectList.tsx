import { ArrowUpRight, GitFork } from "lucide-react";
// 1. Import the data file
import projectsData from "../projects.json";

export default function ProjectList() {
  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto custom-scrollbar pr-2 pb-4">
      {/* 2. Map through the imported data */}
      {projectsData.map((p, i) => (
        <a
          key={i}
          href={p.link}
          target="_blank"
          className="group block p-4 rounded bg-white/5 hover:border-l-2 hover:border-l-primary hover:bg-white/10 transition-all shrink-0"
        >
          <div className="flex justify-between items-start">
            <h4 className="text-white font-bold font-mono text-sm group-hover:text-primary">
              {p.name}
            </h4>
            <ArrowUpRight size={14} className="text-gray-600 group-hover:text-primary" />
          </div>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            {p.desc}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {p.tags.map((tag) => (
              <span key={tag} className="text-[10px] bg-black px-2 py-0.5 rounded text-gray-500 border border-gray-800 flex items-center gap-1">
                <GitFork size={8}/> {tag}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}