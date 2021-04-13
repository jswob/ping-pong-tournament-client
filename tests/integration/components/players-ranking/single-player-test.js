import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module(
  'Integration | Component | players-ranking/single-player',
  function (hooks) {
    setupRenderingTest(hooks);
    setupMirage(hooks);

    hooks.beforeEach(async function () {
      const players = this.server.createList('player', 2);

      this.server.createList('game', 2, {
        players: [players[0], players[1]],
        winner: players[0],
      });

      const store = this.owner.lookup('service:store');

      const playerRecord = await store.findRecord('player', players[0].id);

      this.set('player', playerRecord);
    });

    test('it renders itself correctly', async function (assert) {
      assert.expect(13);

      await render(
        hbs`<PlayersRanking::SinglePlayer @player={{this.player}} />`
      );

      assert
        .dom('[data-test-single-player]')
        .exists()
        .hasClass('single-player');

      assert
        .dom('[data-test-single-player] > [data-test-score-wrapper]')
        .exists()
        .hasClass('score-wrapper');

      assert
        .dom('[data-test-score-wrapper] > [data-test-score-value]')
        .exists()
        .hasClass('value')
        .hasText(String(this.player.gamesWon.length));

      assert
        .dom('[data-test-score-wrapper] > [data-test-score-icon]')
        .exists()
        .hasClass('icon')
        .hasText('star_rate');

      assert
        .dom('[data-test-single-player] > [data-test-player-nickname]')
        .exists()
        .hasClass('player-nickname')
        .hasText(this.player.nickname);
    });
  }
);
