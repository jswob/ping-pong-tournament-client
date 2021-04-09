import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | page-layout', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders childs and uses args as intended', async function (assert) {
    assert.expect(7);

    const testData = {
      title: 'test title',
      class: 'some-class',
    };

    this.setProperties(testData);

    await render(hbs`
      <PageLayout class={{this.class}} @title={{this.title}}>
        <div data-test-child></div>
      </PageLayout>
    `);

    assert
      .dom('[data-test-page-layout]')
      .exists({ count: 1 })
      .hasClass('page-layout')
      .hasClass(testData.class, 'It has passed class');

    assert
      .dom('[data-test-page-layout] > [data-test-main-header]')
      .exists({ count: 1 })
      .hasClass('main-header')
      .hasText(testData.title, 'Passed title is generated in main header');

    assert
      .dom('[data-test-page-layout] > [data-test-child]')
      .exists({ count: 1 });
  });

  test('if @title is not passed, h1 is not generated', async function (assert) {
    assert.expect(1);

    const testData = {
      title: 'test title',
      class: 'some-class',
    };

    this.setProperties(testData);

    await render(hbs`
      <PageLayout></PageLayout>
    `);

    assert.dom('[data-test-main-header]').doesNotExist();
  });
});
