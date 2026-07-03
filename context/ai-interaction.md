# AI Interaction Guidelines

## Communication

- Be concise and direct
- Explain non-obvious decisions briefly
- Ask before large refactors or architectural changes
- Don't add features not in the project spec
- Never delete files without clarification

## Workflow

This is the common workflow that we will use for every single feature/fix:

1. **Document** - Document the feature in @context/current-feature.md.
2. **Branch** - Create new branch for feature, fix, etc
3. **Implement** - Implement the feature/fix that I create in @context/current-feature.md
4. **Test** - Verify it works in the browser. Implement unit testing later. Run `npm run build` and fix any errors
5. **Iterate** - Iterate and change things if needed
6. **Changelog** - Add an entry under `## [Unreleased]` in `CHANGELOG.md` (see [Versioning](#versioning)).
7. **Commit** - Only after build passes and everything works
8. **Merge** - Merge to main
9. **Release** - When merging to main is a shippable change, cut a version (see [Versioning](#versioning)).
10. **Delete Branch** - Delete branch after merge
11. **Review** - Review AI-generated code periodically and on demand.
12. Mark as completed in @context/current-feature.md and add to history

Do NOT commit without permission and until the build passes. If build fails, fix the issues first.

## Branching

We will create a new branch for every feature/fix. Name branch **feature/[feature]** or **fix[fix]**, etc. Ask to delete the branch once merged.

## Commits

- Ask before committing (don't auto-commit)
- Use conventional commit messages (feat:, fix:, chore:, etc.)
- Keep commits focused (one feature/fix per commit)
- Never put "Generated With Claude" in the commit messages

## Versioning

We follow [Semantic Versioning](https://semver.org) (`MAJOR.MINOR.PATCH`) and keep
`CHANGELOG.md` in [Keep a Changelog](https://keepachangelog.com) style. The version
in `package.json` and the top of `CHANGELOG.md` must always agree.

**Which number to bump** (this is a static site with no public API, so read these
in terms of the *user-facing site*):

- **PATCH** (`x.y.Z`) — backward-compatible fixes: bug fixes, copy tweaks, style
  fixes, CI/deploy fixes. Most `fix:` and `chore:` commits.
- **MINOR** (`x.Y.0`) — backward-compatible additions: a new app, a new project or
  writing post, a new feature or setting. Most `feat:` commits.
- **MAJOR** (`X.0.0`) — a change that breaks existing behavior or shareable URLs:
  removing/renaming a route or deep-link (`/projects/[slug]`, `?app=`), a full
  redesign, or dropping a feature people may rely on. Rare — call it out and ask.

**Changelog rules:**

- Keep a `## [Unreleased]` section at the top; add each change there as you work
  (step 6 of the Workflow), grouped under **Added / Changed / Fixed / Removed /
  Deprecated / Security** (only the groups you need).
- Write human-readable entries describing the change to the site — never paste raw
  git logs or commit hashes.
- On release, rename `[Unreleased]` to the new version with an ISO date
  (`## [1.2.0] - 2026-07-10`), leave a fresh empty `[Unreleased]` above it, and
  update the compare links at the bottom. Newest version stays on top.
- Don't invent entries — every line must trace to a real commit or code change.

**Cutting a release** (after merging to main, when the change is shippable):

```bash
npm run version:patch   # or version:minor / version:major
```

This bumps `package.json`, commits `chore(release): vX.Y.Z`, and creates a matching
`vX.Y.Z` git tag. Move the `CHANGELOG.md` entries from `[Unreleased]` into the new
version section **before** running it. Not every merge needs its own release —
several merged changes can ship together under one version bump. Ask before
tagging/releasing, same as commits.

## When Stuck

- If something isn't working after 2-3 attempts, stop and explain the issue
- Don't keep trying random fixes
- Ask for clarification if requirements are unclear

## Code Changes

- Make minimal changes to accomplish the task
- Don't refactor unrelated code unless asked
- Don't add "nice to have" features
- Preserve existing patterns in the codebase

## Code Review

Review AI-generated code periodically, especially for:

- Security (auth checks, input validation)
- Performance (unnecessary re-renders, N+1 queries)
- Logic errors (edge cases)
- Patterns (matches existing codebase?)
