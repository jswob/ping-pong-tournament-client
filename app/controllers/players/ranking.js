import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PlayersRankingController extends Controller {
  queryParams = ['filterQuery'];

  @tracked
  filterQuery = '';

  @action
  updateFilterQuery({ target }) {
    this.filterQuery = target.value;
  }
}
