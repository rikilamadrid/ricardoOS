# Field Notes Distribution

## Status

In Progress

## Goal

Let readers share any localized Field Note and subscribe to an English-only
newsletter without moving publishing, subscriber storage, or article ownership
out of RicardoOS.

## Context

- Read: `CLAUDE.md`, `context/ai-interaction.md`,
  `context/features/phase-5-content-pages-spec.md`,
  `context/features/phase-8-static-export-spec.md`,
  `src/lib/posts.ts`, `src/lib/site.ts`, `src/data/types.ts`,
  `src/components/content/WritingPostContent.tsx`,
  `src/components/content/WritingIndexContent.tsx`,
  `src/components/apps/WritingApp.tsx`, `src/app/writing/`,
  `src/app/sitemap.ts`, `src/app/globals.css`, and
  `.github/workflows/deploy.yml`.
- Relevant area: statically exported Field Notes index and article routes,
  localized content data, article metadata/OG images, and public build-time
  configuration.
- Avoid: `contact-endpoint/`, Blip, window management, MDX publication logic,
  and unrelated apps.

## Requirements

- RicardoOS remains the canonical publication. Social shares and newsletter
  editions link to the existing Field Note route; they do not become a second
  source of full article content.
- Add a reusable `ShareActions` client component near each article's existing
  date/tag metadata. Keep it compact and user-triggered; do not add a popup on
  load, sticky control, or repeated share CTA.
- Build the absolute share URL from `SITE_URL`, the post slug, and the existing
  locale route convention: English uses `/writing/[slug]`; Spanish and French
  use `/writing/[slug]/[locale]`. Do not share query strings, fragments, or an
  incidental `window.location.href`.
- Use `navigator.share()` when supported, passing the localized article title
  and caption plus the canonical URL. Treat user cancellation as a normal
  outcome, and surface other failures without breaking the fallback actions.
- Keep a short localized share caption with each Field Note. Use it in native
  sharing and Bluesky; on LinkedIn activation, copy it for the reader to paste
  into the composer. Clipboard failure must not block LinkedIn and instead
  reveals the selectable caption for manual copying.
- Keep Copy Link available even when native sharing is supported. Attempt the
  Clipboard API first; if it is unavailable or rejects, expose the canonical
  URL as selectable text and announce clear localized manual-copy guidance
  rather than failing silently.
- Provide explicit LinkedIn and Bluesky share targets using encoded canonical
  URLs and localized article text. Open them safely without third-party SDKs,
  authentication, or code executing from those platforms inside RicardoOS.
- Add a reusable `NewsletterSignup` to the end of every Field Note and once at
  the bottom of both existing Field Notes index presentations:
  `WritingIndexContent` and the in-window `WritingApp`.
- The signup asks for an email address only. Provider-required hidden fields
  may be included, but RicardoOS must not collect additional personal data.
- Submit with a normal HTML `POST` directly to Buttondown's embed-subscribe
  endpoint. Allow Buttondown's hosted confirmation, validation, and CAPTCHA
  responses to work; do not intercept submission with `fetch`.
- Keep localized sharing, signup, consent, status, error, and privacy copy in
  the existing `Localized<T>` data architecture. Every locale must state
  clearly that the newsletter itself is sent in English only.
- Centralize newsletter copy and the provider-neutral public form action. Read
  the action from `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION` at build time and pass it
  through the deployment workflow. It contains no API key. If it is absent or
  invalid, fail closed with a localized unavailable state rather than posting
  to a placeholder URL.
- Configure confirmation/double-opt-in in Buttondown and verify the full test
  subscription flow before release. Subscribers and their lifecycle remain
  entirely in Buttondown.
- Add a small, statically generated privacy notice because the repository has
  no existing privacy-policy route. Use `/privacy` for English and
  `/privacy/es` and `/privacy/fr` for localized versions, with metadata and
  sitemap entries following the existing static-route conventions. The notice
  must identify the newsletter purpose, the email data collected, Buttondown
  as processor/provider, retention until unsubscribe, how consent is withdrawn,
  and the existing contact channel for data requests.
- Newsletter editions remain a manual Buttondown operation chosen per post.
  Each edition contains a short introduction or excerpt and a link to the
  canonical RicardoOS Field Note; publishing MDX must not trigger an email.
- Preserve keyboard operation, visible focus, screen-reader labels/status,
  dark/light presentation, and `prefers-reduced-motion` behavior. Motion must
  not be necessary to understand or operate either component.
