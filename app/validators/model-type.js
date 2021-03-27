export default function validateModelType({ type }) {
  return (key, newValue) => {
    if (
      newValue &&
      newValue.constructor &&
      newValue.constructor.toString() &&
      newValue.constructor.toString().split(':')[1] === type
    )
      return true;
    return `${capitalize(key)} must have correct type`;
  };
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
