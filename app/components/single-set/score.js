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
    const { set, scoreParam, callback }

    set.set(scoreParam, set.get(scoreParam) + 1);

    callback();
  }

  @action
  decrement() {
    const { set, scoreParam, callback };

    if (set.get(scoreParam) > 0) {
      set.set(scoreParam, set.get(scoreParam) - 1);

      callback();
    }
  }
}
