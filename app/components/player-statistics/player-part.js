import Component from '@glimmer/component';
import { computed } from '@ember/object';

export default class PlayerStatisticsPlayerPartComponent extends Component {
  @computed('args.player.gamesPlayed.length')
  get gamesPlayed() {
    console.log(this.args.player.gamesPlayed.length);

    const { gamesPlayed } = this.args.player;

    return this.checkLength(gamesPlayed);
  }

  @computed('args.player.gamesWon.length')
  get gamesWon() {
    const { gamesWon } = this.args.player;

    return this.checkLength(gamesWon);
  }

  @computed('gamesPlayed', 'gamesWon')
  get winRatio() {
    const { gamesPlayed, gamesWon } = this;
    let result = 0;

    if (!Number(gamesPlayed)) {
      return result;
    }

    result = Math.round((gamesWon / gamesPlayed) * 100);

    return result;
  }

  @computed('winRatio')
  get rangeClass() {
    const winRatio = this.winRatio;

    let rangeStart = Math.floor((winRatio / 10)) * 10;
    let rangeEnd = Math.ceil(winRatio / 10) * 10 - 1;

    if (rangeStart > 90) {
      rangeStart = 90;
    }

    if (rangeEnd > 89) {
      rangeEnd = 100;
    } else if (rangeEnd < 9) {
      rangeEnd = 9;
    }

    return `range-${rangeStart}-${rangeEnd}`;
  }

  checkLength(object) {
    if (!object || typeof object === 'string') {
      return 0;
    }

    return object.length;
  }
}
