// Імпорт необхідних бібліотек
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Отримання доступу до елементів інтерфейсу
const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Конвертер мілісекунд в Години
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція, що додає '0' до односимвольних чисел
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Ініціалізація бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startButton.disabled = false;
  },
};

flatpickr(datetimePicker, options);

let timer;
let timeRemained;

// Функція, що веде відлік часу
const updateTime = () => {
  if (timeRemained <= 0) {
    clearInterval(timer);
    Notiflix.Notify.success('Countdown finished!');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemained);

  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);

  timeRemained -= 1000;
};

// Функція запуску Таймеру
const startTimer = () => {
  clearInterval(timer);
  startButton.disabled = true;

  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();
  timeRemained = selectedDate.getTime() - currentDate.getTime();

  timer = setInterval(updateTime, 1000);
};

// Прікріплення Слухача подій на кнопку "Start"
startButton.addEventListener('click', startTimer);
