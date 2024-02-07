let newQuoteBtn = document.getElementById("new-quote");
let quoteContainer = document.getElementById("quote-box");
let quoteText = document.getElementById("quote");
let authorText = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let loader = document.getElementById("loader")
let givenQuotes = [];

newQuoteBtn.addEventListener('click', randomQuote);
twitterBtn.addEventListener('click', tweetQuote);

async function getCodes() {
    loading();
    const url = "https://dummyjson.com/quotes";
    try {
        const response = await fetch(url);
        givenQuotes = await response.json();
        console.log(givenQuotes)
        randomQuote();
    } catch (error) {
        console.log(error);
    }
}

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function action() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
function randomQuote() {
    loading();
    let totalQuotes = givenQuotes.quotes;
    const quotes = totalQuotes[Math.floor(Math.random() * totalQuotes.length)];
    // check the emptiness of the author part
    if (quotes[author] === null) {
        authorText.innerHTML = "Unknown Author"
    } else {
        authorText.innerHTML = quotes.author;
    }
    // check the quote length
    if (quotes.quote.length > 50) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
    quoteText.innerHTML = quotes.quote;
    action();
}

function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(tweetUrl, '_blank');
}


getCodes();
