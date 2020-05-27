function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = getValue('#name');
    console.log(formText);
    if (Client.checkForName(formText)) {
        console.log("::: Form Submitted :::")
        postData('http://localhost:8081/nlp', { url: formText })
            // .then(res => res.json())
            .then(function (newData) {
                updateUI(newData);
            })
 
    }
    else {
        return false;
    }

}

const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async () => {
    const request = await fetch('http://localhost:8081/all');
    try {
        const allData = await request.json();
        const lastIndex = allData.length - 1;
        console.log(allData[lastIndex].polarity);
        document.querySelector('#polarity').innerHTML = `Polarity: ${allData[lastIndex].polarity}`;
        document.querySelector('#subjectivity').innerHTML = `Subjectivity: ${allData[lastIndex].polarity}`;
        document.querySelector('#polarity_confidence').innerHTML = `Polarity Confidence: ${allData[lastIndex].polarity_confidence}`;
        document.querySelector('#subjectivity_confidence').innerHTML = `Subjectivity Confidence: ${allData[lastIndex].subjectivity_confidence}`;
        document.querySelector('#text').innerHTML = `Text: ${allData[lastIndex].text}`;

    } catch (error) {
        console.log("error", error);
    }
}

function getValue(id) {
    const value = document.querySelector(id).value;
    return value;
}

export { getValue }
export { handleSubmit }


