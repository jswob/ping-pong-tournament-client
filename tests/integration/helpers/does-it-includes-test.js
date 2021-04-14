import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | does-it-includes', function(hooks) {
  setupRenderingTest(hooks);

  test('it works correctly', async function(assert) {
    assert.expect(2);

    this.set('base', 'some123');
    this.set('query', '23')

    await render(hbs`{{does-it-includes base query}}`);

    assert.equal(this.element.textContent, "true");

    this.set('query', '32');

    assert.equal(this.element.textContent, 'false');
  });
});
