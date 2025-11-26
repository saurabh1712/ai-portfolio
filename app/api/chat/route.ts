import { google } from '@ai-sdk/google';
import { StreamingTextResponse, streamText } from 'ai';

// UPDATED: YOUR REAL RESUME DATA
const RESUME_DATA = `
NAME: Saurabh Gujar
LOCATION: College Park, MD
PHONE: +1(669) 869-6901
EMAIL: saurabhgujar17@gmail.com
LINKEDIN: www.linkedin.com/in/saurabh-gujar

SUMMARY:
Versatile MS Applied Machine Learning candidate (UMD ’27) with 5+ years of engineering experience bridging Data Science, MLOps, and AI Agent development. Proven track record of deploying scalable ML pipelines and Agentic Workflows in enterprise environments (Cohesity, Veritas). Expertise spans deep data analysis, end-to-end model deployment, and optimizing production AI systems for performance and reliability. Seeking Summer 2026 opportunities in AI/ML Engineering or Data Science.

EDUCATION:
1. University of Maryland, College Park (Expected May 2027)
   - Masters in Applied Machine Learning
2. University of Pune, India (May 2020)
   - Bachelor of Computer Engineering
   - GPA: 9.67/10
   - Honors: Ranked 1st in the Department

SKILLS:
- Languages: Python (Expert), C++, SQL, Bash, JavaScript/TypeScript
- Generative AI & LLMs: LangChain, RAG, Hugging Face, LlamaIndex, Vector DBs, Prompt Engineering, Multi-Agent Systems
- Machine Learning & DL: PyTorch, TensorFlow, Scikit-learn, XGBoost, Computer Vision (YOLO, OpenCV), NLP (BERT)
- MLOps & Cloud: AWS, Docker, Kubernetes, Jenkins, Ansible, CI/CD for ML
- Data Science: A/B Testing, Hypothesis Testing, Pandas, NumPy, Matplotlib, Seaborn, Data Visualization

PROFESSIONAL EXPERIENCE:
1. Cohesity - Member of Technical Staff QA 3 (Dec 2024 – Jul 2025, Pune)
   - Designed ML-driven data pipelines for automated defect triage, reducing manual analysis by 45%.
   - Saved 20+ engineer hours per release cycle through 90% automation of test triggers.
   - Developed Python-based pipelines for distributed filesystems, optimizing VM-to-test runtime by 30%.
   - Conducted EDA on kernel crash dumps, reducing critical bug resolution time by 25%.

2. Veritas Technologies LLC - Software QA Engineer (Jul 2020 – Dec 2024, Pune)
   - Designed fault-injection data pipelines, capturing 32% more defects during upgrades and 60% more during rollbacks.
   - Automated data validation in Python, boosting code coverage from 47% to 70%.
   - Directed ML-driven testing strategies for anomaly detection and malware scanning.
   - Elevated automation standards using Jenkins, Docker, and Ansible.

PROJECTS:
1. Agentic LLM Workflow for Application Lifecycle Management (Nov 2025)
   - Engineered a multi-agent orchestration pipeline with a Judge-Evaluator loop.
   - Achieved 90%+ ATS scores using first-principle thinking to eliminate LLM hallucinations.
   - Architected a Human-in-the-Loop system for asynchronous batch processing.

2. Auto Triage: Automated Defect Classification & Reporting with ML (Aug 2021)
   - Developed a supervised ML framework achieving 82% accuracy.
   - Utilized Web Scraping (BeautifulSoup) and image processing.

3. MRAC: Movie Rating & Critic System (Aug 2018)
   - Predicted audience reception with 88% accuracy using genre classification and sentiment analysis.
   - Elevated automation standards using Jenkins, Docker, Ansible, and Linux to streamline ML workflow automation, CI/CD, and robust data pipelines, supporting efficient model deployment.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('models/gemini-2.5-flash'),
    system: `You are an AI assistant for Saurabh Gujar's portfolio.
    Your persona is professional, technical, and slightly robotic (Cyberpunk style).

    INSTRUCTIONS:
    - Answer questions ONLY based on the RESUME_DATA provided below.
    - If asked about "Experience," highlight the metrics (e.g., "reduced manual analysis by 45%").
    - If asked about "Skills," list the specific tools (e.g., Python, TensorFlow, Docker).
    - Keep answers concise and metric-heavy.
    - If the answer is not in the context, say "Data unavailable in system logs."

    RESUME_DATA:
    ${RESUME_DATA}`,
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
}

// A lightweight "Health Check" endpoint for latency monitoring
export async function GET() {
  return new Response(JSON.stringify({ status: 'System Online' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}