"use client";

import { useEffect, useRef, useState } from "react";
import { terminal, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";
import { useTheme, type Theme } from "@/components/os/theme-store";
import { useWindowStore } from "@/lib/window-store";

interface Line {
  id: number;
  /** "in" = echoed prompt+command, "out" = command output, "err" = error. */
  kind: "in" | "out" | "err";
  text: string;
}

/**
 * Terminal — a working toy shell. Parses the command registry from
 * `terminal.ts`: response commands print localized lines, action commands open
 * apps, switch theme (`theme [day|night]`), clear the screen, or exit (close
 * the window). Unknown input returns a friendly error.
 */
export function TerminalApp() {
  const { locale } = useLocale();
  const { setTheme, toggleTheme } = useTheme();
  const openApp = useWindowStore((s) => s.openApp);
  const closeApp = useWindowStore((s) => s.closeApp);

  const prompt = `${terminal.user}@${terminal.host} ${terminal.prompt}`;
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const nextId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (entries: Omit<Line, "id">[]) =>
    setLines((prev) => [...prev, ...entries.map((e) => ({ ...e, id: nextId.current++ }))]);

  // Banner on mount.
  useEffect(() => {
    push([{ kind: "out", text: t(terminal.banner, locale) }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the newest line in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function run(raw: string) {
    const trimmed = raw.trim();
    push([{ kind: "in", text: `${prompt} ${trimmed}` }]);
    if (!trimmed) return;

    const [name, ...args] = trimmed.split(/\s+/);
    const cmd = terminal.commands.find((c) => c.name === name.toLowerCase());

    if (!cmd) {
      push([{ kind: "err", text: `command not found: ${name} — type 'help'` }]);
      return;
    }

    if (cmd.action) {
      switch (cmd.action.type) {
        case "open":
          if (cmd.action.payload) openApp(cmd.action.payload);
          push([{ kind: "out", text: `opening ${cmd.action.payload}…` }]);
          break;
        case "theme": {
          const arg = args[0]?.toLowerCase();
          if (arg === "day" || arg === "night") {
            setTheme(arg as Theme);
            push([{ kind: "out", text: `theme → ${arg}` }]);
          } else {
            toggleTheme();
            push([{ kind: "out", text: "theme toggled" }]);
          }
          break;
        }
        case "clear":
          setLines([]);
          return;
        case "exit":
          push([{ kind: "out", text: "bye 👋" }]);
          setTimeout(() => closeApp("terminal"), 150);
          break;
      }
    }

    if (cmd.response) {
      push(t(cmd.response, locale).map((text) => ({ kind: "out" as const, text })));
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    run(input);
    setInput("");
  }

  return (
    <div className="os-term" onClick={() => inputRef.current?.focus()}>
      <div className="os-term-scroll" ref={scrollRef}>
        {lines.map((line) => (
          <div key={line.id} className={`os-term-line os-term-line--${line.kind}`}>
            {line.text}
          </div>
        ))}
        <form onSubmit={onSubmit} className="os-term-input-row">
          <span className="os-term-prompt">{prompt}</span>
          <input
            ref={inputRef}
            className="os-term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
}
