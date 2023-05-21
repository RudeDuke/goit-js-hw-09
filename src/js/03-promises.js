// Імпорт необхідної бібліотеки
import Notiflix from 'notiflix';

// Отримання доступу до елементів інтерфейсу
const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

// Конструктор Промісів
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

// Функція валідації інпутів
const validateInput = event => {
  const target = event.target;
  const inputValue = parseInt(target.value);

  if ((target.name === 'step' || target.name === 'delay') && inputValue < 0) {
    Notiflix.Notify.failure(
      `❌ You cannot enter negative values in this field`
    );
    target.value = 0;
  } else if (target.getAttribute('name') === 'amount' && inputValue <= 0) {
    Notiflix.Notify.failure(
      '❌ Only positive values can be entered in this field'
    );
    target.value = 1;
  }
};

// Генератор Промісів
const promiseGenerator = event => {
  event.preventDefault();
  const firstDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  for (let i = 0; i < amount; i++) {
    const position = i;
    const delay = firstDelay + (i - 1) * step;

    createPromise(position, delay);
  }
};

// Закріплення необхідних Слухачів подій
form.addEventListener('submit', promiseGenerator);
form.addEventListener('input', validateInput);
