import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | main-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders title and all links', async function (assert) {
    const testData = {
      class: 'test-class-name',
    };

    this.set('testData', testData);

    await render(
      hbs`<MainMenu data-test-main-menu class={{this.testData.class}} />`
    );

    assert
      .dom('[data-test-main-menu]')
      .exists()
      .hasClass('MainMenu')
      .hasClass(testData.class, 'It has passed class');

    assert.dom('[data-test-main-menu] > h1').hasText('Ping Pong Tournament');
  });
});
