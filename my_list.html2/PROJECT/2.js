const cardContainer = document.getElementById('card-container');

const cards = [
  {
    image: 'https://unsplash.com/photos/gray-car-FcyipqujfGg',
    title: 'cars',
    text: 'This is the first card.',
  },
  {
    image: 'path/to/image2.jpg',
    title: 'Bikes',
    text: 'This is the second card.',
  },
  {
    image: 'path/to/image3.jpg',
    title: 'Other Motors',
    text: 'This is the third card.',
  },
];

cards.forEach((card) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');

  const cardImage = document.createElement('img');
  cardImage.classList.add('card-image');
  cardImage.src = card.image;
  cardImage.alt = card.title;
  cardElement.appendChild(cardImage);

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = card.title;
  cardContent.appendChild(cardTitle);

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.textContent = card.text;
  cardContent.appendChild(cardText);

  cardElement.appendChild(cardContent);
  cardContainer.appendChild(cardElement);
});

const cardElements = document.querySelectorAll('.card');
let cardWidth = 0;

cardElements.forEach((card) => {
  if (card.offsetWidth > cardWidth) {
    cardWidth = card.offsetWidth;
  }
});

cardContainer.style.justifyContent = 'space-between';
cardContainer.style.width = `${cardWidth * cards.length}px`;