- Preserve the existing article metadata and statically generated Open Graph
  image pipeline. Verify that a shared URL resolves to the matching localized
  page metadata and a real exported preview image.
- Follow the repository workflow during implementation: feature branch,
  `[Unreleased]` changelog entry, lint, production/static build, browser and
  provider-flow verification, and permission before any commit. The completed
  user-facing addition has MINOR release impact.

## Out of Scope

- Social SDKs, social authentication, share counters, scheduled or automated
  social posting, and additional social targets.
- A RicardoOS subscriber backend, custom newsletter API, database, auth,
  analytics, referral system, segmentation, paid subscriptions, or storing
  subscriber emails locally.
- Newsletter popups, modal-on-load prompts, sticky banners, or repeated CTA
  clutter.
- Automatic emails for every MDX publication, RSS-to-email automation, and
  duplicating full Field Notes in a provider-hosted archive.
- Newsletter languages other than English, locale-based subscriber lists, and
  collecting names or preferences.
- Changing the article body, MDX schema, Field Notes routes, or existing
  canonical ownership.
- Choosing or exposing the newsletter sender address in RicardoOS; sender
  configuration is deferred and does not block this Feature.

## Acceptance Criteria

- Every published English, Spanish, and French Field Note route shows one calm
  share control near its metadata and one newsletter card after the article.
- Native sharing is offered only when supported; Copy Link, LinkedIn, and
  Bluesky remain operable fallbacks, and all actions use the correct clean,
  absolute localized canonical URL.
- Native and Bluesky shares include the localized article caption. LinkedIn
  opens normally while reporting whether that caption was copied or exposing
  it for manual copying when clipboard access fails.
- Copy Link reports success accessibly. A blocked or missing Clipboard API
  leaves the URL visible and selectable with localized manual-copy guidance.
- Native-share cancellation produces no error; genuine native-share failures
  leave fallback actions usable and communicate the problem accessibly.
- Share controls are keyboard-operable with visible focus, safe external-link
  behavior, localized accessible names, and no social SDK/network request until
  the reader activates a target.
- The standalone and in-window Field Notes indexes each show one signup card;
  each article shows one card after its content. None is a popup or sticky CTA.
- Signup UI is localized in all three site languages, explicitly promises an
  English-only newsletter, collects only email, links to the matching localized
  privacy notice, and submits as an ordinary HTML form directly to the
  configured Buttondown endpoint.
- With configuration absent or invalid, the form cannot submit and displays a
  localized unavailable state; no placeholder address or secret is emitted.
- A Buttondown test address receives a confirmation request and is not treated
  as a subscribed recipient until confirmation; unsubscribe expectations are
  stated in the signup copy and privacy notice.
- `/privacy`, `/privacy/es`, and `/privacy/fr` are included in the static export,
  expose appropriate metadata/canonicals, appear in the sitemap, and accurately
  describe the MVP data flow.
- Existing Field Note routes, localized article bodies, metadata, and generated
  OG images remain intact. Exported page source points at preview assets that
  exist in `out/`, and a share-preview check renders the expected title,
  description, and image.
- Reduced-motion mode removes any nonessential new transition, and the controls
  remain fully understandable without animation.
- `npm run lint` and `npm run build` pass with the feature configured for the
  production/static export.

## Notes / Decisions

- This is Feature 23 because historical Phases 16 through 22 already consumed
  those numbers even though only Phases 1 through 15 have individual files in
  `context/features/`.
- `context/current-feature.md` is stale: it says Phase 22 awaits deployment,
  while `main`, `CHANGELOG.md`, and `context/history.md` show the LLM fallback
  released in v1.7.0 and its follow-up fixes released in v1.8.0. Implementation
  should replace that stale marker with this Feature rather than treating Phase
  22 as concurrent unfinished product work.
- The repository has two Field Notes index presentations, the standalone
  `WritingIndexContent` and in-window `WritingApp`; one shared signup in each is
  consistent with the accepted "Field Notes index" placement without repeating
  the CTA in a single view.
- Buttondown owns subscription validation, confirmation, unsubscribe state, and
  subscriber storage. RicardoOS owns only the public form UI and privacy notice.
- `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION` is intentionally provider-neutral and
  public. Replacing Buttondown later should require changing centralized
  configuration and provider-specific hidden fields, not article pages.
