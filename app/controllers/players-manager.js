import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PlayersManagerController extends Controller {
  queryParams = ['createMode'];

  @tracked
  createMode = false;

  @action
  switchCreateModeHandler() {
    this.createMode = !this.createMode;
  }
}
