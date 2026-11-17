# Great Soatobod Production landing page

Next.js 16 (App Router) + Tailwind 4 + Motion. Trilingual: EN / UZ / RU (`lib/i18n.ts`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel
Push this folder to GitHub, then on vercel.com choose **Add New → Project**, import the repo and click **Deploy**. No settings needed.
Or from the terminal: `npx vercel --prod`.

## Before launch: fill in the placeholders
Anything shown in an amber `{{...}}` chip is a fact the original site did not have. Search the code for `{{` to find them:

| Placeholder | Where |
|---|---|
| Sample reviews and client logos (fictional brands) | `components/Proof.tsx`, `components/BrandLogos.tsx` |
| `{{min_order}}`, `{{printing_options}}`, `{{lead_time}}`, `{{payment_terms}}` | `components/Faq.tsx` |
| `{{privacy_policy}}`, `{{terms_of_service}}` | `app/legal/page.tsx` |

The quote form currently opens the visitor's email app addressed to rayonsabr@gmail.com. To receive leads directly, add an API route (for example a Telegram bot) and call it from `components/QuoteForm.tsx`.
