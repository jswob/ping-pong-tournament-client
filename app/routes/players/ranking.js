import Route from '@ember/routing/route';

export default class PlayersRankingRoute extends Route {
  model() {
    return this.store.findAll('player');
  }
}
