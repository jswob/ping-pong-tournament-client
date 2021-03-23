import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('It redirects from index route before model to menu route', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/menu', 'Route is equal "/menu"');
  });
});
