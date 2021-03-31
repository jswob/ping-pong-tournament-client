import Component from '@glimmer/component';

export default class SetupGameFormPlayersSettingsComponent extends Component {
  updatePlayer(changeset, key, callback, event) {
    const fieldToValidate = (key === 'player1') ? 'player2' : 'player1';

    callback(changeset, key, event);

    const isOtherFieldChanged = changeset.changes.find(
      (change) => change.key === fieldToValidate
    );

    if (isOtherFieldChanged) changeset.validate(fieldToValidate);
  }
}
