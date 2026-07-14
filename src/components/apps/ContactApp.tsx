"use client";

import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { contact, t } from "@/data";
import { useLocale } from "@/components/os/locale-store";
import { AquaButton } from "@/components/ui/AquaButton";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = "idle" | "submitting";

/** Contact — a small form to send a message directly. */
export function ContactApp() {
  const { locale } = useLocale();
  const form = contact.form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real users never see/fill this
  const [status, setStatus] = useState<SubmitState>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (company) return; // honeypot tripped — silently drop

    if (!name.trim()) {
      toast(t(form.validationNameToast, locale));
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      toast(t(form.validationEmailToast, locale));
      return;
    }
    if (message.trim().length < 5) {
      toast(t(form.validationMessageToast, locale));
      return;
    }

    setStatus("submitting");
    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
      if (!endpoint) throw new Error("Contact endpoint not configured");

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          company,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      toast(t(form.successToast, locale));
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast(t(form.errorToast, locale));
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div>
      <div className="os-eyebrow">{t(contact.eyebrow, locale)}</div>
      <h2 className="font-brand text-2xl tracking-tight">{t(contact.heading, locale)}</h2>
      <p className="mt-1.5 text-ink-soft">{t(contact.intro, locale)}</p>

      <form className="os-contact-form mt-4" onSubmit={handleSubmit} noValidate>
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
        >
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="os-field-row">
          <label className="os-field" htmlFor="contact-name">
            <span className="os-field-label">{t(form.nameLabel, locale)}</span>
            <input
              id="contact-name"
              className="os-input"
              type="text"
              autoComplete="name"
              placeholder={t(form.namePlaceholder, locale)}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="os-field" htmlFor="contact-email">
            <span className="os-field-label">{t(form.emailLabel, locale)}</span>
            <input
              id="contact-email"
              className="os-input"
              type="email"
              autoComplete="email"
              placeholder={t(form.emailPlaceholder, locale)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <label className="os-field" htmlFor="contact-message">
          <span className="os-field-label">{t(form.messageLabel, locale)}</span>
          <textarea
            id="contact-message"
            className="os-input os-textarea"
            rows={4}
            placeholder={t(form.messagePlaceholder, locale)}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <AquaButton
          type="submit"
          variant="primary"
          className="mt-1 !w-full !justify-center"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? t(form.submitting, locale) : t(form.submit, locale)}
        </AquaButton>
      </form>

      <p className="mt-4 text-[13px] text-ink-soft">{t(contact.footnote, locale)}</p>
    </div>
  );
}
