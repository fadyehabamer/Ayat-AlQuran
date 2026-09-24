
function showPage() {
  document.getElementById("preloader").style.display = "none";
  document.getElementById("container").style.display = "flex";
}


const text = document.querySelector('.aya')
const surahName = document.querySelector('.surahName')
const next = document.querySelector('.next')
const tweetbtn = document.querySelector('.twitter-share-button')
const arabicNumber = new Intl.NumberFormat('ar-EG')
const playBtn = document.querySelector('.play')
const playIcon = playBtn.querySelector('i')
const playLabel = playBtn.querySelector('.play-label')
const audioStatus = document.querySelector('.audio-status')

const AUDIO_BASE = 'https://everyayah.com/data/Alafasy_64kbps/'
const audio = new Audio()
audio.preload = 'none'
let recitationUrl = ''

const padNumber = (n) => String(n).padStart(3, '0')

const setPlaying = (playing) => {
    playIcon.classList.toggle('fa-play', !playing)
    playIcon.classList.toggle('fa-pause', playing)
    playLabel.textContent = playing ? 'إيقاف مؤقت' : 'استماع للتلاوة'
}

const stopRecitation = () => {
    audio.pause()
    setPlaying(false)
    audioStatus.textContent = ''
}

const toggleRecitation = () => {
    if (!recitationUrl) return
    if (!audio.paused) {
        audio.pause()
        return
    }
    if (audio.src !== recitationUrl) audio.src = recitationUrl
    audioStatus.textContent = 'جارٍ تحميل التلاوة...'
    const playing = audio.play()
    if (playing && playing.catch) {
        playing.catch((err) => {
            if (err && err.name === 'AbortError') return
            console.error(err)
            audioStatus.textContent = 'تعذر تشغيل التلاوة، يرجى المحاولة مرة أخرى.'
            setPlaying(false)
        })
    }
}

audio.addEventListener('play', () => setPlaying(true))
audio.addEventListener('playing', () => { audioStatus.textContent = '' })
audio.addEventListener('waiting', () => { audioStatus.textContent = 'جارٍ تحميل التلاوة...' })
audio.addEventListener('pause', () => setPlaying(false))
audio.addEventListener('ended', () => setPlaying(false))
audio.addEventListener('error', () => {
    if (!recitationUrl || audio.src !== recitationUrl) return
    audioStatus.textContent = 'تعذر تشغيل التلاوة، يرجى المحاولة مرة أخرى.'
    setPlaying(false)
})
playBtn.addEventListener('click', toggleRecitation)
const getQuote = async () => {
    // Chapters are numbered 1..114 (there is no chapter 0).
    let rand = Math.floor(Math.random() * 114) + 1;
    let apiLink = `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${rand}.json`;
    next.disabled = true;
    stopRecitation();
    recitationUrl = '';
    playBtn.disabled = true;
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

        recitationUrl = `${AUDIO_BASE}${padNumber(ayat.id || rand)}${padNumber(ayahNumber)}.mp3`;
        playBtn.disabled = false;

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





