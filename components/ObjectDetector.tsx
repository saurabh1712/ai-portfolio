"use client";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export default function ObjectDetector() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Main function to load model and start detection
  const runCoco = async () => {
    try {
      // 1. Wait for TensorFlow to be ready
      await tf.ready();
      console.log("TensorFlow Ready");

      // 2. Load the model
      const net = await cocoSsd.load();
      console.log("Model Loaded");
      setIsLoading(false);

      // 3. Start the detection loop
      const detectLoop = setInterval(() => {
        detect(net);
      }, 100); // 10FPS

      return () => clearInterval(detectLoop);
    } catch (err) {
      console.error("Failed to load model:", err);
      setError("Failed to load AI Model");
      setIsLoading(false);
    }
  };

  const detect = async (net: cocoSsd.ObjectDetection) => {
    // Check if webcam is ready and has video data
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 &&
      canvasRef.current
    ) {
      const video = webcamRef.current.video;
      const { videoWidth, videoHeight } = video;

      // Force video and canvas to match dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Detect objects
      const obj = await net.detect(video);

      // Draw bounding boxes
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        // Clear the canvas so we can see the video behind it! (CRITICAL FIX)
        ctx.clearRect(0, 0, videoWidth, videoHeight);

        obj.forEach((prediction) => {
          const [x, y, width, height] = prediction.bbox;
          const text = prediction.class;

          // Box Color (Cyberpunk Green)
          ctx.strokeStyle = "#00ff41";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);

          // Label Background
          ctx.fillStyle = "#00ff41";
          ctx.fillRect(x, y, width > 100 ? width : 100, 20);

          // Text
          ctx.fillStyle = "#000000";
          ctx.font = "bold 16px Courier New";
          ctx.fillText(
            `${text.toUpperCase()} ${Math.round(prediction.score * 100)}%`,
            x + 5,
            y + 15
          );
        });
      }
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] bg-black rounded-lg overflow-hidden flex items-center justify-center">

      {/* FALLBACK UI: If Camera is blocked or fails */}
      {error && (
         <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 border border-red-500/30 p-4 text-center">
            <div className="text-red-500 font-mono text-4xl mb-4">⚠️</div>
            <p className="text-red-400 font-mono text-sm font-bold">VISUAL SENSORS OFFLINE</p>
            <p className="text-gray-500 text-xs mt-2 max-w-[200px]">
              Camera access denied. Neural Net is in standby mode.
            </p>
         </div>
      )}

      {/* LOADING SPINNER */}
      {isLoading && (
        <div className="absolute z-50 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-primary font-mono text-xs animate-pulse">LOADING VISION ENGINE...</p>
        </div>
      )}

      {/* WEBCAM LAYER - FIX: Changed object-cover to object-contain */}
      <Webcam
        ref={webcamRef}
        muted={true}
        className="absolute inset-0 w-full h-full object-contain z-10"
      />

      {/* CANVAS LAYER - FIX: Changed object-cover to object-contain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
      />
    </div>
  );
}