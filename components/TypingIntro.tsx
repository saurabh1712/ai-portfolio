"use client"; // <--- THIS IS THE KEY FIX
import { TypeAnimation } from 'react-type-animation';

export default function TypingIntro() {
  return (
    <TypeAnimation
      sequence={[
        'INITIALIZING: DATA_SCIENTIST_PROTOCOL',
        1500, // Wait 1.5s
        'INITIALIZING: ML_ENGINEER_PROTOCOL',
        1500,
        'INITIALIZING: AI_AGENT_ARCHITECT',
        1500,
        'INITIALIZING: MLOPS_SPECIALIST',
        1500
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="text-primary font-bold"
    />
  );
}