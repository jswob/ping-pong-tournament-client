import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SetupGameFormComponent extends Component {
  @action
  validateChangeset(changeset, event) {
    event.preventDefault();

    const { onSubmit } = this.args;

    changeset.validate();

    if (!changeset.isValid) return;

    return onSubmit(changeset);
  }
}
