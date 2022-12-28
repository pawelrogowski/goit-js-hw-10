/*
This code does the following:
- Changes the background color of the body element to a random color every second when the "Start" button is clicked.
- Stops changing the color when the "Stop" button is clicked.
- Enables or disables the buttons accordingly.
- Handles the click event of the buttons and toggles their state and starts or stops the interval.
*/

const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;

startButton.disabled = false;
stopButton.disabled = true;

function toggleButtonState(...buttons) {
  buttons.forEach(function (button) {
    button.disabled = !button.disabled;
  });
}

function handleButtonClick(event) {
  const target = event.target;

  if (target === startButton) {
    toggleButtonState(startButton, stopButton);
    changeBackgroundColor();
    intervalId = setInterval(changeBackgroundColor, 1000);
  } else if (target === stopButton) {
    toggleButtonState(startButton, stopButton);
    clearInterval(intervalId);
  }
}

startButton.addEventListener('click', handleButtonClick);
stopButton.addEventListener('click', handleButtonClick);
