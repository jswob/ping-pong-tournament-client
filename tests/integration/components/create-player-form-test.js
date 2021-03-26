import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Integration | Component | create-player-form', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.setProperties({ createMode: false, testAction: () => true });
  });

  test('It renders itself correctly', async function (assert) {
    assert.expect(16);

    const testData = {
      class: 'some-class',
    };

    this.setProperties(testData);

    await render(
      hbs`<CreatePlayerForm data-test-create-player-form class={{this.class}} @createMode={{this.createMode}} @switchMode={{this.testAction}} />`
    );

    assert
      .dom('[data-test-create-player-form]')
      .exists({ count: 1 })
      .hasClass('create-player-form')
      .hasClass(testData.class, 'It has passed class');

    assert
      .dom('[data-test-switch-button]')
      .exists({ count: 1 })
      .hasClass('switch-button')
      .hasText('Add player');
    assert
      .dom('[data-test-nickname-input')
      .doesNotExist();
    assert
      .dom('[data-test-submit-button]')
      .doesNotExist();

    this.set('createMode', true);

    assert
      .dom('[data-test-switch-button]')
      .doesNotExist();
    assert
      .dom('[data-test-nickname-input')
      .exists({ count: 1 })
      .hasClass('nickname-input')
      .hasProperty('placeholder', 'Nickname');
    assert
      .dom('[data-test-submit-button]')
      .exists({ count: 1 })
      .hasClass('submit-button');
    assert
      .dom('[data-test-submit-button] > i')
      .exists({ count: 1 })
      .hasText('person_add');
  });

  test('It shows error message if nickname is empty', async function (assert) {
    assert.expect(3);

    const store = this.owner.lookup('service:store');

    this.set('createMode', true);

    assert.equal(
      store.findAll('player').length,
      0,
      'By default there are no players'
    );

    await render(
      hbs`<CreatePlayerForm 
            data-test-create-player-form 
            @createMode={{this.createMode}} 
            @switchMode={{this.testAction}} 
          />`
    );

    await click('[data-test-submit-button]');

    assert
      .dom('[data-test-validation-error]')
      .hasText("Nickname can't be blank");

    assert.equal(store.findAll('player').length, 0, "User hasn't been created");
    })
});
