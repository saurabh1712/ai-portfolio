import { HfInference } from '@huggingface/inference';
import { HuggingFaceStream, StreamingTextResponse } from 'ai';

// Initialize the client
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// YOUR RESUME DATA
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
- Programming: Python, C++, SQL (MySQL), Bash
- ML/AI & Data Science: Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch, NLP, Neural Networks, Deep Learning, A/B Testing
- Data Engineering: Data Pipelines, Feature Engineering, Model Deployment, Data Validation
- Tools: Docker, Jenkins, Ansible, Git, AWS, Django, Linux (RHEL)

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

3. MRAC: Movie Rating & Critic System
   - Predicted audience reception with 88% accuracy using genre classification and sentiment analysis.
`;

export const runtime = 'edge';

// 1. LATENCY ENDPOINT (Keeps your footer working)
export async function GET() {
  return new Response(JSON.stringify({ status: 'System Online' }), { status: 200 });
}

// 2. CHAT ENDPOINT
export async function POST(req: Request) {
  const { messages } = await req.json();

  // Create the System Instruction
  const systemMessage = {
    role: 'system',
    content: `You are an AI assistant for Saurabh Gujar's portfolio.
    Your persona is professional, technical, and slightly robotic (Cyberpunk style).

    INSTRUCTIONS:
    - Answer questions ONLY based on the RESUME_DATA provided below.
    - Keep answers concise and metric-heavy.
    - If the answer is not in the context, say "Data unavailable in system logs."

    RESUME_DATA:
    ${RESUME_DATA}`
  };

  // FIX: Using 'HuggingFaceH4/zephyr-7b-beta' which is guaranteed to work with chatCompletion
  const response = await Hf.chatCompletionStream({
    model: 'HuggingFaceH4/zephyr-7b-beta', // v0.3 is more reliable on free tier
    messages: [systemMessage, ...messages],      // Pass the conversation history
    max_tokens: 500,
    temperature: 0.7,
  });

  // Convert the response into a friendly stream
  const stream = HuggingFaceStream(response);
  return new StreamingTextResponse(stream);
}