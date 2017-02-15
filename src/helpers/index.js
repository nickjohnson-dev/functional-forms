import {
  curry,
  findIndex,
  get,
  isArray,
  isEmpty,
  isFunction,
  isNumber,
  isString,
} from 'lodash/fp';

export const getErrorsFromField = (field) => {
  if (!field) return [];
  // if (!field.isTouched) return [];
  if (!isFunction(field.getErrors)) return [];

  const errors = field.getErrors(field.value);
  if (isArray(errors)) return errors;
  if (!errors) return [];

  return [errors];
};

export const hideIf = condition => showIf(!condition);

export const getIsFieldValid = field => isEmpty(getErrorsFromField(field));

export const replaceByAccessor = curry((accessor, newItem, items) => {
  if (isFunction(accessor)) {
    return replaceMatch(accessor, newItem, items);
  }

  if (isNumber(accessor) || isString(accessor)) {
    const doPropertiesMatch = item => (
      get(accessor)(item) &&
      get(accessor)(item) === get(accessor)(newItem)
    );
    return replaceMatch(doPropertiesMatch, newItem, items);
  }
  return items;
});

export const replaceById = replaceByAccessor('id');

export function showIf(condition) {
  return result => (condition ? result() : null);
}

function replaceMatch(matchingFn, newItem, items) {
  const index = findIndex(matchingFn)(items);

  if (index === -1) return items;

  return [
    ...items.slice(0, index),
    newItem,
    ...items.slice(index + 1, items.length),
  ];
}
