"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { aeroFm, skins, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";
import { useSkinStore } from "@/lib/skin-store";

/** Spectrum analyzer bar count (fed by the AnalyserNode). */
const BARS = 16;

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

/**
 * Aero FM — reskinned as a **classic Winamp 2.x** media player: dark brushed
 * metal, a green segmented LCD, a live spectrum analyzer, beveled transport
 * buttons, and a black-on-green playlist. It streams real audio files from
 * `public/audio/` (see `data/music.ts`) and never autoplays: sound starts on a
 * user gesture. The analyzer is driven by a real AnalyserNode, and balance runs
 * through a StereoPannerNode. If a track's file is missing, the player flags it
 * as unavailable rather than breaking.
 */
export function MusicApp() {
  const { locale } = useLocale();
  const skin = useSkinStore((s) => s.skin);
  const setSkin = useSkinStore((s) => s.setSkin);
  const tracks = aeroFm.tracks;

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [balance, setBalance] = useState(0); // -1 (L) … 0 … 1 (R)
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const track = tracks[index];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const rafRef = useRef<number | null>(null);

  // Build the analyser + panner graph once, on the first user-initiated play.
  const ensureGraph = useCallback(() => {
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
    const panner = ctx.createStereoPanner();
    panner.pan.value = balance;
    // source → analyser → panner → destination
    source.connect(analyser);
    analyser.connect(panner);
    panner.connect(ctx.destination);
    ctxRef.current = ctx;
    analyserRef.current = analyser;
    pannerRef.current = panner;
  }, [balance]);

  // Animate the spectrum analyzer from live frequency data.
  const runEq = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    // Reduced motion: keep a gentle static readout, no animation loop.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      barsRef.current.forEach((b, i) => b && (b.style.height = `${18 + ((i * 7) % 5) * 6}%`));
      return;
    }
    const data = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const step = Math.floor(data.length / BARS) || 1;
      for (let i = 0; i < BARS; i++) {
        const v = data[i * step] / 255; // 0..1
        const bar = barsRef.current[i];
        if (bar) bar.style.height = `${8 + v * 92}%`;
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
    ensureGraph();
    void ctxRef.current?.resume();
    audio
      .play()
      .then(() => setUnavailable(false))
      .catch(() => setUnavailable(true));
  }, [ensureGraph]);

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

  // Advance honoring shuffle / repeat (used by Next + on-ended).
  const advance = useCallback(
    (autoplay: boolean) => {
      if (shuffle && tracks.length > 1) {
        let r = index;
        while (r === index) r = Math.floor(Math.random() * tracks.length);
        select(r, autoplay);
      } else {
        select(index + 1, autoplay);
      }
    },
    [index, select, shuffle, tracks.length],
  );

  const onEnded = useCallback(() => {
    const audio = audioRef.current;
    if (repeat && audio) {
      audio.currentTime = 0;
      void audio.play();
      return;
    }
    advance(true);
  }, [advance, repeat]);

  // Keep the audio element's volume in sync.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Keep the panner in sync with the balance slider.
  useEffect(() => {
    if (pannerRef.current) pannerRef.current.pan.value = balance;
  }, [balance]);

  // Drive the analyzer with the play state.
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

  const trackNo = (index + 1).toString().padStart(2, "0");

  return (
    <div className="os-wa" data-skin={skin}>
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={onEnded}
        onError={() => {
          setUnavailable(true);
          setPlaying(false);
        }}
      />

      {/* Titlebar wordmark — doubles as the window's drag handle. */}
      <div className="os-wa-title" data-drag-handle aria-hidden="true">
        <span className="os-wa-grip" />
        <span className="os-wa-word">Aero FM</span>
        <span className="os-wa-grip" />
      </div>

      {/* Main display */}
      <div className="os-wa-display">
        <div className="os-wa-lcd-left">
          <span className={`os-wa-clock ${playing ? "is-on" : ""}`}>{fmt(current)}</span>
          <div className={`os-wa-viz ${playing ? "is-on" : ""}`} aria-hidden="true">
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
        <div className="os-wa-lcd-right">
          <div className="os-wa-marquee">
            <div className={`os-wa-scroll ${playing ? "is-scrolling" : ""}`}>
              {/* Duplicated for a seamless -50% scroll loop. */}
              <span>
                {trackNo}. {track.title} &mdash; {track.artist} &#9834;
              </span>
              <span aria-hidden="true">
                {trackNo}. {track.title} &mdash; {track.artist} &#9834;
              </span>
            </div>
          </div>
          <div className="os-wa-meta">
            <span className="os-wa-kbps">128</span>
            <span className="os-wa-unit">kbps</span>
            <span className="os-wa-kbps">44</span>
            <span className="os-wa-unit">kHz</span>
            <span className={`os-wa-chan ${playing ? "is-on" : ""}`}>stereo</span>
          </div>
        </div>
      </div>

      {/* Position slider */}
      <input
        type="range"
        className="os-wa-seek"
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

      {/* Volume + balance */}
      <div className="os-wa-sliders">
        <label className="os-wa-slider">
          <span className="os-wa-slabel" aria-hidden="true">
            VOL
          </span>
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
        <label className="os-wa-slider">
          <span className="os-wa-slabel" aria-hidden="true">
            BAL
          </span>
          <input
            type="range"
            min={-1}
            max={1}
            step={0.02}
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            aria-label="Balance"
          />
        </label>
      </div>

      {/* Transport + toggles */}
      <div className="os-wa-transport">
        <div className="os-wa-controls">
          <button type="button" className="os-wa-btn" onClick={() => select(index - 1, playing)} aria-label="Previous">
            <span aria-hidden="true">⏮</span>
          </button>
          <button
            type="button"
            className="os-wa-btn"
            onClick={play}
            aria-label="Play"
            aria-pressed={playing}
          >
            <span aria-hidden="true">▶</span>
          </button>
          <button type="button" className="os-wa-btn" onClick={pause} aria-label="Pause">
            <span aria-hidden="true">⏸</span>
          </button>
          <button type="button" className="os-wa-btn" onClick={stop} aria-label="Stop">
            <span aria-hidden="true">⏹</span>
          </button>
          <button type="button" className="os-wa-btn" onClick={() => advance(playing)} aria-label="Next">
            <span aria-hidden="true">⏭</span>
          </button>
        </div>
        <div className="os-wa-toggles">
          <button
            type="button"
            className={`os-wa-chip ${shuffle ? "is-on" : ""}`}
            onClick={() => setShuffle((s) => !s)}
            aria-pressed={shuffle}
          >
            SHUFFLE
          </button>
          <button
            type="button"
            className={`os-wa-chip ${repeat ? "is-on" : ""}`}
            onClick={() => setRepeat((r) => !r)}
            aria-pressed={repeat}
          >
            REPEAT
          </button>
        </div>
      </div>

      {/* Skin selector — repaints the `--wa-*` tokens; choice is persisted.
          Rectangular swatch tiles (not dots) so it never reads as the site's
          streetlight window buttons. */}
      <div className="os-wa-skinbar">
        <span className="os-wa-slabel" aria-hidden="true">
          SKIN
        </span>
        <div className="os-wa-skins" role="group" aria-label="Player skin">
          {skins.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`os-wa-skin ${s.id === skin ? "is-on" : ""}`}
              style={{ ["--wa-swatch" as string]: s.swatch }}
              onClick={() => setSkin(s.id)}
              aria-pressed={s.id === skin}
              aria-label={`${t(s.label, locale)} skin`}
              title={t(s.label, locale)}
            />
          ))}
        </div>
      </div>

      {/* Playlist */}
      <ul className="os-wa-list">
        {tracks.map((tr, i) => (
          <li key={tr.id}>
            <button
              type="button"
              className={`os-wa-row ${i === index ? "is-active" : ""}`}
              onClick={() => select(i, true)}
            >
              <span className="os-wa-row-num">{(i + 1).toString().padStart(2, "0")}.</span>
              <span className="os-wa-row-title">
                {tr.title} &mdash; {tr.artist}
              </span>
              <span className="os-wa-row-cap">{t(tr.caption, locale)}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="os-wa-note">
        {unavailable
          ? "Track unavailable — add its MP3 to public/audio/ (see README)."
          : `${aeroFm.station} · ${t(aeroFm.genre, locale)} — press play. Never autoplays.`}
      </p>
    </div>
  );
}
