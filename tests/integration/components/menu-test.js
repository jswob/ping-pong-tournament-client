import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | menu', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders all passed childs and has correct classes', async function (assert) {
    assert.expect(3);

    const testData = {
      class: 'test-class-name',
    };

    this.set('testData', testData);

    await render(hbs`
      <Menu data-test-menu class={{this.testData.class}}>
        <div data-test-div></div>
      </Menu>
    `);

    assert
      .dom('[data-test-menu]')
      .hasClass('menu')
      .hasClass(testData.class, 'It has passed class');

    assert.dom('[data-test-div]').exists('The child is rendered');
  });
});
