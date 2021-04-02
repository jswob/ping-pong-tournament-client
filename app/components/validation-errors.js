import Component from '@glimmer/component';
import { computed } from '@ember/object';

export default class ValidationErrorsComponent extends Component {
  @computed('args.errors.[]', 'args.key')
  get errors() {
    const { errors, key } = this.args;

    let errorsForKey = [];

    errors.forEach((error) => {
      if (error.key != key) {
        return;
      }

      if (Array.isArray(error.validation)) {
        errorsForKey = error.validation;
      } else {
        errorsForKey.push(error.validation);
      }
    });

    return errorsForKey;
  }
}
