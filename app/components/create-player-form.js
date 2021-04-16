import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';
import PlayerValidations from 'ping-pong-tournament-client/validations/player';

export default class CreatePlayerFormComponent extends Component {
  PlayerValidations = PlayerValidations;
  
  @service store;

  @tracked
  player = { nickname: null };

  @tracked
  isCreateModeOn = false;

  @action
  switchCreateMode() {
    this.isCreateModeOn = !this.isCreateModeOn;
  }

  @dropTask
  *createPlayer(changeset, event) {
    event.preventDefault();

    changeset.validate();

    if (!changeset.isValid) {
      return;
    }

    changeset.execute();

    this.switchCreateMode();

    yield this.store.createRecord('player', this.player).save();

    this.refreshPlayerModel();
  }

  @action
  setNickname(changeset, event) {
    changeset.set('nickname', event.target.value);
  }

  refreshPlayerModel() {
    this.player = { nickname: null };
  }
}
