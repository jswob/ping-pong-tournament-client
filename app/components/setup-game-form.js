import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SetupGameFormComponent extends Component {
  constructor() {
    super(...arguments);

    this.args.changeset.validate();
  }

  @action
  validateChangeset(changeset, event) {
    event.preventDefault();

    const { onSubmit } = this.args;

    if (!changeset.isValid) return;

    return onSubmit(changeset);
  }
}
