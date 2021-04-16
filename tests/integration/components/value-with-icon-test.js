import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | value-with-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders itself correctly', async function (assert) {
    assert.expect(9);

    const testData = {
      className: 'some-class',
      value: 'some123',
      icon: 'crown',
    };

    this.setProperties(testData);

    await render(hbs`
      <ValueWithIcon 
        class={{this.className}} 
        @value={{this.value}} 
        @icon={{this.icon}} 
      />`);

    assert
      .dom('[data-test-value-with-icon]')
      .exists()
      .hasClass('value-with-icon-wrapper')
      .hasClass(testData.className, 'It has passed class');

    assert
      .dom('[data-test-value-with-icon] > [data-test-value]')
      .exists()
      .hasClass('value')
      .hasText(testData.value);

    assert
      .dom('[data-test-value-with-icon] > [data-test-icon]')
      .exists()
      .hasClass('icon')

    assert.dom('[data-test-icon] > svg').hasClass(`fa-${testData.icon}`);
  });

  test('it correctly sets flex-row class', async function (assert) {
    assert.expect(2);

    const testData = {
      value: 'some123',
      icon: 'crown',
      reverse: false,
    };

    this.setProperties(testData);

    await render(hbs`
      <ValueWithIcon  
        @value={{this.value}} 
        @icon={{this.icon}} 
        @reverse={{this.reverse}}
      />`);

    assert.dom('[data-test-value-with-icon]').hasClass('flex-row');

    this.set('reverse', true);

    assert.dom('[data-test-value-with-icon]').hasClass('flex-row-reverse');
  });
});
