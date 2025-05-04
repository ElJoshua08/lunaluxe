"use client";

import { Logo } from "@/components/icons/logo";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const Starfield = ({ count }: { count: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const maxDistance = Math.sqrt(width ** 2 + height ** 2) / 2;
    const minDistance = maxDistance * 0.15;

    const stars = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance =
        Math.sqrt(Math.random()) * (maxDistance - minDistance) + minDistance;

      return {
        angle,
        distance,
        radius: Math.random() * 1.6 + 0.9,
        delay: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.00005 + 0.00005, 
      };
    });

    let frameId: number;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();

      const centerX = width / 2;
      const centerY = height / 2;
      ctx.translate(centerX, centerY);

      const globalRotation = time / 50000; // rotación global lenta

      for (const star of stars) {
        const personalRotation =
          star.angle + globalRotation + time * star.speed;
        const x = Math.cos(personalRotation) * star.distance;
        const y = Math.sin(personalRotation) * star.distance;
        const alpha = 0.2 + 0.5 * Math.sin(time / 500 + star.delay);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = theme === "dark" ? "#ffffff" : "#000000";
        ctx.fill();
      }

      ctx.restore();
      frameId = requestAnimationFrame(render);
    };

    render(0);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [count, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{
        pointerEvents: "none",
      }}
    />
  );
};


export const Loading = ({
  size,
}: {
  size?: "sm" | "md" | "lg" | "fullscreen";
}) => {
  const sizeClasses = {
    sm: "size-6",
    md: "size-10",
    lg: "size-16",
    fullscreen: "size-32",
  };

  const logoSize = sizeClasses[size || "md"];

  return size === "fullscreen" ? (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background/80 backdrop-blur-sm">
      <Starfield count={450} />
      <div className="relative z-10 flex items-center justify-center">
        <div className="absolute size-96 animate-ping rounded-full bg-foreground/20 backdrop-blur-xl delay-500 animate-duration-[1500ms]" />
        <Logo
          className={`z-20 size-72 animate-spin fill-foreground animate-duration-[1500ms] animate-ease-in-out`}
        />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <Logo className={`${logoSize} animate-spin fill-foreground`} />
    </div>
  );
};
