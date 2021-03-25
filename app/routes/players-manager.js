import Route from '@ember/routing/route';

export default class PlayersManagerRoute extends Route {
  model() {
    return this.store.findAll('player');
  }
}
