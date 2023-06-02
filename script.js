const trips = []; // Array which stores the list of selected destinations
const resultsContainer = document.querySelector('#results');

// Get the las best trip and show it in the HTML
function init() {
  const bestLastTrip = localStorage.getItem('bestTrip');
  if (bestLastTrip) {
    document.querySelector('h1 span').textContent = `The best last trip was ${bestLastTrip}`;
  }
  uploadCountries();
}
init();

// Load the JSON and insert every country in the destination selector
async function uploadCountries() {
  const response = await fetch('./countries.json');
  const countries = await response.json();

  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.name;
    option.textContent = country.name;
    document.querySelector('select').insertAdjacentElement('beforeend', option);
  });
}

// Create a destination with its properties and methods to calculate taxes
class Destination {
  constructor(destination, transport, accommodation) {
    this.destination = destination;
    this.transport = transport;
    this.accommodation = accommodation;
  }
  getSubTotal() {
    return +this.transport + +this.accommodation;
  }
  getTaxes() {
    return +this.getSubTotal() >= 1000 ? +this.getSubTotal() * 0.2 : +this.getSubTotal() * 0.15;
  }
  getTotal() {
    return this.getSubTotal() + this.getTaxes();
  }
}

// Create the HTML markup for every destination
function createMarkup(trips) {
  const results = trips
    .map(trip => {
      const { destination, transport, accommodation } = trip;
      const markup = `
        <div class="result">
          <h2>${destination}</h2>
          <p>Transport: $${transport}</p>
          <p>Accommodation: $${accommodation}</p>
        </div>
    `;
      return markup;
    })
    .join('');
  return results;
}

// Shows the created destination in the HTML
function updateTrips(trips) {
  resultsContainer.innerHTML = '';
  resultsContainer.insertAdjacentHTML('beforeend', createMarkup(trips));
}

// From an array of possible trips, choose the cheapest one and show it in the HTML
// Also stores that destination in the Local Storage
function getBestTrip(trips) {
  if (trips.length > 0) {
    const sortedTrips = trips.sort(function (a, b) {
      return a.getTotal() - b.getTotal();
    });

    const bestTrip = sortedTrips[0];

    resultsContainer.innerHTML = `The best place to go is ${bestTrip.destination}! The total price for this one is $${bestTrip.getTotal()} including taxes($${bestTrip.getTaxes()})`;

    localStorage.setItem('bestTrip', bestTrip.destination);
  } else {
    resultsContainer.innerHTML = `There are no possible trips with this budget`;
  }
}

// Create an object from the form values and use it to create a destination object
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = Object.fromEntries([...new FormData(this)]);
  const { destination, transport, accommodation } = data;
  
  const trip = new Destination(destination, transport, accommodation);

  trips.push(trip);
  updateTrips(trips);
  this.querySelectorAll('input').forEach(input => (input.value = ''));
});

// Create an array with the possible destinations
document.querySelector('#find').addEventListener('click', function () {
  const budget = document.querySelector('#budget');
  const possibleTrips = trips.filter(trip => trip.getTotal() <= +budget.value);
  getBestTrip(possibleTrips);
});
