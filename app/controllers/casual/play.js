import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency';

export default class CasualPlayController extends Controller {
  @service() store;

  @dropTask
  *saveGame(game) {
    yield game.save();

    return this.transitionToRoute('menu');
  }
}
