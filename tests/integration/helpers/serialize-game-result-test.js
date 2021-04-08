import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | serialize-game-result', function(hooks) {
  setupRenderingTest(hooks);

  test('it serializes game result correctly', async function(assert) {
    this.set('inputValue', '1/2');

    await render(hbs`{{serialize-game-result inputValue}}`);

    assert.equal(this.element.textContent.trim(), '1 vs 2');
  });
});
