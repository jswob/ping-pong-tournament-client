import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class CasualNewController extends Controller {
  @action
  transition(settings) {
    // TO DO
    console.log(settings);
  }
}
