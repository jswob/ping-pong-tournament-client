import Model, { attr, belongsTo } from '@ember-data/model';

export default class SetModel extends Model {
  @attr('number', { defaultValue: 0 }) player1Score;
  @attr('number', { defaultValue: 0 }) player2Score;
  @belongsTo('game') game;

  get winnerId() {
    let winnerId;
    const { player1Score, player2Score, game } = this;
    const pointsToWin = game.get('pointsToWin');
    
    if (pointsToWin <= player1Score && player1Score >= player2Score + 2) {
      winnerId = game.get('player1').get('id');
    } else if (
      pointsToWin <= player2Score &&
      player2Score >= player1Score + 2
    ) {
      winnerId = game.get('player2').get('id');
    }

    return winnerId;
  }
} 
