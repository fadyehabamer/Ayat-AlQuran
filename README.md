# Ayat Al-Quran (آيات القرآن)

<p align='center'>
  <img src='sc.png' alt='Screenshot of the Ayat Al-Quran app showing a verse and its surah name'>
</p>

A small web app that shows a random verse (آية) from the Holy Quran together with its surah name, surah number and ayah number. Click **التالي** (Next) to get another verse, listen to its recitation, or share the current one on Twitter.

**Live demo:** https://ayat-alquran.vercel.app

## Features
- Picks a random surah (1–114) and a random verse from it
- Shows the surah name, surah number and ayah number (in Arabic-Indic digits)
- Play/pause the recitation of the current verse (Mishary Rashid Alafasy)
- The loading screen disappears as soon as the first verse is ready
- Arabic, right-to-left interface using the Amiri font
- One-click sharing of the current verse to Twitter
- Shows a friendly message if the verse data can't be loaded

## Data source
Verses come from the [`quran-json`](https://www.npmjs.com/package/quran-json) package (v3.1.2), served by the jsDelivr CDN:
`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/<1-114>.json`

Recitation audio (no API key needed) is streamed from [EveryAyah](https://everyayah.com), using the surah and ayah numbers padded to three digits:
`https://everyayah.com/data/Alafasy_64kbps/<SSS><AAA>.mp3` (for example `002255.mp3` for Al-Baqarah 255)

## Tools used
- HTML
- CSS
- JavaScript (Fetch API)

## Run locally
No build step or dependencies are needed. Clone the repo and open `index.html` in a browser, or serve the folder with any static server, for example:

```bash
npx serve .
# or
python3 -m http.server 8000
```
