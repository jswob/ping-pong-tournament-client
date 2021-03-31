import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SetupGameFormComponent extends Component {
  enabled = false;
  disabled = true;
  
  @action
  validateChangeset(changeset, event) {
    event.preventDefault();

    const { onSubmit } = this.args;

    changeset.validate();

    if (!changeset.isValid) {
      return;
    }

    return onSubmit(changeset);
  }
}
