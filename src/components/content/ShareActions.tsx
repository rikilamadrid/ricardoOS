"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Copy, ExternalLink, Share2, Smartphone } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { sharing, t, type Locale } from "@/data";
import { writingPostUrl } from "@/lib/writing-routes";

type Status =
  | "copied"
  | "copyFailed"
  | "shareFailed"
  | "linkedInCopied"
  | "linkedInCopyFailed"
  | null;

interface ShareActionsProps {
  locale: Locale;
  slug: string;
  title: string;
  caption: string;
}

function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "AbortError"
  );
}

export function ShareActions({ locale, slug, title, caption }: ShareActionsProps) {
  const panelTitleId = useId();
  const canonicalUrl = writingPostUrl(slug, locale);
  const shareData = { title, text: caption, url: canonicalUrl };
  const [open, setOpen] = useState(false);
  const [nativeSupported, setNativeSupported] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const manualUrlRef = useRef<HTMLInputElement>(null);
  const manualCaptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const capabilityData = { title, text: caption, url: canonicalUrl };
    let supported = typeof navigator.share === "function";

    if (supported && typeof navigator.canShare === "function") {
      try {
        supported = navigator.canShare(capabilityData);
      } catch {
        supported = false;
      }
    }

    // Browser capability is only knowable after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNativeSupported(supported);
  }, [canonicalUrl, caption, title]);

  useEffect(() => {
    if (status !== "copyFailed" && status !== "linkedInCopyFailed") return;

    const frame = requestAnimationFrame(() => {
      const manualValue =
        status === "copyFailed" ? manualUrlRef.current : manualCaptionRef.current;
      manualValue?.focus();
      manualValue?.select();
    });

    return () => cancelAnimationFrame(frame);
  }, [status]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setStatus(null);
  };

  const handleNativeShare = async () => {
    setStatus(null);

    try {
      await navigator.share(shareData);
      setOpen(false);
    } catch (error) {
      if (!isAbortError(error)) setStatus("shareFailed");
    }
  };

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(canonicalUrl);
      setStatus("copied");
    } catch {
      setStatus("copyFailed");
    }
  };

  const handleLinkedInClick = () => {
    setStatus(null);

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");

      void navigator.clipboard.writeText(caption).then(
        () => setStatus("linkedInCopied"),
        () => setStatus("linkedInCopyFailed"),
      );
    } catch {
      setStatus("linkedInCopyFailed");
    }
  };

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;
  const blueskyText = `${caption}\n${canonicalUrl}`;
  const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(blueskyText)}`;
  const statusMessage = status ? t(sharing[status], locale) : null;

  return (
    <div className="os-share-actions">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button type="button" className="os-share-trigger">
            <Share2 aria-hidden="true" size={15} strokeWidth={2.2} />
            {t(sharing.trigger, locale)}
          </button>
        </PopoverTrigger>
        <PopoverContent
          aria-labelledby={panelTitleId}
          align="end"
          sideOffset={7}
          className="os-glass os-share-popover text-ink"
        >
          <h2 id={panelTitleId} className="os-share-title">
            {t(sharing.panelTitle, locale)}
          </h2>

          <div className="os-share-menu">
            {nativeSupported ? (
              <button type="button" className="os-share-option" onClick={handleNativeShare}>
                <Smartphone aria-hidden="true" size={16} />
                <span>{t(sharing.nativeShare, locale)}</span>
              </button>
            ) : null}

            <button type="button" className="os-share-option" onClick={handleCopy}>
              <Copy aria-hidden="true" size={16} />
              <span>{t(sharing.copyLink, locale)}</span>
            </button>

            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="os-share-option"
              aria-label={t(sharing.linkedInAria, locale)}
              onClick={handleLinkedInClick}
            >
              <ExternalLink aria-hidden="true" size={16} />
              <span>{t(sharing.linkedIn, locale)}</span>
            </a>

            <a
              href={blueskyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="os-share-option"
              aria-label={t(sharing.blueskyAria, locale)}
            >
              <ExternalLink aria-hidden="true" size={16} />
              <span>{t(sharing.bluesky, locale)}</span>
            </a>
          </div>

          <div className="os-share-feedback" aria-live="polite" aria-atomic="true">
            {statusMessage ? <p role="status">{statusMessage}</p> : null}
            {status === "copyFailed" || status === "linkedInCopyFailed" ? (
              <label className="os-share-manual">
                <span>
                  {t(
                    status === "copyFailed"
                      ? sharing.manualCopyLabel
                      : sharing.manualCaptionLabel,
                    locale,
                  )}
                </span>
                {status === "copyFailed" ? (
                  <input
                    ref={manualUrlRef}
                    type="text"
                    readOnly
                    value={canonicalUrl}
                    onFocus={(event) => event.currentTarget.select()}
                    onClick={(event) => event.currentTarget.select()}
                  />
                ) : (
                  <textarea
                    ref={manualCaptionRef}
                    readOnly
                    rows={4}
                    value={caption}
                    onFocus={(event) => event.currentTarget.select()}
                    onClick={(event) => event.currentTarget.select()}
                  />
                )}
              </label>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
