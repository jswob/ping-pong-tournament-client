import Route from '@ember/routing/route';

export default class PlayersPlayerIndexRoute extends Route {
    beforeModel() {
        this.transitionTo('players.player.statistics');
    }
}
