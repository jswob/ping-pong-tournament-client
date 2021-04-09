import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | casual/play', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    const players = this.server.createList('player', 2);
    const { id, pointsToWin } = this.server.create('game', {
      players,
      pointsToWin: 2,
      amountOfSets: 2,
    });

    this.setProperties({ gameId: id, pointsToWin: pointsToWin });
  });

  test('It is possible to visit /casual/play', async function (assert) {
    assert.expect(1);

    await visit(`/casual/play/${this.gameId}`);

    assert.equal(currentURL(), `/casual/play/${this.gameId}`);
  });

  test('/casual/play renders its layout correctly', async function (assert) {
    assert.expect(4);

    await visit(`/casual/play/${this.gameId}`);

    assert.dom('[data-test-page-layout]').exists();

    assert
      .dom('[data-test-main-headline]')
      .exists()
      .hasText('player1 VS player2');

    assert.dom('[data-test-game-handler]').exists();
  });

  test('User can play a game and save it', async function (assert) {
    assert.expect(3);

    await visit(`/casual/play/${this.gameId}`);

    for (
      let clicksOnPlus = 0;
      clicksOnPlus < this.pointsToWin;
      clicksOnPlus++
    ) {
      await click(
        '[data-test-single-set]:last-child > [data-test-player-1-score] [data-test-plus-icon]'
      );
    }

    for (
      let clicksOnPlus = 0;
      clicksOnPlus < this.pointsToWin;
      clicksOnPlus++
    ) {
      await click(
        '[data-test-single-set]:last-child > [data-test-player-2-score] [data-test-plus-icon]'
      );
    }

    for (
      let clicksOnPlus = 0;
      clicksOnPlus < this.pointsToWin;
      clicksOnPlus++
    ) {
      await click(
        '[data-test-single-set]:last-child > [data-test-player-1-score] [data-test-plus-icon]'
      );
    }

    assert.dom('[data-test-result-headline]').hasText('2 vs 1');

    await click('[data-test-finish-button]');

    assert.equal(currentURL(), '/menu');

    const updateGame = this.server.schema.games.find(this.gameId);

    assert.equal(updateGame.winnerId, "1", "Game model has been updated");
  });
});
