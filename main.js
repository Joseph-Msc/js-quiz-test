const divEl = document.getElementById('container');
const request = getQuizContent('https://run.mocky.io/v3/7449edd2-32c6-4404-a77f-6b4d088f1cb0');
request.onreadystatechange = () => {
  // we want to generate the dom node elements that will represent the html structure of the quiz content.
  //
}
request.send();

function getQuizContent(url) {
  const http = new XMLHttpRequest();
  http.open('GET', url, true);

  return http;
}
