import EmberRouter from '@ember/routing/router';
import config from 'ping-pong-tournament-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('menu');
  this.route('players-manager');

  this.route('casual', function () {
    this.route('new');
    this.route('play', { path: '/play/:game_id' });
  });

  this.route('players', function() {
    this.route('ranking');

    this.route('player', {path: '/:player_id'}, function() {
      this.route('statistics');
    });
  });
});
