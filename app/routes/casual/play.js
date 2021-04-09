import Route from '@ember/routing/route';

export default class CasualPlayRoute extends Route {
  model({ game_id }) {
    return this.store.findRecord('game', game_id, {
      include: 'players',
    });
  }
}
