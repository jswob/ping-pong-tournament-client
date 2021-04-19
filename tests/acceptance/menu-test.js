import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | menu', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('User can visit /menu route', async function (assert) {
    assert.expect(1);

    await visit('/menu');

    assert.equal(currentURL(), '/menu');
  });

  test('/menu route presents itself correctly', async function (assert) {
    assert.expect(9);

    await visit('/menu');

    assert.dom('[data-test-menu-page-layout]').exists();
    assert
      .dom('[data-test-menu-page-layout] > [data-test-main-header]')
      .hasText('Ping Pong Tournament');

    assert.dom('[data-test-menu-option]').exists({ count: 3 });

    assert.dom('[data-test-casual-new-link]').exists().hasText('New Game');

    assert.dom('[data-test-players-ranking-link]').exists().hasText('Ranking');

    assert
      .dom('[data-test-players-manager-link]')
      .exists()
      .hasText('Manage Players');
  });

  test('User can move to /casual/new from /menu', async function (assert) {
    assert.expect(1);

    await visit('/menu');

    await click('[data-test-casual-new-link]');

    assert.equal(currentURL(), '/casual/new');
  });

  test('User can move to /players-manager from /menu', async function (assert) {
    assert.expect(1);

    await visit('/menu');

    await click('[data-test-players-manager-link]');

    assert.equal(currentURL(), '/players-manager');
  });

  test('User can move to /players/ranking from /menu', async function (assert) {
    assert.expect(1);

    await visit('/menu');

    await click('[data-test-players-ranking-link]');

    assert.equal(currentURL(), '/players/ranking');
  });
});
