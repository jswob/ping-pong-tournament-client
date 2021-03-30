import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';

module('Integration | Component | validation-errors', function (hooks) {
  setupRenderingTest(hooks);

  test('it correctly renders errors', async function (assert) {
    assert.expect(8);

    const testData = {
      errors: A([
        { key: 'test', validation: ['test failed 1', 'test failed 2'] },
        { key: 'bad', validation: 'bad' },
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
      .exists({ count: 2 }, 'It correctly renders multiple errors')
      .hasText(testData.errors[0].validation[0])
      .hasClass('validation-error')
      .hasClass(testData.class, 'It has passed class');

    this.set('errors', A([{ key: this.key, validation: 'some' }]));

    assert
      .dom('[data-test-validation-error]')
      .exists({ count: 1 }, 'It correctly render single error');

    this.set('errors', A([{ key: 'some', validation: 'test failed 1' }]));

    assert
      .dom('[data-test-validation-errors]')
      .doesNotExist("It doesn't render if there is no errors for given key");
  });
});
