import { helper } from '@ember/component/helper';

export default helper(function countPercent([number1, number2]) {
  const percent = Math.round((number2 / number1) * 100);

  return percent + '%';
});
