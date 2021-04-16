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

      this.setProperties({
        player: playerRecord,
        place: '1',
      });
      this.set('player', playerRecord);
    });

    test('it renders itself correctly', async function (assert) {
      assert.expect(17);

      await render(
        hbs`<PlayersRanking::SinglePlayer @player={{this.player}} @place={{this.place}} />`
      );

      assert
        .dom('[data-test-single-player]')
        .exists()
        .hasClass('single-player');

      assert
        .dom('[data-test-single-player] > [data-test-place-wrapper]')
        .exists()
        .hasClass('place-wrapper')
        .hasText(this.place);

      assert.dom('[data-test-place-wrapper] svg').hasClass('fa-crown');

      assert
        .dom('[data-test-single-player] > [data-test-player-nickname]')
        .exists()
        .hasClass('player-nickname')
        .hasText(this.player.nickname);

      assert
        .dom('[data-test-single-player] > [data-test-score-wrapper]')
        .exists()
        .hasClass('score-wrapper');

      assert
        .dom('[data-test-score-wrapper] > [data-test-value]')
        .exists()
        .hasClass('value')
        .hasText(String(this.player.gamesWon.length));

      assert
        .dom('[data-test-score-wrapper] > [data-test-icon]')
        .exists()
        .hasClass('icon');

      assert.dom('[data-test-score-wrapper] svg').hasClass('fa-trophy');
    });

    test('it highlights nickname properly', async function (assert) {
      assert.expect(2);

      this.set('player.nickname', 'anna');
      this.set('highlight', 'n');

      await render(hbs`
        <PlayersRanking::SinglePlayer 
          @player={{this.player}} 
          @place={{this.place}} 
          @highlight={{this.highlight}} 
        />`);

      assert.dom('[data-test-player-nickname]').hasText(this.player.nickname);

      assert
        .dom('[data-test-player-nickname] > strong')
        .hasText(this.highlight);
    });

    test('it has class according to place', async function (assert) {
      assert.expect(6);

      this.set('place', 1);

      await render(hbs`
        <PlayersRanking::SinglePlayer 
          @player={{this.player}} 
          @place={{this.place}} 
        />`);

      assert.dom('[data-test-single-player]').hasClass('first-place');

      this.set('place', 2);

      assert.dom('[data-test-single-player]').hasClass('second-place');

      this.set('place', 3);

      assert.dom('[data-test-single-player]').hasClass('third-place');

      this.set('place', 4);

      assert
        .dom('[data-test-single-player]')
        .doesNotHaveClass('first-place')
        .doesNotHaveClass('second-place')
        .doesNotHaveClass('third-place');
    });
  }
);
