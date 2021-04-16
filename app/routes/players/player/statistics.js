import Route from '@ember/routing/route';

export default class PlayersPlayerStatisticsRoute extends Route {
  model() {
    return this.modelFor('players.player');
  }
}
