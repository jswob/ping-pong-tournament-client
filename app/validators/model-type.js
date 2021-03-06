import { capitalize } from '@ember/string';

export default function validateModelType({ type }) {
  return (key, newValue) => {
    if (
      newValue &&
      newValue.constructor &&
      newValue.constructor.toString() &&
      newValue.constructor.toString().split(':')[1] === type
    ) {
      return true;
    } else {
      return `${capitalize(key)} must have correct type`;
    }
  };
}
