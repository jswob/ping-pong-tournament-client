import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CreatePlayerFormComponent extends Component {
  @service store;

  @tracked
  nickname = '';

  @action
  async createPlayerHandler(event) {
    // Stops submit event from reloading page
    event.preventDefault();

    const { nickname, args } = this;

    try {
      if (!nickname.length) return;

      args.switchModeHandler();

      this.nickname = '';

      const createdPlayer = this.store.createRecord('player', {
        nickname: nickname,
      });

      await createdPlayer.save();
    } catch (error) {
      throw error;
    }
  }
}
