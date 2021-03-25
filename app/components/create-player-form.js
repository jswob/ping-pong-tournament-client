import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CreatePlayerFormComponent extends Component {
  @service store;

  @tracked
  nickname = '';

  @action
  async createPlayer(event) {
    event.preventDefault();

    const { nickname, args } = this;

    try {
      if (!nickname.length) return;

      this._refreshForm(args);

      const createdPlayer = this.store.createRecord('player', {
        nickname: nickname,
      });

      await createdPlayer.save();
    } catch (error) {
      throw error;
    }
  }

  @action
  setNickname(event) {
    this.nickname = event.target.value;
  }

  _refreshForm = ({switchMode}) => {
    this.nickname = '';
    switchMode();
  };
}
