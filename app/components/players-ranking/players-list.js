import Component from '@glimmer/component';

export default class PlayersRankingPlayersListComponent extends Component {
  get playersRanks() {
    let players = this.args.players.toArray();

    const sortedPlayers = players.sort(
      (player1, player2) => player2.gamesWon.length - player1.gamesWon.length
    );

    return sortedPlayers;
  }
}
