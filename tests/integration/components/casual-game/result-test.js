import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { task } from 'ember-concurrency';

module('Integration | Component | casual-game/result', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    let store = this.owner.lookup('service:store');

    const player1 = store.createRecord('player', { nickname: 'some1', id: 1 });
    const player2 = store.createRecord('player', { nickname: 'some2', id: 2 });

    const game = store.createRecord('game', {
      id: 15,
      players: [player1, player2],
      result: '1/2',
      amountOfSets: 2,
      pointsToWin: 11,
    });

    this.setProperties({
      game,
    });
  });

  test('it renders itself correctly', async function (assert) {
    assert.expect(8);

    this.set('callback', () => {});

    await render(hbs`
      <CasualGame::Result 
        @game={{this.game}} 
        @callback={{this.callback}} 
      />`);

    assert.dom('[data-test-result]').exists().hasClass('result');

    assert
      .dom('[data-test-result-headline]')
      .exists()
      .hasClass('headline')
      .hasText('1 vs 2');

    assert
      .dom('[data-test-finish-button]')
      .exists()
      .hasClass('finish-button')
      .hasText('Finish');
  });
});
