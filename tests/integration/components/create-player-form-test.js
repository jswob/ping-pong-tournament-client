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
      .dom('[data-test-create-player-form] > [data-test-switch-button]')
      .exists({ count: 1 })
      .hasClass('switch-button')
      .hasText('Add player');
    assert
      .dom('[data-test-create-player-form] > [data-test-nickname-input')
      .doesNotExist();
    assert
      .dom('[data-test-create-player-form] > [data-test-submit-button]')
      .doesNotExist();

    this.set('createMode', true);

    assert
      .dom('[data-test-create-player-form] > [data-test-switch-button]')
      .doesNotExist();
    assert
      .dom('[data-test-create-player-form] > [data-test-nickname-input')
      .exists({ count: 1 })
      .hasClass('nickname-input')
      .hasProperty('placeholder', 'Nickname');
    assert
      .dom('[data-test-create-player-form] > [data-test-submit-button]')
      .exists({ count: 1 })
      .hasClass('submit-button');
    assert
      .dom('[data-test-create-player-form] > [data-test-submit-button] > i')
      .exists({ count: 1 })
      .hasText('person_add');
  });

  test('It ables user to create a player', async function (assert) {
    assert.expect(6);

    const store = this.owner.lookup('service:store');

    const player = {
      nickname: 'some test nickname',
    };

    const testData = {
      switchMode: () => {
        assert.ok(true, 'Passed switchMode has been invoked');
        this.set('createMode', !this.createMode);
      },
    };

    this.setProperties(testData);

    assert.equal(store.peekAll('player').length, 0, 'It starts with 0 player');

    await render(
      hbs`<CreatePlayerForm data-test-create-player-form @createMode={{this.createMode}} @switchMode={{this.switchMode}} />`
    );

    await click('[data-test-switch-button]');

    await click('[data-test-submit-button]');

    assert.equal(
      store.peekAll('player').length,
      0,
      'If nickname input is empty user cannot add a player'
    );

    await fillIn('[data-test-nickname-input]', player.nickname);

    await click('[data-test-submit-button]');

    assert.equal(
      store.peekAll('player').length,
      1,
      'After clicking on submit-button new player has been added'
    );

    assert.equal(
      store.peekAll('player').firstObject.nickname,
      player.nickname,
      'Creted player has correct nickname'
    );
  });
});
