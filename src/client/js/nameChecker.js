function checkForName(inputText) {
    if (checkRegExp(inputText)) {
        return true;
    }
    else {
        alert('Please make sure URL is formatted properly. ie https://www.example.com/article');
        document.querySelector('#polarity').innerHTML = '';
        document.querySelector('#subjectivity').innerHTML = '';
        document.querySelector('#polarity_confidence').innerHTML = '';
        document.querySelector('#subjectivity_confidence').innerHTML = '';
        document.querySelector('#text').innerHTML = '';
        return false;

    }
}

function checkRegExp(input) {
    let regexp = new RegExp('^(http|https)://');
   return (regexp.test(input));
}

export { checkRegExp }
export { checkForName }
