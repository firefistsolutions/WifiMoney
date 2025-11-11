"use client";

import React, { useRef, useEffect } from "react";

type VideoBackgroundProps = {
  src: string;
  poster?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function VideoBackground({ src, poster, children, className }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const setPlaybackRate = () => {
        video.playbackRate = 0.5;
      };
      
      // Set immediately if video is already loaded
      if (video.readyState >= 2) {
        setPlaybackRate();
      }
      
      // Also set when video loads
      video.addEventListener('loadeddata', setPlaybackRate);
      
      return () => {
        video.removeEventListener('loadeddata', setPlaybackRate);
      };
    }
  }, []);

  return (
    <div className={`relative h-[calc(100vh-4rem)] min-h-[500px] sm:min-h-[600px] md:h-[calc(100vh-4rem)] w-full overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        className="absolute left-0 top-0 h-full w-full object-cover"
      >
        <source src={src.startsWith('/') ? src : `/${src}`} type="video/mp4" />
        {/* Add a fallback source for broader compatibility, e.g., WebM */}
        {/* <source src={".webm"} type="video/webm" /> */}
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      <div className="relative z-10 h-full w-full flex items-center">{children}</div>
    </div>
  );
}



