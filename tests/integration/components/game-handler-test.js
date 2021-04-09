import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | game-handler', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    let store = this.owner.lookup('service:store');

    const player1 = store.createRecord('player', { nickname: 'some1', id: 1 });
    const player2 = store.createRecord('player', { nickname: 'some2', id: 2 });

    const game = store.createRecord('game', {
      players: [player1, player2],
      amountOfSets: 2,
      pointsToWin: 2,
    });

    this.setProperties({
      store,
      game,
      callback: () => {},
    });
  });

  test('it renders itself correctly', async function (assert) {
    assert.expect(6);

    const className = 'some-class';

    this.set('className', className);

    await render(hbs`
      <GameHandler 
        class={{this.className}} 
        @game={{this.game}} 
        @callback={{this.callback}} 
      />`);

    assert
      .dom('[data-test-game-handler]')
      .exists()
      .hasClass('game-handler')
      .hasClass(className, 'It has passed class');

    assert.dom('[data-test-sets-list]').exists().hasClass('sets-list');

    assert
      .dom('[data-test-sets-list] > [data-test-single-set]')
      .exists({ count: 1 });
  });

  test('Result is only rendered when there is a winner', async function (assert) {
    assert.expect(2);

    this.set('callback', () => {});

    await render(hbs`
      <GameHandler 
        @game={{this.game}} 
        @callback={{this.callback}} 
      />`);

    assert.dom('[data-test-game-handler] > [data-test-result]').doesNotExist();

    this.set('game.result', '2/1');
    this.set('game.winner', this.get('game.players').firstObject);

    assert.dom('[data-test-game-handler] > [data-test-result]').exists();
  });

  test('When game is finished it is possible to invoke callback on click', async function (assert) {
    assert.expect(1);

    this.set('callback', () => {
      assert.ok(true, 'It invokes callback');
    });

    await render(hbs`
      <GameHandler 
        @game={{this.game}} 
        @callback={{this.callback}} 
      />`);

    this.set('game.result', '2/1');
    this.set('game.winner', this.get('game.players').firstObject);

    await click('[data-test-finish-button]');
  });

  test('On render it creates a local set record', async function (assert) {
    assert.expect(2);

    const { store } = this;

    assert.equal(store.peekAll('set').length, 0, 'Initially there are no sets');

    await render(hbs`
      <GameHandler 
        @game={{this.game}} 
        @callback={{this.callback}} 
      />`);

    assert.equal(
      store.peekAll('set').length,
      1,
      'After render there is one set'
    );
  });

  test('If game is not settled after settling set it renders a new set and disables old one', async function (assert) {
    assert.expect(5);

    const pointsToWin = this.get('game.pointsToWin');

    await render(hbs`
      <GameHandler 
        @game={{this.game}} 
        @callback={{this.callback}} 
      />`);

    assert.dom('[data-test-single-set]').exists({ count: 1 });

    for (let clicksOnPlus = 0; clicksOnPlus < pointsToWin; clicksOnPlus++) {
      await click('[data-test-single-set]:nth-child(1) [data-test-plus-icon]');
    }

    assert.dom('[data-test-result]').doesNotExist();

    assert.dom('[data-test-single-set]').exists({ count: 2 });

    assert
      .dom('[data-test-single-set]:nth-child(1) [data-test-plus-icon]')
      .doesNotExist();
    assert
      .dom('[data-test-single-set]:nth-child(2) [data-test-plus-icon]')
      .exists();
  });

  test("If game is settled after settling set it doesn't render a new set", async function (assert) {
    assert.expect(3);

    const pointsToWin = this.get('game.pointsToWin');

    this.set('game.amountOfSets', 1);

    await render(hbs`
      <GameHandler 
        @game={{this.game}} 
        @callback={{this.callback}} 
      />`);

    assert.dom('[data-test-single-set]').exists({ count: 1 });

    for (let clicksOnPlus = 0; clicksOnPlus < pointsToWin; clicksOnPlus++) {
      await click('[data-test-single-set]:nth-child(1) [data-test-plus-icon]');
    }

    assert.dom('[data-test-result]').exists();

    assert
      .dom('[data-test-single-set]:nth-child(1) [data-test-plus-icon]')
      .doesNotExist();
  });
});
