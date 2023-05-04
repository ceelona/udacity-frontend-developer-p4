import { isUrlValid } from './urlValidator'

const handleSubmit = async (event) => {
    event.preventDefault()

    const baseURL = "http://localhost:8081/api";
    const url = document.getElementById('url').value;

    if (!isUrlValid(url)) {
        console.log(document.getElementsByClassName('results-container'))
        document.getElementsByClassName('results-container')[0].style.display = 'none';
        alert("Please insert a valid URL")
        return;
    }

    document.getElementsByClassName('results-container')[0].style.display = 'block';
    document.getElementById('agreement').innerHTML = 'loading...';
    document.getElementById('subjectivity').innerHTML = 'loading...';
    document.getElementById('confidence').innerHTML = 'loading...';
    document.getElementById('irony').innerHTML = 'loading...';

    try {
        const res = await fetch(baseURL, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: url})
        })

        const { status, agreement, subjectivity, confidence, irony, sentence_list } = await res.json();
        
        if(status.code && status.code !== '0' && status.msg) {
            alert(status.msg);
        }

        const text = sentence_list && sentence_list[0].text

        document.getElementById('agreement').innerHTML = agreement || '-';
        document.getElementById('subjectivity').innerHTML = subjectivity || '-';
        document.getElementById('confidence').innerHTML = confidence || '-';
        document.getElementById('irony').innerHTML = irony || '-';
        document.getElementById('text').innerHTML = text ? 'Example Text: ' + text : '-';
        document.getElementById('text').style.display = text ? 'block' : 'none';
    } catch (err) {
        console.error(err);
    }
}

export { handleSubmit }