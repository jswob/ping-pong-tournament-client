import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | menu/option', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders link based on passed data', async function (assert) {
    const testData = {
      route: 'test',
      label: 'test label',
      class: 'custom-class',
    };

    this.set('testData', testData);

    await render(
      hbs`<Menu::Option data-test-option="0" class={{this.testData.class}} @route={{this.testData.route}} @label={{this.testData.label}} />`
    );

    assert
      .dom('[data-test-option="0"]')
      .hasText(testData.label)
      .hasClass('menu-option')
      .hasClass(testData.class, 'Custom class is added');
  });
});
