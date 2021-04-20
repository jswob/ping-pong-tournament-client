import Component from '@glimmer/component';

export default class PlayerStatisticsPlayerPartComponent extends Component {
  get gamesPlayed() {
    const { gamesPlayed } = this.args.player;

    return this.checkLength(gamesPlayed);
  }

  get gamesWon() {
    const { gamesWon } = this.args.player;

    return this.checkLength(gamesWon);
  }

  checkLength(array) {
      if (!Array.isArray(array)) {
        return 0;
      }

      return array.length;
  }
}
