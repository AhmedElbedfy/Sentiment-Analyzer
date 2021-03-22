import { checkURL } from "./checkURL";

// helper function getElement
function getElement(e) {
    return document.querySelector(e);
}

// helper function empty the element
function empElement(e) {
    e.innerHTML = '';
}


// fetching data from the server
const post = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}


const handleSubmit = async (event) => {

    event.preventDefault();

    // get user input value
    const userVal = getElement('#article-url').value;

    // get elements from the dom
    const button = getElement('.btn-submit'),
        text = getElement('#text'),
        agreement = getElement('#agreement'),
        subjectivity = getElement('#subjectivity'),
        confidence = getElement('#confidence'),
        irony = getElement('#irony'),
        scoreTag = getElement('#score_tag');

    // make sure that result is empty before getting the new result from the server for UI propose
    empElement(text);
    empElement(agreement);
    empElement(subjectivity);
    empElement(confidence);
    empElement(irony);
    empElement(scoreTag);

    // log user input
    console.log("--> Form Submitted <--")
    console.log(userVal)

    if (checkURL(userVal)) { // check if it's a link

        // disble button and show loading for the user
        button.disabled = true;
        button.classList.add('btn-disabled')
        text.innerHTML = "Please Wait While Loading";

        // add dot dot dot animation for loading
        const wait = getElement('#wait')
        const dots = window.setInterval(() => {
            if (wait && wait.innerHTML.length > 3)
                wait.innerHTML = "";
            else
                wait.innerHTML += ".";
        }, 300);

        post('http://localhost:8081/test', { url: userVal }) // ask the server for the data
            .then(data => {

                console.log(data);
                console.log(data.text);


                // then load data to the UI
                text.innerHTML = `Text: ${data.text}`;
                agreement.innerHTML = `Agreement: ${data.agreement}`;
                subjectivity.innerHTML = `Subjectivity: ${data.subjectivity}`;
                confidence.innerHTML = `Confidence: ${data.confidence}`;
                irony.innerHTML = `Irony: ${data.irony}`;
                scoreTag.innerHTML = `Score Tag: ${data.score_tag}`;

                // let the button for using again
                button.disabled = false;
                button.classList.remove('btn-disabled')

                // stop loading Interval
                clearInterval(dots);
                wait.innerHTML = '';

                return data;
            })


    } else { // if it's isn't a link alert the user
        alert('Please Enter a Valid URL.');

        return 'Error: Please Enter a Valid URL.';
    }


}

export default handleSubmit;
export { post };