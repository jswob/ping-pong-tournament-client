import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | game-handler/main-headline', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    let store = this.owner.lookup('service:store');

    const player1 = store.createRecord('player', { nickname: 'some1', id: 1 });
    const player2 = store.createRecord('player', { nickname: 'some2', id: 2 });

    const game = store.createRecord('game', {
      players: [player1, player2],
      amountOfSets: 2,
      pointsToWin: 11,
    });

    this.setProperties({
      game,
    });
  });

  test('it renders itself correctly', async function (assert) {
    assert.expect(11);

    await render(
      hbs`<GameHandler::MainHeadline @players={{this.game.players}} />`
    );

    assert.dom('[data-test-main-headline]').exists().hasClass('main-headline');

    assert
      .dom('[data-test-player-1]')
      .exists()
      .hasClass('player')
      .hasText(this.game.players.firstObject.nickname);

    assert
      .dom('[data-test-vs-span]')
      .exists()
      .hasClass('vs-span')
      .hasText('VS');

    assert
      .dom('[data-test-player-2]')
      .exists()
      .hasClass('player')
      .hasText(this.game.players.lastObject.nickname);
  });
});
