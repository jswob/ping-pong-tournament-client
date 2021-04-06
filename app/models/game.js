import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class GameModel extends Model {
  @attr('number') amountOfSets;
  @attr('number') pointsToWin;
  @attr('string') score;
  @hasMany('player', { inverse: 'gamesPlayed' }) players;
  @belongsTo('player', { inverse: 'gamesWon' }) winner;
  @hasMany('set') sets;

  countScore() {
    let player1Wins = 0,
      player2Wins = 0;
    const { sets } = this;

    sets.forEach((set) => {
      let winnerIndex = set.get('winnerIndex');

      if (winnerIndex === 0) {
        player1Wins++;
      } else if (winnerIndex === 1) {
        player2Wins++;
      }
    });

    return `${player1Wins}/${player2Wins}`;
  }

  settleWinner() {
    let winner;
    const player1Index = 0,
      player2Index = 1;
    const { amountOfSets } = this;
    const results = this.countScore().split('/');

    if (
      +results[player1Index] === amountOfSets &&
      +results[player1Index] > +results[player2Index]
    ) {
      winner = this.get('players').objectAt(player1Index);
    } else if (
      +results[player2Index] === amountOfSets &&
      +results[player2Index] > +results[player1Index]
    ) {
      winner = this.get('players').objectAt(player2Index);
    }

    return winner;
  }
}
