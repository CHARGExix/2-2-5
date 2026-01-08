'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTransform, useMotionValueEvent, useSpring, MotionValue } from 'framer-motion';

interface ScrollSequenceProps {
    progress: MotionValue<number>;
    frames: number;
    imagesPath: string; // e.g. "/burger/ezgif-frame-"
    imageExtension?: string; // e.g. ".jpg"
    padZeros?: number; // e.g. 3 for 001, 002
}

const ScrollSequence: React.FC<ScrollSequenceProps> = ({
    progress,
    frames,
    imagesPath,
    imageExtension = '.jpg',
    padZeros = 3,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);

    // Smooth out the scroll progress for smoother animation
    const smoothProgress = useSpring(progress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let count = 0;

        for (let i = 1; i <= frames; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(padZeros, '0');
            const src = `${imagesPath}${paddedIndex}${imageExtension}`;

            img.src = src;
            img.onload = () => {
                count++;
                setLoadedCount(count);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [frames, imagesPath, imageExtension, padZeros]);

    // Draw frame
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Handle high DPI
        const dpr = window.devicePixelRatio || 1;

        // Set canvas dimensions to match window (or parent)
        // We want the canvas to cover the screen
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        // Scale context to match dpr
        ctx.scale(dpr, dpr);

        // Style width/height
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Draw image "cover" style
        const imgAspect = img.width / img.height;
        const canvasAspect = width / height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
            drawWidth = width;
            drawHeight = width / imgAspect;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
        } else {
            drawWidth = height * imgAspect;
            drawHeight = height;
            offsetX = (width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (images.length === 0) return;

        // Map 0-1 to 0-(frames-1)
        const frameIndex = Math.min(
            frames - 1,
            Math.floor(latest * frames)
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial draw when images load or resize
    useEffect(() => {
        if (images.length > 0 && loadedCount > 0) {
            // Draw the first frame initially
            renderFrame(0);
        }

        const handleResize = () => {
            // Re-draw current frame on resize
            const currentProgress = smoothProgress.get();
            const frameIndex = Math.min(
                frames - 1,
                Math.floor(currentProgress * frames)
            );
            renderFrame(frameIndex);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [loadedCount, images]);


    return (
        <>
            <canvas ref={canvasRef} className="block w-full h-full object-cover" />

            {/* Loading Indicator */}
            {loadedCount < frames && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white z-50 transition-opacity duration-500">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        <p className="font-mono text-xs tracking-widest opacity-80">LOADING {Math.round((loadedCount / frames) * 100)}%</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ScrollSequence;
