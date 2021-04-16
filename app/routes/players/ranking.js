import Route from '@ember/routing/route';

export default class PlayersRankingRoute extends Route {
  async model() {
    return this.store.findAll('player');
  }
}
