import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | count-percent', function(hooks) {
  setupRenderingTest(hooks);

  test('it works correctly', async function(assert) {
    this.set('number1', '12');
    this.set('number2', '3');

    await render(hbs`{{count-percent this.number1 this.number2}}`);

    assert.equal(this.element.textContent.trim(), '25%');
  });
});
