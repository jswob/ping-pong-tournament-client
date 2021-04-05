import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class GameModel extends Model {
  @attr('number') amountOfSets;
  @attr('number') pointsToWin;
  @belongsTo('player', { inverse: null }) player1;
  @belongsTo('player', { inverse: null }) player2;
  @hasMany('set') sets;

  get winnerId() {
    let winnerId,
      player1Wins = [],
      player2Wins = [];
    const { amountOfSets, player1, player2, sets } = this;

    sets.forEach((set) => {
      if (set.winnerId === player1.get('id')) {
        player1Wins.push(set);
      } else if (set.winnerId === player2.get('id')) {
        player2Wins.push(set);
      }
    });

    if (amountOfSets === player1Wins.length) {
      winnerId = player1.get('id');
    } else if (amountOfSets === player2Wins.length) {
      winnerId = player2.get('id');
    }

    return winnerId;
  }
}
