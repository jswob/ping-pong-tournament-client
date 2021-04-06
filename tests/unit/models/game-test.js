import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | game', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    let store = this.owner.lookup('service:store');

    const player1 = store.createRecord('player', { nickname: 'some1', id: 1 });
    const player2 = store.createRecord('player', { nickname: 'some2', id: 2 });

    const game = store.createRecord('game', {
      players: [player1, player2],
      amountOfSets: 2,
      pointsToWin: 11,
    });

    this.setProperties({ player1, player2, game, store });
  });

  test('countScore works correctly', function (assert) {
    assert.expect(3);

    const { game, store } = this;

    store.createRecord('set', { game, winnerIndex: 0 });
    store.createRecord('set', { game, winnerIndex: 1 });
    store.createRecord('set', { game, winnerIndex: 0 });

    assert.equal(this.game.countScore(), '2/1');

    store.createRecord('set', { game, winnerIndex: 1 });

    assert.equal(this.game.countScore(), '2/2');

    store.createRecord('set', { game, winnerIndex: 0 });

    assert.equal(this.game.countScore(), '3/2');
  });

  test('settleWinner returns undefined if there is no winner', function (assert) {
    assert.expect(1);

    const { game, store } = this;

    store.createRecord('set', { game, winnerIndex: 0 });
    store.createRecord('set', { game, winnerIndex: 1 });

    assert.equal(game.settleWinner(), undefined);
  });

  test('settleWinner correctly handles case when player1 is the winner', function (assert) {
    assert.expect(1);

    const { game, store, player1 } = this;

    store.createRecord('set', { game, winnerIndex: 0 });
    store.createRecord('set', { game, winnerIndex: 1 });
    store.createRecord('set', { game, winnerIndex: 0 });

    assert.equal(game.settleWinner().get('id'), player1.get('id'));
  });

  test('settleWinner correctly handles case when player2 is the winner', function (assert) {
    assert.expect(1);

    const { game, store, player2 } = this;

    store.createRecord('set', { game, winnerIndex: 1 });
    store.createRecord('set', { game, winnerIndex: 1 });

    assert.equal(game.settleWinner().get('id'), player2.get('id'));
  });
});
