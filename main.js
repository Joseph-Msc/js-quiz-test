const divEl = document.getElementById('container');

function load(callback) {
    const request = getQuizContent('https://run.mocky.io/v3/632e1c5d-fdd4-4e10-a253-803e313bf91a');
    request.onreadystatechange = (res) => {
        // we want to generate the dom node elements that will represent the html structure of the quiz content.
        callback(request.responseText);
    }
    request.send();
}


function getQuizContent(url) {
    const http = new XMLHttpRequest();
    http.open('GET', url, true);

    return http;
}

load((response) => {
        const ulEl = document.createElement('ul');
        JSON.parse(response).data.forEach(
            (quizObj) => {
                const liEl = document.createElement('li');
                const questionTextNode = document.createTextNode(quizObj.question);
                liEl.appendChild(questionTextNode);
                getAnwers(quizObj, liEl);
                ulEl.appendChild(liEl);
            }
        );
        
        divEl.appendChild(ulEl);
    }
);

function getAnwers(quizObj, liEl) {
    const ulEl = document.createElement('ul');
    quizObj.answers.forEach(
        (answerObj) => {
            const liElAnswer = document.createElement('li');
            const liElTextNode = document.createTextNode(answerObj.answer);
            liElAnswer.appendChild(liElTextNode);
            ulEl.appendChild(liElAnswer);
        }
    );
    liEl.appendChild(ulEl);
}

