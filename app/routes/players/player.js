import Route from '@ember/routing/route';

export default class PlayersPlayerRoute extends Route {
  model({ player_id }) {
    return this.store.findRecord('player', player_id);
  }
}
