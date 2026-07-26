# PrivacyWatch — Adtech Privacy Compliance Intelligence

A real-time regulatory monitoring tool for privacy lawyers and compliance professionals who advise the adtech ecosystem. Tracks CPPA, EDPB, FTC, ICO, IAB, W3C, and IAPP developments with citations to primary sources.

**Live site:** [sravanprat.github.io/privacy-watch](https://sravanprat.github.io/privacy-watch/) · [About page](https://sravanprat.github.io/privacy-watch/about.html)

---

## The problem it solves

Adtech privacy lawyers today track six overlapping jurisdictions (California, EU, UK, and a growing list of US states) simultaneously — while standards bodies like IAB Europe and W3C rewrite the technical foundations every six months. Enforcement from CPPA, ICO, and EDPB is accelerating at the same time.

No single tool connected all of it. PrivacyWatch does.

---

## What's inside

### Regulation Radar
A curated feed of active adtech regulatory developments — EFFECTIVE rules, open CONSULTATIONs, and ENFORCEMENT actions — with:
- Source and jurisdiction labels (CPPA, EDPB, ICO, FTC…)
- Priority flags (Urgent / High / Medium)
- Action item summarising what clients need to do
- Deadline date
- Statutory citation (e.g., `Cal. Civ. Code § 1798.185(a)(16)`)
- Verified links to primary source documents

### Standards Tracker
Version-by-version status of the technical standards that adtech systems run on:

| Standard | Current | Next |
|---|---|---|
| IAB Europe TCF | v2.2 (stable) | v3.0 (consultation, deadline Aug 15) |
| IAB GPP | v1.1 (stable) | v1.2 (draft) |
| Google Privacy Sandbox | Stable | Ongoing |
| Apple ATT / Privacy Manifests | iOS 18 | iOS 19 (preview) |
| OpenRTB / AdsCert | v2.6 (stable) | v3.0 (rollout) |

Each standard links to the official spec on GitHub or the standards body's site.

### Deadline Tracker
Upcoming compliance deadlines sorted by days remaining — CPPA risk assessments, ICO remediation windows, IAB consultation closing dates, FTC rulemaking votes — each with statutory citation and source link.

### Content Search
Type any term into the right-hand panel and search across all regulations, standards, deadlines, and live feed simultaneously. Results highlight matched terms and surface citations. Works entirely client-side — no server, no API call.

### Live Feed
Auto-syncs every 10 minutes from:
- **FTC** press releases
- **IAPP** news
- **IAB Tech Lab** updates

New items trigger an alert badge and optional browser notification.

### Feedback
A built-in feedback form delivers responses directly to the maintainer. Powered by [FormSubmit.co](https://formsubmit.co) — no account required, no data stored on third-party servers beyond delivery.

---

## Data sources

| Source | Coverage |
|---|---|
| **FTC** | Commercial Surveillance rulemaking, enforcement actions, data broker regulation |
| **CPPA** | CPRA regulations, ADMT rules, adtech audit initiative, GPC enforcement |
| **EDPB** | GDPR guidelines, legitimate interest decisions, DPA coordination |
| **IAB Europe / Tech Lab** | TCF framework, GPP, OpenRTB, AdsCert, sellers.json |
| **ICO** | UK GDPR enforcement, adtech RTB investigation, SSP notices |
| **W3C** | GPC specification, Privacy Sandbox, Privacy CG working group |
| **IAPP** | Legislative tracker, APRA updates, state law developments |

---

## Key regulatory items currently tracked

- **CPPA ADMT Regulations** — Effective July 1, 2026. Risk assessments due Sept 29. *(Cal. Civ. Code § 1798.185(a)(16))*
- **EDPB Guidelines 1/2024** — Legitimate interest confirmed invalid for cross-context behavioral advertising. *(GDPR Art. 6(1)(f))*
- **IAB Europe TCF v3.0** — Public consultation open until Aug 15, 2026. LI removal affects ~65% of current TCF signals.
- **ICO SSP Enforcement Notices** — 90-day remediation window ends Sept 18, 2026. *(UK GDPR Art. 6(1), Art. 28)*
- **FTC Commercial Surveillance Rule** — Final vote expected Q4 2026. Adtech intermediaries in scope as "covered entities." *(FTC Act § 18)*
- **W3C GPC Candidate Recommendation** — Legally required opt-out signal in CA, CO, CT, MT. *(Cal. Civ. Code § 1798.135(c))*

---

## Tech

Single-file static site — no build step, no dependencies, no backend.

```
privacy-watch/
├── index.html    # Main app (Regulation Radar, Standards Tracker, search, alerts)
└── about.html    # About / landing page
```

**Stack:**
- Vanilla HTML/CSS/JavaScript
- Inter + JetBrains Mono (Google Fonts)
- RSS sync via [allorigins.win](https://api.allorigins.win) CORS proxy
- Form submissions via [FormSubmit.co](https://formsubmit.co)
- Deployed on GitHub Pages

**Design system:** Legal Professional theme — warm ivory (`#F8F6F1`), deep navy (`#1A2744`), legal gold (`#C4973B`), muted professional source colors. Dark mode available via toggle.

---

## Running locally

```bash
git clone https://github.com/sravanprat/privacy-watch.git
cd privacy-watch
open index.html    # macOS
# or: python3 -m http.server 8000 → http://localhost:8000
```

No install step. No build. Open the file.

> RSS live feed requires an HTTP context (not `file://`). Run via `python3 -m http.server` to test live sync locally.

---

## Deploying your own copy

Hosted on GitHub Pages from the `main` branch root. To deploy your own:

1. Fork this repo
2. Go to **Settings → Pages → Source: Deploy from branch → main / root**
3. Your copy is live at `https://{your-username}.github.io/privacy-watch/`

To redirect feedback emails to your address, change the endpoint in `index.html`:

```js
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/your@email.com';
```

The first submission sends a one-time activation email to that address. Click Activate — done.

---

## Disclaimer

> **AI-generated content.** Regulatory summaries, action items, and deadlines are AI-generated and may be incomplete, outdated, or imprecise. Always verify against primary sources before relying on this content for legal advice. Every item includes citation links to the authoritative source — use them. This tool is not a substitute for independent legal research or professional judgment.

Citation links have been manually verified against official government and standards body URLs.

---

## Feedback

Use the **Share Feedback** button in the app, or open an issue on this repo.

The site is in beta. Inaccuracies, broken links, and missing developments are all welcome as reports.
