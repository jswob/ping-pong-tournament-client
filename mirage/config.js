import ENV from 'ping-pong-tournament-client/config/environment';

export default function () {
  this.urlPrefix = `${ENV.api.host}/${ENV.api.namespace}`;

  this.get('/players', (schema, _request) => {
    try {
      const players = schema.players.all().models;

      return {
        players: players,
      };
    } catch (error) {
      console.log(error);
    }
  });

  this.get('/players:id', (schema, { params }) => {
    return {
      players: schema.players.find(params.id),
    };
  });

  this.post('players', (schema, { requestBody }) => {
    const { player } = JSON.parse(requestBody);

    const { attrs } = schema.create('player', player);

    return {
      player: { ...attrs },
    };
  });

  this.get('/games/:id', (schema, { params }) => {
    const game = schema.games.find(params.id).attrs;

    return {
      game: {
        id: game.id,
        amountOfSets: game.amountOfSets,
        pointsToWin: game.pointsToWin,
        sets: null,
        winner: game.winnerId,
        links: {
          players: `/api/games/${game.id}/players`,
        },
      },
    };
  });

  this.get('/games/:id/players', (schema, { params }) => {
    const players = schema.players.all().models.filter(({ attrs }) => {
      if (attrs.gamesPlayedIds.find((id) => id === params.id)) {
        return true;
      }
      return false;
    });

    return {
      players: players.map((player) => {
        return {
          id: player.id,
          nickname: player.nickname,
        };
      }),
    };
  });

  this.put('/games/:id', (schema, request) => {
    try {
      let requestBody = JSON.parse(request.requestBody).game;

      const game = schema.games.find(request.params.id);

      let winner;
      const players = requestBody.players.map((id) => schema.players.find(id));

      if (requestBody.winner) {
        winner = schema.players.find(requestBody.winner);
      }

      requestBody.players = players;
      requestBody.winner= winner;

      const updatedGame = game.update(requestBody);

      const playersLink = `/api/games/${updatedGame.id}/players`;

      return {
        game: {
          id: updatedGame.id,
          amountOfSets: updatedGame.amountOfSets,
          pointsToWin: updatedGame.pointsToWin,
          sets: null,
          winner: updatedGame.winnerId,
          links: {
            players: playersLink,
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
  });
}
