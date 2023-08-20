import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', '');

let timer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.info('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      let timeDifference = selectedDates[0] - new Date();

      startBtn.addEventListener('click', () => {
        timer = setInterval(() => {
          timeDifference -= 1000;
          const time = convertMs(timeDifference);
          const { days, hours, minutes, seconds } = time;
          inputs.days.textContent = addLeadingZero(days);
          inputs.hours.textContent = addLeadingZero(hours);
          inputs.minutes.textContent = addLeadingZero(minutes);
          inputs.seconds.textContent = addLeadingZero(seconds);
          timeDifference < 1000 && clearInterval(timer);
        }, 1000);
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
