import ENV from 'ping-pong-tournament-client/config/environment';

export default function () {
  this.urlPrefix = `${ENV.api.host}/${ENV.api.namespace}`;

  this.get('/players', (schema, _request) => {
    return {
      players: schema.players.all().models,
    };
  });

  this.post('players', (schema, { requestBody }) => {
    const { player } = JSON.parse(requestBody);

    const createdPlayer = schema.create('player', player);

    return {
      player: { ...createdPlayer },
    };
  });
}
