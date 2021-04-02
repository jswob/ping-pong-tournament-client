import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CasualNewController extends Controller {
  @service store;

  @action
  createGame(settings) {
    const { player1, player2 } = settings;

    const id = `${player1.nickname}vs${player2.nickname}-${Date.now()}`;

    this.store.createRecord('game', { ...settings, id: id });

    // TO DO
    // this.transitionToRoute('some');
  }
}
