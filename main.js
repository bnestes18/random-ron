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
        /* Once quotes array reaches 50, remove the first quote so that there will always be
        at most 50 quotes, but still unique */
        if (quotesList.length > 49) {
            quotesList.shift();
        }
        
        let newQuote = data[0];
        // If newly generated quote is a duplicate, then generate a new quote.
        if (quotesList.includes(newQuote)) {
            generateQuote();
            return;
        }
        // Otherwise, push the new quote into the array and render new quote to the DOM.
        quotesList.push(newQuote);
        console.log(quotesList);
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