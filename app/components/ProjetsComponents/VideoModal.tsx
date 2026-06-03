'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, X, Minimize } from 'lucide-react';
import type { VideoInfo } from '../Projets';

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export function VideoModal({ info, onClose }: { info: VideoInfo | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!info) {
      const video = videoRef.current;
      if (video) { video.pause(); video.currentTime = 0; }
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setShowOverlay(true);
    }
  }, [info]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!info) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        const v = videoRef.current;
        if (v) v.paused ? v.play() : v.pause();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [info, onClose]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    if (info) {
      window.dispatchEvent(new Event('lenis:stop'));
      document.body.style.overflow = 'hidden';
    } else {
      window.dispatchEvent(new Event('lenis:start'));
      document.body.style.overflow = '';
    }
    return () => {
      window.dispatchEvent(new Event('lenis:start'));
      document.body.style.overflow = '';
    };
  }, [info]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const t = Number(e.target.value);
    v.currentTime = t;
    setCurrentTime(t);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const v = videoRef.current;
    if (v) { v.volume = val; v.muted = val === 0; }
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  if (!mounted) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return createPortal(
    <AnimatePresence>
      {info && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          {/* Conteneur principal : hauteur fixe pour que les contrôles restent toujours visibles */}
          <motion.div
            ref={containerRef}
            className="relative z-10 bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-[700px] flex flex-col"
            style={{ height: '85vh', maxHeight: 600 }}
            initial={{ scale: 0.92, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 28 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — hauteur fixe */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-5 h-[2px] shrink-0" style={{ background: 'var(--red, #c00)' }} />
                <h3
                  className="text-white text-base leading-snug truncate"
                  style={{ fontFamily: "'GildaDisplay-Regular', serif" }}
                >
                  {info.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="ml-4 shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fermer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Zone vidéo — flex-1 + min-h-0 : prend l'espace restant, jamais plus */}
            <div
              className="relative bg-black flex-1 min-h-0 cursor-pointer select-none overflow-hidden"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src={info.src}
                className="w-full h-full object-contain block"
                onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
                onPlay={() => { setIsPlaying(true); setShowOverlay(false); }}
                onPause={() => { setIsPlaying(false); setShowOverlay(true); }}
                onEnded={() => { setIsPlaying(false); setShowOverlay(true); }}
              />

              <AnimatePresence>
                {showOverlay && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div
                      className="rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
                      style={{ width: 68, height: 68 }}
                    >
                      <Play size={28} className="text-white" style={{ marginLeft: 4 }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contrôles — hauteur fixe, toujours visibles */}
            <div className="px-5 pt-4 pb-4 bg-[#111] flex flex-col gap-3 shrink-0 border-t border-white/8">
              {/* Barre de progression */}
              <div className="flex items-center gap-3">
                <span className="text-white/50 text-xs tabular-nums w-9 shrink-0">{formatTime(currentTime)}</span>
                <div className="relative flex-1 flex items-center h-4">
                  <div className="absolute inset-y-0 flex items-center w-full pointer-events-none">
                    <div className="w-full h-1 rounded-full bg-white/15 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${progress}%`, background: 'var(--red, #c00)', transition: 'none' }}
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.05}
                    value={currentTime}
                    onChange={handleSeek}
                    className="relative w-full h-4 cursor-pointer opacity-0"
                    style={{ WebkitAppearance: 'none', appearance: 'none' }}
                  />
                </div>
                <span className="text-white/50 text-xs tabular-nums w-9 shrink-0 text-right">{formatTime(duration)}</span>
              </div>

              {/* Boutons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white shrink-0"
                  aria-label={isPlaying ? 'Pause' : 'Lecture'}
                >
                  {isPlaying
                    ? <Pause size={15} />
                    : <Play size={15} style={{ marginLeft: 2 }} />
                  }
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white/50 hover:text-white transition-colors"
                    aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 cursor-pointer rounded-full"
                    style={{ accentColor: 'var(--red, #c00)' }}
                  />
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="ml-auto text-white/50 hover:text-white transition-colors"
                  aria-label={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
                >
                  {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
                </button>
              </div>
            </div>

            {/* Description — tout en bas, hauteur fixe */}
            {info.description && (
              <div className="px-5 py-4 bg-[#0d0d0d] border-t border-white/8 shrink-0">
                <p className="text-white/45 text-sm leading-relaxed line-clamp-3">{info.description}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
