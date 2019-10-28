;(function() {

    const quoteSize = 50;
    let quoteEl = document.querySelector('blockquote');
    let button = document.querySelector('button');
    let quotesArray = [];
    


    function getQuote() {
        fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response)
                }
            }).then(function (data) {
                generateQuotes(data);
                quoteEl.textContent = data[0];
            }).catch(function (err) {
                quoteEl.textContent = 'Uh-oh. Something went wrong!';
            })
        }

    function generateQuotes(data) { 
        if (quotesArray.length === quoteSize) {
            return quotesArray;
        }
        if (!quotesArray.includes(data[0])) {
            quotesArray.push(data[0]);
        }   
    }

    // Generate a quote on initial load
    getQuote();
    
    // Generate another quote on click event
    button.addEventListener('click', getQuote, false);
    
})();