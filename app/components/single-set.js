import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SingleSetComponent extends Component {
  get isEnabled() {
    const { set } = this.args;

    if (set.winnerIndex != undefined) {
      return false;
    } else {
      return true;
    }
  }

  @action
  settleSet(set, callback) {
    const winnerIndex = set.settleWinner();

    if (winnerIndex != undefined) {
      callback();
    }
  }
}
