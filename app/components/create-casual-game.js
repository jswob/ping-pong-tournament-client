import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency';
import GameValidations from '../validations/game';

export default class CreateCasualGameComponent extends Component {
  GameValidations = GameValidations;

  constructor() {
    super(...arguments);

    this.refreshSettings();
  }

  @tracked
  settings;

  @dropTask
  *createCasualGame(changeset) {
    changeset.execute();

    yield this.args.callback({ ...this.settings });

    this.refreshSettings();
  }

  @action
  update(changeset, key, param) {
    if (param.target) changeset.set(key, param.target.value);
    else changeset.set(key, param);
  }

  refreshSettings() {
    this.settings = {
      player1: null,
      player2: null,
      sets: 2,
      pointsToWin: 15,
    };
  }
}
