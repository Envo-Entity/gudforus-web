"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, VolumeX, Volume2, Maximize, Minimize } from "lucide-react";
import { demoVideoUrl } from "../lib/site";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = parseFloat(e.target.value);
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="pt-12 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden group cursor-pointer h-[350px] sm:h-[450px] md:h-[600px] bg-black"
          onMouseMove={showControlsTemporarily}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={demoVideoUrl}
            poster="/og.jpg"
            muted={isMuted}
            playsInline
            loop
            preload="none"
            onClick={handlePlayPause}
          />

          {/* Gradient Overlay - fades when playing */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
              isPlaying && !showControls ? "opacity-0" : "opacity-100"
            }`}
          ></div>

          {/* Live Badge */}
          <div
            className={`absolute top-4 sm:top-8 left-4 sm:left-8 flex items-center gap-2 transition-opacity duration-300 ${
              isPlaying && !showControls ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm sm:text-base font-medium tracking-wide">
              Live Scanner Demo
            </span>
          </div>

          {/* Duration Display */}
          <div
            className={`absolute top-4 sm:top-8 right-4 sm:right-8 text-white/80 font-mono text-xs sm:text-sm transition-opacity duration-300 ${
              isPlaying && !showControls ? "opacity-0" : "opacity-100"
            }`}
          >
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </div>

          {/* Center Play/Pause Button */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isPlaying && !showControls ? "opacity-0" : "opacity-100"
            }`}
            onClick={handlePlayPause}
          >
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center hover:scale-110 hover:bg-white/30 transition-all duration-300 shadow-2xl">
              {isPlaying ? (
                <Pause className="text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              ) : (
                <Play className="text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ml-1" fill="white" />
              )}
            </div>
          </div>

          {/* Title and Description */}
          <div
            className={`absolute bottom-20 sm:bottom-24 left-4 sm:left-8 max-w-lg transition-opacity duration-300 ${
              isPlaying && !showControls ? "opacity-0" : "opacity-100"
            }`}
          >
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-display font-medium mb-1 sm:mb-2">
              Watch gud. app in action
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg">
              Our intelligent AI scans your food and gives you health insights.
            </p>
          </div>

          {/* Video Controls Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${
              isPlaying && !showControls ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Progress Bar */}
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgress}
                className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-3
                  [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:hover:scale-125"
                style={{
                  background: `linear-gradient(to right, #4a6c48 0%, #4a6c48 ${
                    (currentTime / (duration || 1)) * 100
                  }%, rgba(255,255,255,0.3) ${
                    (currentTime / (duration || 1)) * 100
                  }%, rgba(255,255,255,0.3) 100%)`,
                }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-white/80 transition-colors p-1"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" fill="white" />
                  )}
                </button>

                {/* Mute/Unmute */}
                <button
                  onClick={handleMuteToggle}
                  className="text-white hover:text-white/80 transition-colors p-1"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>

                {/* Time Display */}
                <span className="text-white/80 font-mono text-xs sm:text-sm hidden sm:block">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </span>
              </div>

              {/* Fullscreen */}
              <button
                onClick={handleFullscreen}
                className="text-white hover:text-white/80 transition-colors p-1"
                aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize className="w-6 h-6" />
                ) : (
                  <Maximize className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
