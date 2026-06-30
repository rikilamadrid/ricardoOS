"use client";

import { useEffect, useRef, useState } from "react";
import { aeroFm, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";

/** A soft ambient chord (frequencies in Hz) for the synth pad. */
const PAD_CHORD = [220, 277.18, 329.63, 440]; // A3 · C#4 · E4 · A4

/**
 * Aero FM — an ambient mini-player. The "audio" is a soft Web Audio synth pad
 * generated on demand: it starts only on a user click (never autoplay), stays
 * quiet, and is fully stoppable. An animated equalizer reflects the play state.
 */
export function MusicApp() {
  const { locale } = useLocale();
  const track = aeroFm.tracks[0];
  const [playing, setPlaying] = useState(false);

  // Audio graph is created lazily on first play (needs a user gesture).
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  const stop = () => {
    const master = masterRef.current;
    const ctx = ctxRef.current;
    if (master && ctx) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    }
    setPlaying(false);
  };

  const start = () => {
    type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
    if (!Ctor) return;

    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = new Ctor();
      const master = ctx.createGain();
      master.gain.value = 0;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 900;

      PAD_CHORD.forEach((freq, i) => {
        const osc = ctx!.createOscillator();
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.value = freq;
        // Slow detune drift gives the pad gentle movement.
        const lfo = ctx!.createOscillator();
        lfo.frequency.value = 0.05 + i * 0.02;
        const lfoGain = ctx!.createGain();
        lfoGain.gain.value = 1.5;
        lfo.connect(lfoGain).connect(osc.detune);
        const voice = ctx!.createGain();
        voice.gain.value = 0.25;
        osc.connect(voice).connect(filter);
        osc.start();
        lfo.start();
      });

      filter.connect(master).connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }

    void ctx.resume();
    const master = masterRef.current!;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.8); // low volume
    setPlaying(true);
  };

  // Tear the audio context down when the window unmounts.
  useEffect(() => {
    return () => {
      ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  return (
    <div className="os-fm">
      <div className="os-fm-cover" aria-hidden="true">
        {track.cover}
      </div>

      <div className="os-fm-meta">
        <div className="os-eyebrow">{aeroFm.station} · {t(aeroFm.genre, locale)}</div>
        <div className="font-brand text-xl tracking-tight">{track.title}</div>
        <div className="text-[13px] text-ink-soft">{track.artist} — {t(track.caption, locale)}</div>
      </div>

      <div className={`os-eq ${playing ? "os-eq--on" : ""}`} aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.09}s` }} />
        ))}
      </div>

      <button
        type="button"
        className="os-gel os-gel--primary os-fm-toggle"
        onClick={playing ? stop : start}
        aria-pressed={playing}
      >
        {playing ? "⏸ Pause" : "▶ Play"}
      </button>

      <p className="os-fm-note">{playing ? "Soft synth pad, drifting." : "Press play — generated live, kept quiet."}</p>
    </div>
  );
}
