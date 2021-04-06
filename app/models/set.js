import Model, { attr, belongsTo } from '@ember-data/model';

export default class SetModel extends Model {
  @attr('number', { defaultValue: 0 }) player1Score;
  @attr('number', { defaultValue: 0 }) player2Score;
  @attr('number') winnerIndex;
  @belongsTo('game') game;

  settleWinner() {
    let winnerIndex;
    const { player1Score, player2Score, game } = this;
    const pointsToWin = game.get('pointsToWin');

    if (pointsToWin <= player1Score && player1Score >= player2Score + 2) {
      winnerIndex = 0;
    } else if (
      pointsToWin <= player2Score &&
      player2Score >= player1Score + 2
    ) {
      winnerIndex = 1;
    }

    return winnerIndex;
  }
}
