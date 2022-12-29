/*
This script does the following:
- Declares a function that creates a new Promise object with a specified delay and position.
- When the form is submitted:
  - Prevents the default form submission behavior.
  - Gets the values of the 'delay', 'step', and 'amount' input fields.
  - Loops through the specified number of times.
  - For each iteration:
    - Calculates the current position and delay.
    - Calls the createPromise function and passes in the current position and delay.
    - If the Promise is resolved, shows a success notification.
    - If the Promise is rejected, shows a failure notification.
*/

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => resolve({ position, delay }), delay);
    } else {
      setTimeout(() => reject({ position, delay }), delay);
    }
  });
}
const formElement = document.querySelector('.form');
formElement.addEventListener('submit', event => {
  event.preventDefault();

  const firstDelay = Number(formElement.delay.value);
  const delayStep = Number(formElement.step.value);
  const amount = Number(formElement.amount.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + delayStep * i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
