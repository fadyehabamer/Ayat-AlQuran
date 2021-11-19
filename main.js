
var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("preloader").style.display = "none";
  document.getElementById("container").style.display = "flex";
}


const text = document.querySelector('.aya')
const surahName = document.querySelector('.surahName')
const next = document.querySelector('.next')
const tweetbtn = document.querySelector('.twitter-share-button')
const getQuote = async () => {
    let rand = Math.floor(Math.random() * 114);
    let apiLink = `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${rand}.json`;
    const res = await fetch(apiLink);
    const ayat = await res.json();
    // console.log(ayat.verses)

    let randomAya = Math.floor(Math.random() * ayat.verses.length);


    text.innerHTML = ayat.verses[randomAya].text;
    surahName.innerHTML = `سورة ${ayat.name}`

    tweetbtn.href = `https://twitter.com/intent/tweet?text=${text.innerHTML} - ${surahName.innerHTML}`
};

next.addEventListener('click', getQuote)
getQuote();





