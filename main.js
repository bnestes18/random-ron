let quote = document.querySelector('blockquote');
let button = document.querySelector('button')
console.log(quote)

function generateQuote() {
    fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes').then(function(response) {
        // If the response code is 200, return the json data
        if(response.ok) {
            return response.json();
        } else {
            // Otherwise, return throw an error message
            return response.text().then(function(json) {
                throw json;
            })
        }
    }).then(function(data) {
        quote.textContent = data[0];
    }).catch(function(error) {
        // Render an error message to the DOM
        quote.textContent = `Error: ${error}`
    })
}

// Generate quote on initial page load
generateQuote();

button.addEventListener('click', generateQuote)