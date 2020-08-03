const divEl = document.getElementById('container');

function load() {
    const request = getQuizContent('https://run.mocky.io/v3/632e1c5d-fdd4-4e10-a253-803e313bf91a');
    request.onreadystatechange = (res) => {
        if (request.readyState === 4 && request.status === 200) {
            // we want to generate the dom node elements that will represent the html structure of the quiz content.
            callbackFunction(request.responseText);
        }
    }
    request.send();
}


function getQuizContent(url) {
    const http = new XMLHttpRequest();
    http.open('GET', url, true);

    return http;
}

load();

callbackFunction = (response) => {
    const ulEl = document.createElement('ul');
    JSON.parse(response).data.forEach(
        (quizObj) => {
            const liEl = document.createElement('li');
            const questionTextNode = document.createTextNode(quizObj.question);
            liEl.appendChild(questionTextNode);
            makeAnswersTemplate(quizObj, liEl);
            ulEl.appendChild(liEl);
        }
    );

    divEl.appendChild(ulEl);
};

function makeAnswersTemplate(quizObj, liEl) {
    const ulEl = document.createElement('ul');
    quizObj.answers.forEach(
        (answerObj) => {
            const liElAnswer = document.createElement('li');
            const liElTextNode = document.createTextNode(answerObj.answer);
            liElAnswer.appendChild(liElTextNode);
            liElAnswer.onclick = (e) => {
                e.stopPropagation();
                liElAnswer.parentElement.childNodes.forEach(
                    (el) => {
                        el.style.color = 'black';
                    }
                );
                liElAnswer.style.color = answerObj.correctAnswer === true ? 'green' : 'red';
            }
            ulEl.appendChild(liElAnswer);
        }
    );
    liEl.appendChild(ulEl);
}

