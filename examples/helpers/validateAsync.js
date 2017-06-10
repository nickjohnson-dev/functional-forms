import includes from 'lodash/fp/includes';

const foods = [
  'Burgers',
  'Pizza',
  'Ramen',
];

export function validateAsync(delay, food) {
  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      window.clearTimeout(timeout);

      if (includes(food, foods)) {
        resolve('');
        // resolve(`We have plenty of ${food}!`);
      }

      resolve(`There is no ${food} available :(`);
    }, delay);
  });
}
