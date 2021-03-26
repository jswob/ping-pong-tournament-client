import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';

export default class CreatePlayerFormComponent extends Component {
  @service store;

  @tracked
  nickname = '';

  @computed('nickname', 'args.createMode')
  get nicknameError() {
    if (this.args.createMode && !this.nickname.length)
      return "Nickname can't be blank!";
    return null;
  }

  @dropTask
  *createPlayer(event) {
    event.preventDefault();

    if (this.nicknameError) return;

    const createdPlayer = this.store.createRecord('player', {
      nickname: this.nickname,
    });

    this.refreshForm();

    yield createdPlayer.save();
  }

  @action
  setNickname(event) {
    this.nickname = event.target.value;
  }

  refreshForm = () => {
    this.nickname = '';
    this.args.switchMode();
  };
}
