import Model, { attr, belongsTo } from '@ember-data/model';

export default class GameModel extends Model {
  @belongsTo('player', { inverse: null }) player1;
  @belongsTo('player', { inverse: null }) player2;
  @attr('number') amountOfSets;
  @attr('number') pointsToWin;
}
