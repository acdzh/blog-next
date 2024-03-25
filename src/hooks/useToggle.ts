import { useReducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: boolean): boolean =>
  typeof nextValue === 'boolean' ? nextValue : !state;
export const useToggle = function (initialValue: boolean) {
  return useReducer(toggleReducer, initialValue);
};
