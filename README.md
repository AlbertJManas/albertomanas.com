## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


If you want deploy in local, needs create .env.local and configure your server mail url in this env NEXT_PUBLIC_SERVERMAIL_URL

## CV

The PDFs in `public/` are generated from the same dictionaries as the website (`app/[lang]/dictionaries/*.json`) plus the contact data in `scripts/cv-profile.json`. After changing any of them, regenerate both PDFs with:

```bash
npm run cv
```

It needs Microsoft Edge or Google Chrome installed; set `CHROME_PATH` if the browser is not in a standard location.


## Deploy

This project is deployed with vercel and the url [www.albertomanas.com](www.albertomanas.com)