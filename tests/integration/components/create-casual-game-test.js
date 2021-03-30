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
    assert.expect(5);

    await render(hbs`
      <CreateCasualGame 
        @players={{this.players}} 
        @callback={{this.callback}} 
      />`);

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

  test('it validates game correctly', async function (assert) {
    assert.expect(16);

    await render(hbs`
      <CreateCasualGame 
        @players={{this.players}} 
        @callback={{this.callback}} 
      />`);

    assert.dom('[data-test-validation-error]').doesNotExist();

    await click('[data-test-player1-option] .ember-basic-dropdown-trigger');
    await click('ul > li:first-child');

    assert.dom('[data-test-validation-error]').doesNotExist();

    await click('[data-test-player2-option] .ember-basic-dropdown-trigger');
    await click('ul > li:first-child');

    assert.dom('[data-test-validation-error]').exists({ count: 2 });

    assert
      .dom('[data-test-player1-option] [data-test-validation-error]')
      .exists({ count: 1 });
    assert
      .dom('[data-test-player2-option] [data-test-validation-error]')
      .exists({ count: 1 });

    await click('[data-test-player2-option] .ember-basic-dropdown-trigger');
    await click('ul > li:last-child');

    assert.dom('[data-test-validation-error]').doesNotExist();

    await click('[data-test-player1-option] .ember-basic-dropdown-trigger');
    await click('ul > li:last-child');

    assert.dom('[data-test-validation-error]').exists({ count: 2 });

    assert
      .dom('[data-test-player1-option] [data-test-validation-error]')
      .exists({ count: 1 });
    assert
      .dom('[data-test-player2-option] [data-test-validation-error]')
      .exists({ count: 1 });

    await click('[data-test-player1-option] .ember-basic-dropdown-trigger');
    await click('ul > li:first-child');

    assert.dom('[data-test-validation-error]').doesNotExist();

    await fillIn('[data-test-sets-input]', -1);

    assert.dom('[data-test-validation-error]').exists({ count: 1 });

    assert
      .dom('[data-test-sets-option] [data-test-validation-error]')
      .exists({ count: 1 });

    await fillIn('[data-test-sets-input]', 1);

    assert.dom('[data-test-validation-error]').doesNotExist();

    await fillIn('[data-test-points-input]', -1);

    assert.dom('[data-test-validation-error]').exists({ count: 1 });

    assert
      .dom('[data-test-points-option] [data-test-validation-error]')
      .exists({ count: 1 });

    await fillIn('[data-test-points-input]', 1);

    assert.dom('[data-test-validation-error]').doesNotExist();
  });

  test('if there are no errors, invokes callback with game data as argument', async function (assert) {
    assert.expect(160);

    const testData = {
      sets: 5,
      pointsToWin: 20
    }

    this.set('callback', (settings) => {
      assert.ok(true, "Callback has been invoked");
      assert.equal(
        settings.player1.nickname,
        this.players.objectAt(0).nickname,
        "player1 is correctly set"
      );
      assert.equal(
        settings.player2.nickname,
        this.players.objectAt(1).nickname,
        'player2 is correctly set'
      );
      assert.equal(
        settings.sets,
        testData.sets,
        'sets is correctly set'
      );
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

    await fillIn('[data-test-sets-input]', -1);

    assert.dom('[data-test-validation-error]').exists();

    await click('[data-test-submit-button]');

    await fillIn('[data-test-sets-input]', testData.sets);
    await fillIn('[data-test-points-input]', testData.pointsToWin);
    
    await click('[data-test-submit-button]');
  });
});
