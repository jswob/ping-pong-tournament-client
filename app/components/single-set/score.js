import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SingleSetScoreComponent extends Component {
  get statusClass() {
    const { set, scoreParam, isEnabled } = this.args;

    if (isEnabled) {
      return '';
    }

    const playerIndex = +scoreParam['player'.length] - 1;

    return set.winnerIndex == playerIndex ? 'winner' : 'loser';
  }

  @action
  increment() {
    const { set, scoreParam, onSettleSet } = this.args;

    set.set(scoreParam, set.get(scoreParam) + 1);

    onSettleSet();
  }

  @action
  decrement() {
    const { set, scoreParam, onSettleSet } = this.args;

    if (set.get(scoreParam) > 0) {
      set.set(scoreParam, set.get(scoreParam) - 1);

      onSettleSet();
    }
  }
}
