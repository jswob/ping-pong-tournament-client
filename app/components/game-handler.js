import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class GameHandlerComponent extends Component {
  @service() store;

  constructor() {
    super(...arguments);

    this.createNewSet();
  }

  @action
  settleGame() {
    const { game } = this.args;

    const winner = game.settleWinner();

    if (winner === undefined) {
      this.createNewSet();
    }
  }

  createNewSet() {
    const { game } = this.args;

    this.store.createRecord('set', { game });
  }
}
