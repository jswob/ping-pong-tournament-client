import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | increment', function(hooks) {
  setupRenderingTest(hooks);

  test('it increments passed value', async function(assert) {
    this.set('inputValue', 0);

    await render(hbs`{{increment inputValue}}`);

    assert.equal(this.element.textContent.trim(), '1');
  });
});
