export default function validateUniqueness({ on }) {
  return (key, newValue, _oldValue, changes) => {
    const errorMessage = `${capitalize(key)} can't be the same as ${capitalize(on)}`;

    if (!newValue) return true;

    if (changes[on] && newValue.id === changes[on].id) return errorMessage;

    return true;
  };
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
