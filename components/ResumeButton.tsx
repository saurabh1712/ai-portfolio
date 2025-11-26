import { FileText } from "lucide-react";

export default function ResumeButton() {
  return (
    <a
      // LINK TO THE RENAMED FILE
      href="/Saurabh_Gujar_AI_ML_Engineer_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-bold tracking-widest text-black transition-all duration-300 bg-primary rounded-sm hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
    >
      <span className="relative z-10 flex items-center gap-2">
        {/* The button text can stay short and clean */}
        DOWNLOAD_RESUME.PDF
      </span>
    </a>
  );
}