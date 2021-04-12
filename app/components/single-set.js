import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SingleSetComponent extends Component {
  get isEnabled() {
    return !Boolean(this.args.set.winnerIndex != undefined);
  }

  @action
  settleSet(set, onSettleGame) {
    const winnerIndex = set.settleWinner();

    if (winnerIndex != undefined) {
      onSettleGame();
    }
  }
}
