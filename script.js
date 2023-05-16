const budget = document.querySelector('#budget');

const destination = document.querySelector('#destination');

const transport = document.querySelector('#transport');
const accommodation = document.querySelector('#accommodation');
const food = document.querySelector('#food');
const travel = document.querySelector('#travel');
const result = document.querySelector('#result');
const user = prompt("Hello, ¿What's your name?");

const inputs = Array.from(document.querySelectorAll('input'));
console.log(inputs);
function addExpenses(transport, accommodation, food) {
  return transport + accommodation + food;
}

travel.addEventListener('click', function (e) {
  e.preventDefault();

  // Fields validation
  if (inputs.some(input => !input.value.trim())) alert('Please fill all the inputs');

  const expenses = addExpenses(+transport.value, +accommodation.value, +food.value);

  // let totalExpenses = 0;

  // for (let index = 0; index < expenses.length; index++) {
  //   totalExpenses = totalExpenses + expenses[index];
  // }

  if (expenses > parseInt(budget.value)) {
    result.innerHTML = user + ' lo sentimos, no puedes viajar a ' + destination.value + ' te falta ' + (expenses - parseInt(budget.value));
  } else {
    result.innerHTML = user + ' felicidades! Puedes viajar a ' + destination.value + ' y te sobra ' + (parseInt(budget.value) - expenses);
  }
});
