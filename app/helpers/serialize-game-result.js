import { helper } from '@ember/component/helper';

export default helper(function serializeGameResult([result]) {
  result = result.split('/');

  return `${result[0]} vs ${result[1]}`;
});
