import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | validation-error', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders passed error', async function (assert) {
    assert.expect(4);

    const testData = {
      validationError: 'some error',
      class: 'some-class',
    };

    this.setProperties(testData);

    await render(
      hbs`<ValidationError class={{this.class}} @error={{this.validationError}} />`
    );

    assert
      .dom('[data-test-validation-error]')
      .exists({ count: 1 })
      .hasText(testData.validationError)
      .hasClass('validation-error')
      .hasClass(testData.class, 'It has passed class');
  });
});
