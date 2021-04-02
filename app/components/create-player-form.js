import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';
import PlayerValidations from 'ping-pong-tournament-client/validations/player';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default class CreatePlayerFormComponent extends Component {
  @service store;

  @tracked
  player = { nickname: null };

  @computed('player')
  get changeset() {
    const changeset = new Changeset(
      this.player,
      lookupValidator(PlayerValidations)
    );

    changeset.set('nickname', '');

    return changeset;
  }

  @dropTask
  *createPlayer(event) {
    event.preventDefault();

    const { changeset } = this;

    if (!changeset.isValid) {
      return;
    }

    changeset.execute();

    this.args.switchMode();

    yield this.store.createRecord('player', this.player).save();

    this.refreshPlayerModel();
  }

  @action
  setNickname(event) {
    this.changeset.set('nickname', event.target.value);
  }

  refreshPlayerModel() {
    this.player = { nickname: null };
  }
}
