;(function() {

    const quoteSize = 50;
    let quoteEl = document.querySelector('blockquote');
    let button = document.querySelector('button');
    let quotesArray = [];
    let url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
    

// Gets a fresh quote from url
    function getQuote() {
        fetch(url)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response)
                }
            }).then(function (data) {
                generateQuotes(data);
            }).catch(function (err) {
                quoteEl.textContent = 'Uh-oh. Something went wrong!';
            })
        }

    // Populate quotesArray with unique quote and write new quote to the DOM; reset the quotesArray after it reaches 50 quotes
    function generateQuotes(data) { 
        if (quotesArray.length === quoteSize) {
            quotesArray = [];
        }
        if (!quotesArray.includes(data[0])) {
            quotesArray.push(data[0]);
            quoteEl.textContent = data[0];
        } else {
            getQuote();
        }
    }

    // Generate a quote on initial load
    getQuote();
    
    // Generate another quote on click event
    button.addEventListener('click', getQuote, false);
    
})();