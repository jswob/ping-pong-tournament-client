import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module(
  'Integration | Component | players-ranking/players-list',
  function (hooks) {
    setupRenderingTest(hooks);
    setupMirage(hooks);

    hooks.beforeEach(async function () {
      const players = this.server.createList('player', 4);

      this.server.create('game', {
        players: [players[2], players[1]],
        winner: players[2],
      });
      this.server.create('game', {
        players: [players[2], players[0]],
        winner: players[2],
      });
      this.server.create('game', {
        players: [players[3], players[1]],
        winner: players[1],
      });

      const store = this.owner.lookup('service:store');

      const playersRecords = await store.findAll('player');

      this.set('players', playersRecords);
    });

    test('it renders itself correctly', async function (assert) {
      assert.expect(4);

      this.set('filterQuery', '');

      await render(hbs`
        <PlayersRanking::PlayersList 
          @players={{this.players}} 
          @filterQuery={{this.filterQuery}} 
        />`);

      assert
        .dom('[data-test-ranking-players-list]')
        .exists()
        .hasClass('ranking-players-list');

      assert
        .dom('[data-test-ranking-players-list] > [data-test-single-player]')
        .exists({ count: 4 });

      assert
        .dom(
          '[data-test-single-player]:first-child > [data-test-place-wrapper]'
        )
        .hasText('1');
    });

    test('it sorts players correctly', async function (assert) {
      assert.expect(3);

      this.set('filterQuery', '');

      await render(hbs`
        <PlayersRanking::PlayersList 
          @players={{this.players}} 
          @filterQuery={{this.filterQuery}} 
        />`);

      assert
        .dom('[data-test-single-player]:nth-child(1)')
        .includesText(this.players.objectAt(2).nickname);

      assert
        .dom('[data-test-single-player]:nth-child(2)')
        .includesText(this.players.objectAt(1).nickname);

      assert
        .dom('[data-test-single-player]:nth-child(3)')
        .includesText(this.players.objectAt(0).nickname);
    });

    test('it filters players correctly', async function (assert) {
      assert.expect(4);

      const filterQuery = 'player1';

      this.set('filterQuery', filterQuery);

      await render(hbs`
        <PlayersRanking::PlayersList 
          @players={{this.players}} 
          @filterQuery={{this.filterQuery}} 
        />`);

      assert
        .dom('[data-test-single-player]')
        .exists({ count: 1 })
        .includesText(this.players.objectAt(0).nickname);

      assert
        .dom('[data-test-single-player] > [data-test-player-nickname] > strong')
        .hasText(this.filterQuery, "It highlights filterQuery");

      assert
        .dom(
          '[data-test-single-player]:first-child > [data-test-place-wrapper]'
        )
        .hasText('3');
    });
  }
);
