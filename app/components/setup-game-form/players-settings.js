import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency';

export default class SetupGameFormPlayersSettingsComponent extends Component {
  @dropTask
  *updatePlayer(changeset, key, callback, event) {
    const fieldToValidate = (key === 'player1') ? 'player2' : 'player1';

    yield callback(changeset, key, event);

    const isOtherFieldChanged = changeset.changes.find(
      (change) => change.key === fieldToValidate
    );

    if (isOtherFieldChanged) changeset.validate(fieldToValidate);
  }
}
