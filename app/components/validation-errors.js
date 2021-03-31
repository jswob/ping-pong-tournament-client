import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default class ValidationErrorsComponent extends Component {
  @computed('args.errors.[]', 'args.key')
  get errors() {
    const { errors, key } = this.args;

    let errorsForKey;

    errors.forEach((error) => {
      if (error.key === key) {
        errorsForKey = error.validation;
      }
    });

    if (!errorsForKey) {
      return [];
    }

    if (!Array.isArray(errorsForKey)) {
      errorsForKey = [errorsForKey];
    }

    return A(errorsForKey);
  }
}
