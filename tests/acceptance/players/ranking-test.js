import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | players/ranking', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    const players = this.server.createList('player', 5);

    this.server.create('game', {
      players: [players[0], players[1]],
      winner: players[1],
    });
    this.server.create('game', {
      players: [players[2], players[1]],
      winner: players[1],
    });
    this.server.create('game', {
      players: [players[3], players[4]],
      winner: players[4],
    });

    this.set('players', players);
  });

  test('It is possible to visit /players/ranking', async function (assert) {
    assert.expect(1);

    await visit('/players/ranking');

    assert.equal(currentURL(), '/players/ranking');
  });

  test('/players/ranking renders itself correctly', async function (assert) {
    assert.expect(6);

    await visit('/players/ranking');

    assert.dom('[data-test-page-layout]').exists();

    assert.dom('[data-test-main-header]').hasText('Ranking');

    assert.dom('[data-test-players-ranking]').exists();

    assert.dom('[data-test-filter-input]').exists().hasValue('');

    assert.dom('[data-test-single-player]').exists({ count: 5 });
  });

  test('Players are ordered correctly', async function (assert) {
    assert.expect(5);

    await visit('/players/ranking');

    assert
      .dom('[data-test-single-player]:first-child')
      .includesText(this.players[1].nickname);

    assert
      .dom('[data-test-single-player]:nth-child(2)')
      .includesText(this.players[4].nickname);

    assert
      .dom('[data-test-single-player]:nth-child(3)')
      .includesText(this.players[0].nickname);

    assert
      .dom('[data-test-single-player]:nth-child(4)')
      .includesText(this.players[2].nickname);

    assert
      .dom('[data-test-single-player]:nth-child(5)')
      .includesText(this.players[3].nickname);
  });

  test('It is possible to filter players list', async function (assert) {
    assert.expect(2);

    await visit('/players/ranking');

    const inputValue = this.players[0].nickname;

    await fillIn('[data-test-filter-input]', inputValue);

    assert
      .dom('[data-test-single-player]')
      .exists({ count: 1 })
      .includesText(inputValue);
  });

  test('It is possible to visit statistic page for clicked user', async function (assert) {
    assert.expect(1);

    await visit('/players/ranking');

    await click('[data-test-single-player]:first-child');

    assert.equal(currentURL(), '/players/2/statistics');
  });
});
