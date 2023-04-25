const budget = document.querySelector('#budget');

const destination = document.querySelector('#destination');

const transport = document.querySelector('#transport');
const accommodation = document.querySelector('#accommodation');
const food = document.querySelector('#food');
const travel = document.querySelector('#travel');

const result = document.querySelector('#result');

travel.addEventListener('click', function () {
  const expenses = [parseInt(transport.value), parseInt(accommodation.value), parseInt(food.value)];

  let totalExpenses = 0;

  for (let index = 0; index < expenses.length; index++) {
    totalExpenses = totalExpenses + expenses[index];
  }

  if (totalExpenses > parseInt(budget.value)) {
    result.innerHTML = 'Lo sentimos, no puedes viajar a ' + destination.value + ' te falta ' + (totalExpenses - parseInt(budget.value));
  } else {
    result.innerHTML = 'Felicidades! Puedes viajar a ' + destination.value + ' y te sobra ' + (parseInt(budget.value) - totalExpenses);
  }
});
