// Отримаємо доступ до елементів інтерфейсу
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

stopButton.disabled = true;
let interval; // ініціалізація Інтервалу

// Рандомайзер кольорів
const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

// Функція що змінює колір сторінки
const changeColor = () =>
  (document.body.style.backgroundColor = getRandomHexColor());

// Функція, що запускає зміну кольору
const startColorizer = () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  changeColor();
  interval = setInterval(changeColor, 1000);
};

// Функція, що зупиняє зміну кольору
const stopColorizer = () => {
  startButton.disabled = false;
  stopButton.disabled = false;
  clearInterval(interval);
};

// Сдухачі подій на кнопки "Start" та "Stop"
startButton.addEventListener('click', startColorizer);
stopButton.addEventListener('click', stopColorizer);
