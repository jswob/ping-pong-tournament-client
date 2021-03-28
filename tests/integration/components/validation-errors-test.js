import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';

module('Integration | Component | validation-errors', function (hooks) {
  setupRenderingTest(hooks);

  test('it correctly renders errors', async function (assert) {
    assert.expect(7);

    const testData = {
      errors: A([
        { key: 'test', validation: 'test failed 1' },
        { key: 'bad', validation: 'bad' },
        { key: 'test', validation: 'test failed 2' },
      ]),
      key: 'test',
      class: 'some-class',
    };

    this.setProperties(testData);

    await render(
      hbs`<ValidationErrors class={{this.class}} @errors={{this.errors}} @key={{this.key}} />`
    );

    assert
      .dom('[data-test-validation-errors]')
      .exists({ count: 1 })
      .hasClass('validation-errors');

    assert
      .dom('[data-test-validation-error]')
      .exists({ count: 2 })
      .hasText(testData.errors[0].validation)
      .hasClass('validation-error')
      .hasClass(testData.class, 'It has passed class');

    this.set('errors', [{ type: 'some', validation: 'some' }]);

    assert
      .dom('[data-test-validation-errors]')
      .doesNotExist("It doesn't render if there is no errors for given key");
  });
});
