import { helper } from '@ember/component/helper';

export default helper(function doesItIncludes([base, query]) {
  return String(base).includes(query);
});
