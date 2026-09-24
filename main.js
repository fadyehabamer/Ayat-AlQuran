
function showPage() {
  document.getElementById("preloader").style.display = "none";
  document.getElementById("container").style.display = "flex";
}


const text = document.querySelector('.aya')
const surahName = document.querySelector('.surahName')
const next = document.querySelector('.next')
const tweetbtn = document.querySelector('.twitter-share-button')
const arabicNumber = new Intl.NumberFormat('ar-EG')
const getQuote = async () => {
    // Chapters are numbered 1..114 (there is no chapter 0).
    let rand = Math.floor(Math.random() * 114) + 1;
    let apiLink = `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${rand}.json`;
    next.disabled = true;
    try {
        const res = await fetch(apiLink);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const ayat = await res.json();

        let randomAya = Math.floor(Math.random() * ayat.verses.length);

        const verse = ayat.verses[randomAya];
        const ayaText = verse.text;
        const ayahNumber = verse.id || randomAya + 1;
        const surahLabel = `سورة ${ayat.name} (${arabicNumber.format(ayat.id || rand)}) - الآية ${arabicNumber.format(ayahNumber)}`;

        text.textContent = ayaText;
        surahName.textContent = surahLabel;

        tweetbtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${ayaText} - ${surahLabel}`)}`
    } catch (err) {
        console.error(err);
        text.textContent = 'تعذر تحميل الآية، يرجى التحقق من الاتصال والمحاولة مرة أخرى.';
        surahName.textContent = '';
    } finally {
        next.disabled = false;
        showPage();
    }
};

next.addEventListener('click', getQuote)
getQuote();





