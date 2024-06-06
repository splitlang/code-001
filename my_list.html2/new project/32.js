const express = require('express');
const app = express();
const port = 3000;

// Sample car data
const cars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: '$20,000',
    description: 'A reliable and fuel-efficient compact car.'
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    price: '$25,000',
    description: 'A popular and versatile mid-size sedan.'
  },
  {
    id: 3,
    make: 'Ford',
    model: 'Mustang',
    year: 2023,
    price: '$35,000',
    description: 'A powerful and iconic muscle car.'
  },
  {
    id: 4,
    make: 'Jeep',
    model: 'Wrangler',
    year: 2022,
    price: '$30,000',
    description: 'A rugged and off-road-capable SUV.'
  }
];

app.get('/api/cars', (req, res) => {
  const searchTerm = req.query.q;
  const filteredCars = cars.filter(car =>
    `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.json(filteredCars);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});