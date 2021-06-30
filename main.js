// VARIABLES
let quote = document.querySelector('blockquote');
let button = document.querySelector('button');
let quotesList = [];

// FUNCTIONS
function generateQuote() {
    fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes').then(function(response) {
        // If the response code is 200, return the json data
        if(response.ok) {
            return response.json();
        } else {
            // Otherwise, throw an error status
            throw response.statusText;
        }
    }).then(function(data) {
        let newQuote = data[0];
        // If newly generated quote is a duplicate, then generate a new quote.
        if (quotesList.includes(newQuote)) {
            generateQuote();
            return;
        }
        // Otherwise, push the new quote into the array and render new quote to the DOM.
        quotesList.push(newQuote);
        quote.textContent = newQuote;
    }).catch(function(error) {
        // Render a basic error message to the DOM
        quote.textContent = `Error: ${error}`
    })
}

// Generate quote on initial page load
generateQuote();

// EVENT LISTENERS
button.addEventListener('click', generateQuote)