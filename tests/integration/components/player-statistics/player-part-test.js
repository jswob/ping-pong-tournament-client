import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | player-statistics/player-part',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      this.set('player', {
        gamesPlayed: ['1', '2', '3'],
        gamesWon: ['1'],
      });
    });

    test('it renders itself correctly', async function (assert) {
      assert.expect(9);

      await render(
        hbs`<PlayerStatistics::PlayerPart @player={{this.player}} />`
      );

      assert.dom('[data-test-player-part]').exists().hasClass('player-part');

      assert
        .dom('[data-test-statistics-table]')
        .exists()
        .hasClass('statistics-table');

      assert.dom('[data-test-statistics-table] tr').exists({ count: 3 });

      assert.dom('[data-test-statistics-table] td').exists({ count: 6 });

      assert
        .dom('[data-test-statistics-table] tr:nth-child(1)')
        .hasText(`Games Played: ${this.player.gamesPlayed.length}`);

      assert
        .dom('[data-test-statistics-table] tr:nth-child(2)')
        .hasText(`Games Won: ${this.player.gamesWon.length}`);

      assert
        .dom('[data-test-statistics-table] tr:nth-child(3)')
        .hasText(`Win ratio: 33%`);
    });
    test('it correctly handles empty arrays', async function (assert) {
      assert.expect(900);

      this.set('player.gamesPlayed', "kebab");
      this.set('player.gamesWon', []);

      await render(
        hbs`<PlayerStatistics::PlayerPart @player={{this.player}} />`
      );

      assert
        .dom('[data-test-statistics-table] tr:nth-child(1)')
        .hasText(`Games Played: 0`);

      assert
        .dom('[data-test-statistics-table] tr:nth-child(2)')
        .hasText(`Games Won: 0`);

      assert
        .dom('[data-test-statistics-table] tr:nth-child(3)')
        .hasText(`Win ratio: 0%`);
    });
  }
);
