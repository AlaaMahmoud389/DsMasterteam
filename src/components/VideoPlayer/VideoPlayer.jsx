import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './VideoPlayer.module.css';

/* ── Helpers ──────────────────────────────────────────────────────── */
function formatTime(sec) {
  if (!isFinite(sec) || isNaN(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/* ── Icons ──────────────────────────────────────────────────────────── */
function PlayIcon({ size = 24, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 5.5L18.5 12L7 18.5V5.5Z" fill={color} />
    </svg>
  );
}

function PauseIcon({ size = 24, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" fill={color} />
      <rect x="14" y="5" width="4" height="14" rx="1" fill={color} />
    </svg>
  );
}

function VolumeOnIcon({ size = 16, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 6.5v3h2.5L8 12V4L4.5 6.5H2z" fill={color} />
      <path d="M10.5 5.5a4 4 0 0 1 0 5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12.5 3.5a7 7 0 0 1 0 9" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function VolumeOffIcon({ size = 16, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 6.5v3h2.5L8 12V4L4.5 6.5H2z" fill={color} />
      <path d="M11 6.5l3 3M14 6.5l-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ExpandIcon({ size = 16, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.5 10.5L10.5 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 5.5H10.5V8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 10.5H5.5V7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CollapseIcon({ size = 16, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13 3L9 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 4V7H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13L7 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 12V9H4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Size config ────────────────────────────────────────────────────── */
const SIZE_CFG = {
  small:  { size: 32, iconSize: 24, radius: 5 },
  medium: { size: 48, iconSize: 24, radius: 8 },
  large:  { size: 64, iconSize: 32, radius: 12 },
};

/* ── PlayPauseButton ────────────────────────────────────────────────── */
function PlayPauseButton({ isPlaying, onClick, buttonStyle = 'semi-transparent', size = 'medium', disabled = false }) {
  const cfg = SIZE_CFG[size] ?? SIZE_CFG.medium;
  const iconColor = disabled ? '#6C7C96' : (buttonStyle === 'neutral' ? '#000b36' : '#ffffff');

  const variantCls =
    disabled             ? styles.btnDisabled :
    buttonStyle === 'primary' ? styles.btnPrimary :
    buttonStyle === 'neutral' ? styles.btnNeutral :
    styles.btnSemiTransparent;

  return (
    <button
      type="button"
      className={[styles.btn, variantCls].join(' ')}
      style={{ width: cfg.size, height: cfg.size, borderRadius: cfg.radius }}
      onClick={onClick}
      disabled={disabled}
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying
        ? <PauseIcon size={cfg.iconSize} color={iconColor} />
        : <PlayIcon  size={cfg.iconSize} color={iconColor} />
      }
    </button>
  );
}

/* ── VolumeButton ───────────────────────────────────────────────────── */
function VolumeButton({ isMuted, onClick }) {
  return (
    <button
      type="button"
      className={[styles.btn, styles.btnSemiTransparent, styles.btnFixed].join(' ')}
      onClick={onClick}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted
        ? <VolumeOffIcon size={16} color="#ffffff" />
        : <VolumeOnIcon  size={16} color="#ffffff" />
      }
    </button>
  );
}

/* ── ResizeButton ───────────────────────────────────────────────────── */
function ResizeButton({ isFullscreen, onClick }) {
  return (
    <button
      type="button"
      className={[styles.btn, styles.btnSemiTransparent, styles.btnFixed].join(' ')}
      onClick={onClick}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {isFullscreen
        ? <CollapseIcon size={16} color="#ffffff" />
        : <ExpandIcon   size={16} color="#ffffff" />
      }
    </button>
  );
}

/* ── Timestamp ──────────────────────────────────────────────────────── */
function Timestamp({ currentTime, duration }) {
  return (
    <span className={styles.timestamp}>
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>
  );
}

/* ── ProgressBar ────────────────────────────────────────────────────── */
function ProgressBar({ progressRef, currentTime, duration, bufferedPct, onMouseDown, isDragging }) {
  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      ref={progressRef}
      className={[styles.progressWrapper, isDragging && styles.progressDragging].filter(Boolean).join(' ')}
      onMouseDown={onMouseDown}
      role="slider"
      aria-label="Video progress"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(currentTime)}
      aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (!duration) return;
        if (e.key === 'ArrowRight') onMouseDown({ clientX: null, _pct: Math.min(1, (currentTime + 5) / duration) });
        if (e.key === 'ArrowLeft')  onMouseDown({ clientX: null, _pct: Math.max(0, (currentTime - 5) / duration) });
      }}
    >
      <div className={styles.progressTrack}>
        <div className={styles.progressBuffer} style={{ width: `${bufferedPct}%` }} />
        <div className={styles.progressFill}   style={{ width: `${pct}%` }} />
      </div>
      <div className={styles.progressThumb} style={{ left: `${pct}%` }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   VideoPlayer
   ════════════════════════════════════════════════════════════════════ */
export function VideoPlayer({
  src,
  poster,
  buttonStyle    = 'semi-transparent',
  buttonSize     = 'medium',
  autoPlay       = false,
  loop           = false,
  initialPlaying = false,
  className,
}) {
  const videoRef       = useRef(null);
  const containerRef   = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying,    setIsPlaying]    = useState(initialPlaying);
  const [hasStarted,   setHasStarted]   = useState(initialPlaying);
  const [isMuted,      setIsMuted]      = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [duration,     setDuration]     = useState(0);
  const [bufferedPct,  setBufferedPct]  = useState(0);
  const [isHovering,   setIsHovering]   = useState(false);
  const [isDragging,   setIsDragging]   = useState(false);

  /* Mark as started the first time the video plays */
  useEffect(() => { if (isPlaying) setHasStarted(true); }, [isPlaying]);

  /* ── Video element event handlers ── */
  const handleTimeUpdate    = () => videoRef.current && setCurrentTime(videoRef.current.currentTime);
  const handleLoadedMetadata = () => videoRef.current && setDuration(videoRef.current.duration);
  const handleEnded         = () => setIsPlaying(false);
  const handleProgress      = () => {
    const v = videoRef.current;
    if (!v || !v.buffered.length || !v.duration) return;
    setBufferedPct((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
  };

  /* ── Play / Pause ── */
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) { setIsPlaying(p => !p); return; }
    if (v.paused) { v.play().then(() => setIsPlaying(true)).catch(() => {}); }
    else          { v.pause(); setIsPlaying(false); }
  }, []);

  /* ── Mute ── */
  const toggleMute = useCallback(() => {
    setIsMuted(m => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  }, []);

  /* ── Fullscreen ── */
  const toggleFullscreen = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    if (!document.fullscreenElement) {
      c.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  /* ── Seek ── */
  const seekTo = useCallback((pct) => {
    const t = Math.max(0, Math.min(1, pct)) * (duration || 0);
    setCurrentTime(t);
    if (videoRef.current && isFinite(t)) videoRef.current.currentTime = t;
  }, [duration]);

  /* ── Progress bar click / drag ── */
  const getProgressPct = useCallback((clientX) => {
    if (!progressBarRef.current) return 0;
    const rect = progressBarRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }, []);

  const handleProgressMouseDown = useCallback((e) => {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    /* Keyboard shortcut passes a synthetic object with _pct */
    const pct = e._pct !== undefined ? e._pct : getProgressPct(e.clientX);
    setIsDragging(true);
    seekTo(pct);
  }, [getProgressPct, seekTo]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => seekTo(getProgressPct(e.clientX));
    const onUp   = () => setIsDragging(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
    };
  }, [isDragging, seekTo, getProgressPct]);

  /* ── Space bar to toggle ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === ' ' && containerRef.current?.contains(document.activeElement)) {
        e.preventDefault();
        togglePlay();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [togglePlay]);

  /* ── Auto-play on mount ── */
  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      className={[styles.container, isFullscreen && styles.containerFullscreen, className].filter(Boolean).join(' ')}
      onClick={togglePlay}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { if (!isDragging) setIsHovering(false); }}
    >
      {/* ── Video or placeholder ── */}
      {src ? (
        <video
          ref={videoRef}
          className={styles.video}
          src={src}
          poster={poster}
          loop={loop}
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onProgress={handleProgress}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      ) : (
        <div
          className={styles.placeholder}
          style={poster
            ? { backgroundImage: `url(${poster})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : undefined
          }
        />
      )}

      {/* ── Center play button:
            • Never started → always show (even while hovering) so user can start the video
            • Paused (started before) → only show when not hovering (hover shows controls bar) ── */}
      {!isPlaying && (!hasStarted || !isHovering) && (
        <div className={styles.pauseOverlay}>
          <div className={styles.centerPlay}>
            <PlayPauseButton
              isPlaying={false}
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              buttonStyle={buttonStyle}
              size={buttonSize}
            />
          </div>
        </div>
      )}

      {/* ── Controls bar: only when hovering AND the video has been started at least once ── */}
      {isHovering && hasStarted && (
        <>
          <div className={styles.controlsGradient} aria-hidden="true" />
          <div className={styles.controls} onClick={(e) => e.stopPropagation()}>
            <ProgressBar
              progressRef={progressBarRef}
              currentTime={currentTime}
              duration={duration}
              bufferedPct={bufferedPct}
              onMouseDown={handleProgressMouseDown}
              isDragging={isDragging}
            />
            <div className={styles.controlsRow}>
              <div className={styles.controlsLeft}>
                <PlayPauseButton
                  isPlaying={isPlaying}
                  onClick={togglePlay}
                  buttonStyle="semi-transparent"
                  size="small"
                />
                <VolumeButton isMuted={isMuted} onClick={toggleMute} />
                <Timestamp currentTime={currentTime} duration={duration} />
              </div>
              <div className={styles.controlsRight}>
                <ResizeButton isFullscreen={isFullscreen} onClick={toggleFullscreen} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
