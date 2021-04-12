import Model, { attr, hasMany } from '@ember-data/model';

export default class PlayerModel extends Model {
  @attr('string') nickname;
  @hasMany('game', { inverse: "players" }) gamesPlayed;
  @hasMany('game', { inverse: 'winner' }) gamesWon;
}
