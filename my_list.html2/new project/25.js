// Car data
const cars = [
  {
    image: 'Toyota corolla',
    name: 'Toyota Corolla',
    description: 'A reliable and fuel-efficient compact car.',
    price: '$20,000'
  },
  {
    image: 'honda',
    name: 'Honda Civic',
    description: 'A popular and versatile mid-size sedan.',
    price: '$25,000'
  },
  {
    image: 'ford mustang',
    name: 'ford mustang',
    description: 'A powerful and iconic muscle car.',
    price: '$35,000'
  },
  {
    image: 'jeep wrangler',
    name: 'Jeep Wrangler',
    description: 'A rugged and off-road-capable SUV.',
    price: '$30,000'
  }
];

// Motorcycle data
const motorcycles = [
  {
    image: 'kawasaki',
    name: 'Kawasaki Ninja H2R',
    description: 'A high-performance, supercharged motorcycle with over 300 horsepower.',
    price: '$55,000'
  },
  {
    image: 'ducati',
    name: 'Ducati Panigale V4',
    description: 'A powerful and technologically advanced superbike.',
    price: '$27,000'
  },
  {
    image: 'yamaha',
    name: 'Yamaha YZF-R1',
    description: 'A track-focused supersport motorcycle with exceptional performance.',
    price: '$17,000'
  },
  {
    image: 'honda',
    name: 'Honda CBR1000RR-R',
    description: 'A high-end superbike with advanced electronics and a powerful engine.',
    price: '$28,000'
  }
];

// Function to display car cards
function displayCarCards() {
  const carGallery = document.getElementById('car-gallery');

  cars.forEach(car => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const imgElement = document.createElement('img');
    imgElement.src = `images/${car.image}.jpg`;
    imgElement.alt = car.name;
    imgElement.id = 'card-image';

    const cardDetailsElement = document.createElement('div');
    cardDetailsElement.classList.add('card-details');
    cardDetailsElement.innerHTML = `
      <h3>${car.name}</h3>
      <p>${car.description}</p>
      <p>Price: ${car.price}</p>
      <button class="close-button">Close</button>
    `;

    cardElement.appendChild(imgElement);
    cardElement.appendChild(cardDetailsElement);
    cardElement.addEventListener('click', () => showCarDetails(car, cardDetailsElement));

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
    imgElement.src = `images/${motorcycle.image}.jpg`;
    imgElement.alt = motorcycle.name;
    imgElement.id = 'card-image';

    const cardDetailsElement = document.createElement('div');
    cardDetailsElement.classList.add('card-details');
    cardDetailsElement.innerHTML = `
      <h3>${motorcycle.name}</h3>
      <p>${motorcycle.description}</p>
      <p>Price: ${motorcycle.price}</p>
      <button class="close-button">Close</button>
    `;

    cardElement.appendChild(imgElement);
    cardElement.appendChild(cardDetailsElement);
    cardElement.addEventListener('click', () => showMotorcycleDetails(motorcycle, cardDetailsElement));

    carGallery.appendChild(cardElement);
  });
}

// Function to show car details
function showCarDetails(car, cardDetailsElement) {
  cardDetailsElement.style.display = 'block';

  const closeButton = cardDetailsElement.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    cardDetailsElement.style.display = 'none';
  });
}

// Function to show motorcycle details
function showMotorcycleDetails(motorcycle, cardDetailsElement) {
  cardDetailsElement.style.display = 'block';

  const closeButton = cardDetailsElement.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    cardDetailsElement.style.display = 'none';
  });
}