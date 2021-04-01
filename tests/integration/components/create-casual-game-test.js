import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Integration | Component | create-casual-game', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.server.createList('player', 2);

    const store = this.owner.lookup('service:store');

    const testData = {
      callback: () => {},
      players: await store.findAll('player'),
    };

    this.setProperties(testData);
  });

  test('it renders itself correctly', async function (assert) {
    assert.expect(8);

    const className = 'some-class';

    this.set('class', className);

    await render(hbs`
      <CreateCasualGame 
        class={{this.class}}
        @players={{this.players}} 
        @callback={{this.callback}} 
      />`);

    assert
      .dom('[data-test-create-casual-game]')
      .exists()
      .hasClass('create-casual-game')
      .hasClass(className, 'It has passed class');

    assert.dom('[data-test-setup-game-form]').exists();

    assert
      .dom('[data-test-setup-game-form] > [data-test-main-header]')
      .hasText('Settings');

    assert
      .dom('[data-test-setup-game-form] > [data-test-submit-button]')
      .hasText('New Game');

    assert.dom('[data-test-players-settings]').exists();

    assert.dom('[data-test-game-settings]').exists();
  });

  test('if there are errors, submit button is disabled', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <CreateCasualGame 
        @players={{this.players}} 
        @callback={{this.callback}} 
      />`);

    await fillIn('[data-test-sets-input]', -1);

    assert.dom('[data-test-validation-error]').exists();

    assert.dom('[data-test-submit-button]').isDisabled();
  });

  test('if there are no errors, invokes callback with game data as argument', async function (assert) {
    assert.expect(5);

    const testData = {
      sets: 5,
      pointsToWin: 20,
    };

    this.set('callback', (settings) => {
      assert.ok(true, 'Callback has been invoked');
      assert.equal(
        settings.player1.nickname,
        this.players.objectAt(0).nickname,
        'player1 is correctly set'
      );
      assert.equal(
        settings.player2.nickname,
        this.players.objectAt(1).nickname,
        'player2 is correctly set'
      );
      assert.equal(settings.sets, testData.sets, 'sets is correctly set');
      assert.equal(
        settings.pointsToWin,
        testData.pointsToWin,
        'pointsToWin is correctly set'
      );
    });

    await render(hbs`
      <CreateCasualGame 
        @players={{this.players}} 
        @callback={{this.callback}} 
      />`);

    await click('[data-test-player1-option] .ember-basic-dropdown-trigger');
    await click('ul > li:first-child');

    await click('[data-test-player2-option] .ember-basic-dropdown-trigger');
    await click('ul > li:last-child');

    await fillIn('[data-test-sets-input]', testData.sets);
    await fillIn('[data-test-points-input]', testData.pointsToWin);

    await click('[data-test-submit-button]');
  });
});

module(
  'Integration | Component | create-casual-game validation',
  function (hooks) {
    setupRenderingTest(hooks);
    setupMirage(hooks);

    hooks.beforeEach(async function () {
      this.server.createList('player', 2);

      const store = this.owner.lookup('service:store');

      const testData = {
        callback: () => {},
        players: await store.findAll('player'),
      };

      this.setProperties({ ...testData });

      await render(hbs`
      <CreateCasualGame 
        @players={{this.players}} 
        @callback={{this.callback}} 
      />`);
    });

    test('Both players must be selected', async function (assert) {
      assert.expect(10);

      assert.dom('[data-test-validation-error]').doesNotExist();

      await click('[data-test-submit-button]');

      assert.dom('[data-test-validation-error]').exists({ count: 4 });

      assert
        .dom(
          '[data-test-player1-option] [data-test-validation-error]:first-child'
        )
        .exists()
        .hasText("Player1 can't be blank");

      assert
        .dom(
          '[data-test-player1-option] [data-test-validation-error]:last-child'
        )
        .exists()
        .hasText('Player1 must have correct type');

      assert
        .dom(
          '[data-test-player2-option] [data-test-validation-error]:first-child'
        )
        .exists()
        .hasText("Player2 can't be blank");

      assert
        .dom(
          '[data-test-player2-option] [data-test-validation-error]:last-child'
        )
        .exists()
        .hasText('Player2 must have correct type');
    });

    test("Selected players can't be the same", async function (assert) {
      assert.expect(7);

      assert.dom('[data-test-validation-error]').doesNotExist();

      await click('[data-test-player1-option] .ember-basic-dropdown-trigger');
      await click('ul > li:first-child');

      assert.dom('[data-test-validation-error]').doesNotExist();

      await click('[data-test-player2-option] .ember-basic-dropdown-trigger');
      await click('ul > li:first-child');

      assert.dom('[data-test-validation-error]').exists({ count: 2 });

      assert
        .dom('[data-test-player1-option] [data-test-validation-error]')
        .exists({ count: 1 })
        .hasText("Player1 can't be the same as Player2");

      assert
        .dom('[data-test-player2-option] [data-test-validation-error]')
        .exists({ count: 1 })
        .hasText("Player2 can't be the same as Player1");
    });

    test('sets must be inteager greater than 0', async function (assert) {
      assert.expect(8);

      assert.dom('[data-test-validation-error]').doesNotExist();

      await fillIn('[data-test-sets-input]', 'blabla');

      assert.dom('[data-test-validation-error]').exists({ count: 1 });

      assert
        .dom('[data-test-sets-option] [data-test-validation-error]')
        .exists()
        .hasText('Sets must be a number');

      await fillIn('[data-test-sets-input]', 0);

      assert.dom('[data-test-validation-error]').exists({ count: 1 });

      assert
        .dom('[data-test-sets-option] [data-test-validation-error]')
        .exists()
        .hasText('Sets must be greater than 0');

      await fillIn('[data-test-sets-input]', 1);

      assert.dom('[data-test-validation-error]').doesNotExist();
    });

    test('pointsToWin number must be inteager greater than 0', async function (assert) {
      assert.expect(8);

      assert.dom('[data-test-validation-error]').doesNotExist();

      await fillIn('[data-test-points-input]', 'blabla');

      assert.dom('[data-test-validation-error]').exists({ count: 1 });

      assert
        .dom('[data-test-points-option] [data-test-validation-error]')
        .exists()
        .hasText('Points to win must be a number');

      await fillIn('[data-test-points-input]', 0);

      assert.dom('[data-test-validation-error]').exists({ count: 1 });

      assert
        .dom('[data-test-points-option] [data-test-validation-error]')
        .exists()
        .hasText('Points to win must be greater than 0');

      await fillIn('[data-test-points-input]', 1);

      assert.dom('[data-test-validation-error]').doesNotExist();
    });
  }
);
