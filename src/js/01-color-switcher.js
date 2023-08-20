const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timer = null;

startBtn.addEventListener('click', startClick);
stopBtn.addEventListener('click', stopClick);

function startClick(event) {
  event.target.setAttribute('disabled', '');
  timer = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopClick() {
  startBtn.removeAttribute('disabled');
  clearInterval(timer);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
