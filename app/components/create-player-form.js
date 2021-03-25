import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';

export default class CreatePlayerFormComponent extends Component {
  @service store;

  @tracked
  nickname = '';

  @dropTask
  *createPlayer(event) {
    event.preventDefault();

    const { nickname, args } = this;

    if (!nickname.length) return;

    this._refreshForm(args);

    const createdPlayer = this.store.createRecord('player', {
      nickname: nickname,
    });

    yield createdPlayer.save();
  }

  @action
  setNickname(event) {
    this.nickname = event.target.value;
  }

  _refreshForm = ({ switchMode }) => {
    this.nickname = '';
    switchMode();
  };
}
