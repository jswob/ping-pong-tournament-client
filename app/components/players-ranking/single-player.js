import Component from '@glimmer/component';

export default class PlayersRankingSinglePlayerComponent extends Component {
  get placeClass() {
    const place = +this.args.place;

    let className = '';

    switch (place) {
      case 1: {
        className = 'first-place';
        break;
      }
      case 2: {
        className = 'second-place';
        break;
      }
      case 3: {
        className = 'third-place';
        break;
      }
    }

    return className;
  }
}
