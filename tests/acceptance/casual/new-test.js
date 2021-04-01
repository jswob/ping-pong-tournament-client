import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | casual/new', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('It is possible to visist /casual/new', async function (assert) {
    assert.expect(1);

    await visit('/casual/new');

    assert.equal(currentURL(), '/casual/new');
  });

  test('/casual/new route presents itself correctly', async function (assert) {
    assert.expect(3);

    await visit('/casual/new');

    assert.dom('[data-test-casual-new-layout]').exists();
    assert
      .dom('[data-test-casual-new-layout] > [data-test-main-header]')
      .hasText('New Game');

    assert.dom('[data-test-create-casual-game]').exists();
  });
});
