"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    class Leaf {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 1 + 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.color = `rgba(${Math.floor(
          100 + Math.random() * 50
        )}, ${Math.floor(150 + Math.random() * 50)}, ${Math.floor(
          50 + Math.random() * 50
        )}, 0.7)`;
        this.opacity = 0.1 + Math.random() * 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
          this.y = -this.size;
          this.x = Math.random() * canvas.width;
        }

        if (this.x < -this.size) {
          this.x = canvas.width;
        } else if (this.x > canvas.width + this.size) {
          this.x = -this.size;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${Math.floor(
          50 + Math.random() * 30
        )}, ${Math.floor(100 + Math.random() * 30)}, ${Math.floor(
          30 + Math.random() * 20
        )}, 0.5)`;
        ctx.lineWidth = 1;
        ctx.moveTo(-this.size, 0);
        ctx.lineTo(this.size, 0);
        ctx.stroke();

        ctx.restore();
      }
    }

    const leaves: Leaf[] = [];
    const leafCount = Math.floor(window.innerWidth / 100);

    for (let i = 0; i < leafCount; i++) {
      leaves.push(new Leaf());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach((leaf) => {
        leaf.update();
        leaf.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
