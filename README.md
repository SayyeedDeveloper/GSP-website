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

## Before launch
The client reviews and logos in `components/Proof.tsx` and `components/BrandLogos.tsx` are fictional samples. Replace them with real, approved reviews.

The quote form currently opens the visitor's email app addressed to rayonsabr@gmail.com. To receive leads directly, add an API route (for example a Telegram bot) and call it from `components/QuoteForm.tsx`.
