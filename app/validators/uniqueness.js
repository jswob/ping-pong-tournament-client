import { capitalize } from '@ember/string';

export default function validateUniqueness({ on }) {
  return (key, newValue, _oldValue, changes) => {
    const errorMessage = `${capitalize(key)} can't be the same as ${capitalize(
      on
    )}`;
    let response = true;

    if (changes[on] && newValue && newValue.id === changes[on].id) {
      response = errorMessage;
    }

    return response;
  };
}