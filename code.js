const articles = document.querySelector('.articles');
const content = document.createElement('p');

// Navbar toggle action
document.querySelector('#nav-toggler').addEventListener('click', () => document.querySelector('.navbar').classList.toggle('navbar-toggle'));
// Navbar toggle action

// Event listeners to nav buttons
document.getElementById('home').addEventListener('click', () => switchContent('home'));
document.getElementById('business').addEventListener('click', () => switchContent('business'));
document.getElementById('technology').addEventListener('click', () => switchContent('technology'));
document.getElementById('entertainment').addEventListener('click', () => switchContent('entertainment'));
// Event listeners to nav buttons

switchContent();

// Function for switching between content
function switchContent(key) {
  switch (key) {
    case 'home':
      getArticles('https://newsapi.org/v2/top-headlines?country=us&apiKey=');
      break;
    case 'business':
      getArticles('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=');
      break;
    case 'technology':
      getArticles('https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=');
      break;
    case 'entertainment':
      getArticles('https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=');
      break;

    default:
      getArticles('https://newsapi.org/v2/top-headlines?country=us&apiKey=');
      break;
  }
}
// Function for switching content

// Function for fetching data from API
function getArticles(URL) {
  const API_KEY = 'e7fd99f559384c2a88bdac202ed613f4';
  const news = [];

  fetch(URL + API_KEY)
    .then((response) => response.json())
    .then((response) => {
      if (response.status === 'ok') {
        const json = response.articles;
        json.forEach((article) => {
          news.push(article);
        });
        showArticles(news);
      } else {
        alert('Error retrieving articles!');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
// Function for fetching data from API

// Function for displaying all articles in articles div
function showArticles(news) {
  console.log(history);
  resetState();
  news.forEach((article) => {
    let title = document.createElement('h2');
    let oneArticle = document.createElement('div');
    let element = document.createElement('div');

    // Adds attributes to each article
    oneArticle.setAttribute('class', 'article');
    element.setAttribute('class', 'a');

    // Adds click listener to each article
    element.addEventListener('click', () => {
      ShowSelectedArticle(article);
    });

    title.textContent = article.title;
    element.append(title);
    oneArticle.append(element);
    articles.append(oneArticle);
  });
}

// Function for displaying seleted article
function ShowSelectedArticle(article) {
  resetState();
  let title = document.createElement('h1');
  let description = document.createElement('p');
  let content = document.createElement('p');
  let img = document.createElement('img');
  let newsArticle = document.createElement('div');
  let url = document.createElement('a');

  img.setAttribute('src', article.urlToImage);
  img.setAttribute('class', 'newsImage');
  newsArticle.setAttribute('class', 'newsArticle');
  url.setAttribute('href', article.url);
  url.setAttribute('target', '_blank');

  url.textContent = 'Read more';

  title.textContent = article.title;
  description.textContent = article.description;
  if (article.content) {
    content.textContent = article.content.slice(0, -13);
  }
  content.append(url);
  newsArticle.append(title, description, img, content);

  articles.append(newsArticle);
}
// Function for showing seleted article

// Function for reseting articles
function resetState() {
  while (articles.firstChild) {
    articles.removeChild(articles.firstChild);
  }
}
// Function for reseting articles
