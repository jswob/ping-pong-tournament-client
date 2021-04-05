import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | set', function (hooks) {
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

    const setRecord = store.createRecord('set', { game: game });

    this.setProperties({ player1, player2, game, setRecord });
  });

  test('winnerId by default returns undefined', async function (assert) {
    assert.expect(1);
    
    assert.notOk(
      this.setRecord.winnerId,
      'When none of the players has won, it is undefined'
    );
  });

  test('winnerId correctly handles case when player1 is the winner', async function (assert) {
    assert.expect(3);

    const { player1, setRecord, game } = this;

    setRecord.player1Score = game.pointsToWin;
    setRecord.player2Score = game.pointsToWin - 2;

    assert.equal(
      setRecord.winnerId,
      player1.id,
      'If player1 has expected amount of points to win and player2 has 2 or more points less, player1 is the winner'
    );

    setRecord.player2Score = game.pointsToWin - 1;

    assert.notOk(
      setRecord.winnerId,
      'If player1 has expected amount of points to win and player2 has only one point less, there is no winner'
    );

    setRecord.player1Score = game.pointsToWin + 1;

    assert.equal(
      setRecord.winnerId,
      player1.id,
      'If player1 has expected amount of points to win and player2 has 2 or more points less, player1 is the winner'
    );
  });

  test('winnerId correctly handles case when player2 is the winner', async function (assert) {
    assert.expect(3);

    const { player2, setRecord, game } = this;

    setRecord.player2Score = game.pointsToWin;
    setRecord.player1Score = game.pointsToWin - 2;

    assert.equal(
      setRecord.winnerId,
      player2.id,
      'If player2 has expected amount of points to win and player1 has 2 or more points less, player2 is the winner'
    );

    setRecord.player1Score = game.pointsToWin - 1;

    assert.notOk(
      setRecord.winnerId,
      'If player2 has expected amount of points to win and player1 has only one point less, there is no winner'
    );

    setRecord.player2Score = game.pointsToWin + 1;

    assert.equal(
      setRecord.winnerId,
      player2.id,
      'If player2 has expected amount of points to win and player1 has 2 or more points less, player2 is the winner'
    );
  });
});
