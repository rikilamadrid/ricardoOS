"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { aeroFm, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";

const BARS = 9;

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

/**
 * Aero FM — a Winamp-flavored, Frutiger Aero player that streams real audio
 * files from `public/audio/` (see `data/music.ts`). It never autoplays: sound
 * starts on a user gesture. The equalizer is driven by a real AnalyserNode, so
 * the bars react to whatever is playing. If a track's file is missing, the
 * player flags it as unavailable rather than breaking.
 */
export function MusicApp() {
  const { locale } = useLocale();
  const tracks = aeroFm.tracks;

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [unavailable, setUnavailable] = useState(false);

  const track = tracks[index];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  // Build the analyser graph once, on the first user-initiated play.
  const ensureAnalyser = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || ctxRef.current) return;
    type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const source = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.8;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    ctxRef.current = ctx;
    analyserRef.current = analyser;
  }, []);

  // Animate the equalizer bars from live frequency data.
  const runEq = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    // Reduced motion: keep a gentle static readout, no animation loop.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      barsRef.current.forEach((b, i) => b && (b.style.height = `${10 + (i % 3) * 6}px`));
      return;
    }
    const data = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const step = Math.floor(data.length / BARS) || 1;
      for (let i = 0; i < BARS; i++) {
        const v = data[i * step] / 255; // 0..1
        const bar = barsRef.current[i];
        if (bar) bar.style.height = `${6 + v * 24}px`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  }, []);

  const stopEq = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    barsRef.current.forEach((b) => b && (b.style.height = ""));
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureAnalyser();
    void ctxRef.current?.resume();
    audio
      .play()
      .then(() => setUnavailable(false))
      .catch(() => setUnavailable(true));
  }, [ensureAnalyser]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const select = useCallback(
    (next: number, autoplay: boolean) => {
      const i = (next + tracks.length) % tracks.length;
      setIndex(i);
      setCurrent(0);
      setUnavailable(false);
      // Defer play to the next tick so the <audio> src has swapped.
      if (autoplay) requestAnimationFrame(() => play());
    },
    [play, tracks.length],
  );

  // Keep the audio element's volume in sync.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Drive the equalizer with the play state.
  useEffect(() => {
    if (playing) runEq();
    else stopEq();
    return stopEq;
  }, [playing, runEq, stopEq]);

  // Tear down audio context on unmount.
  useEffect(() => {
    return () => {
      stopEq();
      ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, [stopEq]);

  return (
    <div className="os-amp">
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => select(index + 1, true)}
        onError={() => {
          setUnavailable(true);
          setPlaying(false);
        }}
      />

      {/* LCD display */}
      <div className="os-amp-lcd">
        <div className="os-amp-lcd-top">
          <span className="os-amp-cover" aria-hidden="true">
            {track.cover}
          </span>
          <div className="os-amp-marquee">
            <span className="os-amp-title">{track.title}</span>
            <span className="os-amp-artist">{track.artist}</span>
          </div>
          <div className={`os-eq ${playing ? "os-eq--on" : ""}`} aria-hidden="true">
            {Array.from({ length: BARS }).map((_, i) => (
              <span
                key={i}
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
        <div className="os-amp-lcd-bottom">
          <span className="os-amp-time">{fmt(current)}</span>
          <input
            type="range"
            className="os-amp-seek"
            min={0}
            max={duration || 0}
            value={Math.min(current, duration || 0)}
            onChange={(e) => {
              const audio = audioRef.current;
              if (audio) audio.currentTime = Number(e.target.value);
              setCurrent(Number(e.target.value));
            }}
            aria-label="Seek"
          />
          <span className="os-amp-total">{fmt(duration)}</span>
        </div>
      </div>

      {/* Transport + volume */}
      <div className="os-amp-bar">
        <div className="os-amp-controls">
          <button type="button" className="os-amp-btn" onClick={() => select(index - 1, playing)} aria-label="Previous">
            ⏮
          </button>
          <button
            type="button"
            className="os-amp-btn os-amp-btn--play"
            onClick={playing ? pause : play}
            aria-pressed={playing}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button type="button" className="os-amp-btn" onClick={stop} aria-label="Stop">
            ⏹
          </button>
          <button type="button" className="os-amp-btn" onClick={() => select(index + 1, playing)} aria-label="Next">
            ⏭
          </button>
        </div>
        <label className="os-amp-vol">
          <span aria-hidden="true">🔊</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
          />
        </label>
      </div>

      {/* Playlist */}
      <ul className="os-amp-list">
        {tracks.map((tr, i) => (
          <li key={tr.id}>
            <button
              type="button"
              className={`os-amp-row ${i === index ? "os-amp-row--active" : ""}`}
              onClick={() => select(i, true)}
            >
              <span className="os-amp-row-num">{(i + 1).toString().padStart(2, "0")}</span>
              <span className="os-amp-row-title">{tr.title}</span>
              <span className="os-amp-row-cap">{t(tr.caption, locale)}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="os-amp-note">
        {unavailable
          ? "Track unavailable — add its MP3 to public/audio/ (see README)."
          : `${aeroFm.station} · ${t(aeroFm.genre, locale)} — press play. Never autoplays.`}
      </p>
    </div>
  );
}
