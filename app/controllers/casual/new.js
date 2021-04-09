import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency';

export default class CasualNewController extends Controller {
  @service store;

  @dropTask
  *createGame(settings) {
    const { player1, player2 } = settings;

    const id = `${player1.nickname}vs${player2.nickname}-${Date.now()}`;

    let game = this.store.createRecord('game', {
      ...settings,
      id: id,
      players: [player1, player2],
    });

    game = yield game.save();

    return this.transitionToRoute('casual.play', game);
  }
}
