import { module, test } from 'qunit';
import { visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | players manager', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    const store = this.owner.lookup('service:store');

    this.set('store', store);

    this.server.createList('player', 5);
  });

  test('User can view list of all players', async function (assert) {
    assert.expect(1);

    await visit('/players-manager');

    assert
      .dom('[data-test-single-player]')
      .exists(
        { count: this.store.peekAll('player').length },
        'It properly generates players'
      );
  });

  test('User can create a new player which is automaticaly added to list', async function (assert) {
    assert.expect(2);

    await visit('/players-manager');

    assert
      .dom('[data-test-single-player]')
      .exists({ count: 5 }, `It starts with 5 players`);

    await click('[data-test-create-player-form] > [data-test-switch-button]');

    await fillIn(
      '[data-test-create-player-form] > [data-test-nickname-input]',
      'dummy text'
    );

    await click('[data-test-create-player-form] > [data-test-submit-button]');

    assert
      .dom('[data-test-single-player]')
      .exists({ count: 6 }, `It ends with 6 players`);
  });
});
