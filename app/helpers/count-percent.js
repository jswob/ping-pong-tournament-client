import { helper } from '@ember/component/helper';

export default helper(function countPercent([number1, number2]) {
  let result = 0;
  
  if (!Number(number1)) {
    return result + '%';
  }

  result = Math.round((number2 / number1) * 100);

  return result + '%';
});
