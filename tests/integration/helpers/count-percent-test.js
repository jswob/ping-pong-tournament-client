import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | count-percent', function(hooks) {
  setupRenderingTest(hooks);

  test('it works correctly', async function(assert) {
    assert.expect(1);

    this.set('number1', '12');
    this.set('number2', '3');

    await render(hbs`{{count-percent this.number1 this.number2}}`);

    assert.equal(this.element.textContent.trim(), '25%');
  });

  test('it handles 0 correctly', async function (assert) {
    assert.expect(3);

    this.set('number1', '0');
    this.set('number2', '1');

    await render(hbs`{{count-percent this.number1 this.number2}}`);

    assert.equal(this.element.textContent.trim(), '0%');

    this.set('number1', '1');
    this.set('number2', '0');

    assert.equal(this.element.textContent.trim(), '0%');

    this.set('number1', '0');
    this.set('number2', '0');

    assert.equal(this.element.textContent.trim(), '0%');
  });
});
