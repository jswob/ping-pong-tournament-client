import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | game', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    let store = this.owner.lookup('service:store');

    const player1 = store.createRecord('player', { nickname: 'some1', id: 1 });
    const player2 = store.createRecord('player', { nickname: 'some2', id: 2 });

    const game = store.createRecord('game', {
      player1: player1,
      player2: player2,
      amountOfSets: 2,
      pointsToWin: 11,
    });

    this.setProperties({ player1, player2, game, store });
  });

  test('winnerId by default returns undefined', function (assert) {
    assert.expect(1);

    assert.notOk(this.game.winnerId);
  });

  test('winnerId correctly handles case when player1 is the winner', function (assert) {
    assert.expect(1);
    
    const { game, store, player1 } = this;

    store.createRecord('set', { game, player1Score: game.pointsToWin });
    store.createRecord('set', { game, player2Score: game.pointsToWin });
    store.createRecord('set', { game, player1Score: game.pointsToWin });

    assert.equal(game.winnerId, player1.get('id'));
  });

  test('winnerId correctly handles case when player2 is the winner', function (assert) {
    assert.expect(1);

    const { game, store, player2 } = this;

    store.createRecord('set', { game, player1Score: game.pointsToWin });
    store.createRecord('set', { game, player2Score: game.pointsToWin });
    store.createRecord('set', { game, player2Score: game.pointsToWin });

    assert.equal(game.winnerId, player2.get('id'));
  });
});
