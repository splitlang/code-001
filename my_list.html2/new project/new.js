
    // Car data
    const cars = [
      {
        image: 'https://example.com/car1.jpg',
        name: 'Toyota Corolla',
        description: 'A reliable and fuel-efficient compact car.',
        price: '$20,000'
      },
      {
        image: 'https://example.com/car2.jpg',
        name: 'Honda Civic',
        description: 'A popular and versatile mid-size sedan.',
        price: '$25,000'
      },
      {
        image: 'https://example.com/car3.jpg',
        name: 'Ford Mustang',
        description: 'A powerful and iconic muscle car.',
        price: '$35,000'
      },
      {
        image: 'https://example.com/car4.jpg',
        name: 'Jeep Wrangler',
        description: 'A rugged and off-road-capable SUV.',
        price: '$30,000'
      }
    ];

   // Function to display car cards
function displayCarCards() {
  const carGallery = document.getElementById('car-gallery');

  cars.forEach(car => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const imgElement = document.createElement('img');
    imgElement.src = car.image;
    imgElement.alt = car.name;
    imgElement.id = 'card-image';

    const cardDetailsElement = document.createElement('div');
    cardDetailsElement.classList.add('card-details');
    cardDetailsElement.style.display = 'none';

    const cardNameElement = document.createElement('h2');
    cardNameElement.id = 'card-name';
    cardNameElement.textContent = car.name;

    const cardDescriptionElement = document.createElement('p');
    cardDescriptionElement.id = 'card-description';
    cardDescriptionElement.textContent = car.description;

    const cardPriceElement = document.createElement('p');
    cardPriceElement.innerHTML = `Price: <span id="card-price">${car.price}</span>`;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = () => hideCardDetails(closeButton);

    cardDetailsElement.appendChild(cardNameElement);
    cardDetailsElement.appendChild(cardDescriptionElement);
    cardDetailsElement.appendChild(cardPriceElement);
    cardDetailsElement.appendChild(closeButton);

    cardElement.appendChild(imgElement);
    cardElement.appendChild(cardDetailsElement);
    cardElement.addEventListener('click', () => showCarDetails(car));

    carGallery.appendChild(cardElement);
  });
}

// Function to display motorcycle cards
function displayMotorcycleCards() {
  const carGallery = document.getElementById('car-gallery');

  motorcycles.forEach(motorcycle => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const imgElement = document.createElement('img');
    imgElement.src = motorcycle.image;
    imgElement.alt = motorcycle.name;
    imgElement.id = 'card-image';

    const cardDetailsElement = document.createElement('div');
    cardDetailsElement.classList.add('card-details');
    cardDetailsElement.style.display = 'none';

    const cardNameElement = document.createElement('h2');
    cardNameElement.id = 'card-name';
    cardNameElement.textContent = motorcycle.name;

    const cardDescriptionElement = document.createElement('p');
    cardDescriptionElement.id = 'card-description';
    cardDescriptionElement.textContent = motorcycle.description;

    const cardPriceElement = document.createElement('p');
    cardPriceElement.innerHTML = `Price: <span id="card-price">${motorcycle.price}</span>`;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = () => hideCardDetails(closeButton);

    cardDetailsElement.appendChild(cardNameElement);
    cardDetailsElement.appendChild(cardDescriptionElement);
    cardDetailsElement.appendChild(cardPriceElement);
    cardDetailsElement.appendChild(closeButton);

    cardElement.appendChild(imgElement);
    cardElement.appendChild(cardDetailsElement);
    cardElement.addEventListener('click', () => showMotorcycleDetails(motorcycle));

    carGallery.appendChild(cardElement);
  });
}