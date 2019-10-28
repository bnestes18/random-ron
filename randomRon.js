;(function() {

    let quoteEl = document.querySelector('blockquote');
    let button = document.querySelector('button');

    function getQuote() {
        fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response)
            }
        }).then(function (data) {
            quoteEl.textContent = data;
        }).catch(function (err) {
            quoteEl.textContent = 'Uh-oh. Something went wrong!';
        })
    }

    getQuote();
    
    button.addEventListener('click', getQuote, false);
    

})();