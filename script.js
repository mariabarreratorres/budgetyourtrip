const userName = prompt("Hello, ¿What's your name?");

const budgetInput = document.querySelector('#budget');
const foodInput = document.querySelector('#food');

const showMeBtn = document.querySelector('#travel');
const result = document.querySelector('#result');

const destInput1 = document.querySelector('#destination1');
const destInput2 = document.querySelector('#destination2');
const destInput3 = document.querySelector('#destination3');

const transInput1 = document.querySelector('#transport1');
const transInput2 = document.querySelector('#transport2');
const transInput3 = document.querySelector('#transport3');

const accomInput1 = document.querySelector('#accommodation1');
const accomInput2 = document.querySelector('#accommodation2');
const accomInput3 = document.querySelector('#accommodation3');

const destination1 = {
  destination: '',
  transport: 0,
  accommodation: 0,
  total: 0,
};

const destination2 = {
  destination: '',
  transport: 0,
  accommodation: 0,
  total: 0,
};

const destination3 = {
  destination: '',
  transport: 0,
  accommodation: 0,
  total: 0,
};

function addExpenses(expenses) {
  return expenses[0] + expenses[1] + expenses[2];
}

function getLessCost(exp1, exp2, exp3) {
  let lessCost = exp1;

  if (exp1 > exp2) {
    lessCost = exp2;
  }
  if (exp2 > exp3) {
    lessCost = exp3;
  }

  return lessCost;
}

showMeBtn.addEventListener('click', function (e) {
  e.preventDefault();

  destination1.destination = destInput1.value;
  destination1.transport = +transInput1.value;
  destination1.accommodation = +accomInput1.value;

  destination2.destination = destInput2.value;
  destination2.transport = +transInput2.value;
  destination2.accommodation = +accomInput2.value;

  destination3.destination = destInput3.value;
  destination3.transport = +transInput3.value;
  destination3.accommodation = +accomInput3.value;

  const destination1Exps = [+food.value, destination1.transport, destination1.accommodation];
  const destination2Exps = [+food.value, destination2.transport, destination2.accommodation];
  const destination3Exps = [+food.value, destination3.transport, destination3.accommodation];

  destination1.total = addExpenses(destination1Exps);
  destination2.total = addExpenses(destination2Exps);
  destination3.total = addExpenses(destination3Exps);

  const lessBudgetOption = getLessCost(destination1.total, destination2.total, destination3.total);

  console.log(destination1, destination2, destination3);

  const lowestCostDestination = [destination1, destination2, destination3].find(dest => {
    return dest.destination && dest.total <= +budgetInput.value;
  });

  console.log(lowestCostDestination);

  if (lowestCostDestination) {
    result.textContent = `${userName}, the best place to go is ${lowestCostDestination.destination} and you will still have $${+budgetInput.value - lowestCostDestination.total}`;
  } else {
    result.textContent = `We are very sorry ${userName}, there are no places you can go`;
  }
});
