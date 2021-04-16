import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default helper(function highlight([base, highlight]) {

  if (!highlight || !highlight.length) {
    return base;
  }

  const indexOfHighlight = base.indexOf(highlight);

  let baseArray = [
    base.slice(0, indexOfHighlight),
    base.slice(indexOfHighlight + highlight.length, base.length),
  ];

  return htmlSafe(`${baseArray[0]}<strong>${highlight}</strong>${baseArray[1]}`);
});
