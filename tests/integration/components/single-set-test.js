import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | single-set', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    let store = this.owner.lookup('service:store');

    const player1 = store.createRecord('player', { nickname: 'some1', id: 1 });
    const player2 = store.createRecord('player', { nickname: 'some2', id: 2 });

    const game = store.createRecord('game', {
      player1: player1,
      player2: player2,
      amountOfSets: 2,
      pointsToWin: 2,
    });

    const setRecord = store.createRecord('set', { game: game });

    this.setProperties({
      pointsToWin: game.get('pointsToWin'),
      setRecord,
      setNumber: '1',
    });
  });

  test('it renders itself correctly', async function (assert) {
    assert.expect(8);

    this.set('className', 'some-class');

    await render(hbs`
      <SingleSet 
        class={{this.className}}
        @set={{this.setRecord}} 
        @setNumber={{this.setNumber}} 
      />
    `);

    assert
      .dom('[data-test-single-set]')
      .exists()
      .hasClass('single-set')
      .hasClass(this.className, 'It has passed class');

    assert.dom('[data-test-player-1-score]').exists();

    assert.dom('[data-test-player-2-score]').exists();

    assert
      .dom('[data-test-label-span]')
      .exists()
      .hasClass('label-span')
      .hasText(`SET ${this.setNumber}`);
  });

  test('it handles enable state correctly', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <SingleSet 
        @set={{this.setRecord}} 
        @setNumber={{this.setNumber}} 
      />
    `);

    assert.equal(
      this.setRecord.get('winnerIndex'),
      undefined,
      "Winner of the set hasn't been settled yet"
    );

    assert.dom('[data-test-single-set]').hasClass('enabled');

    assert.dom('[data-test-plus-icon]').exists({ count: 2 });

    assert.dom('[data-test-minus-icon]').exists({ count: 2 });
  });

  test('it handles disable state correctly', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <SingleSet 
        @set={{this.setRecord}} 
        @setNumber={{this.setNumber}} 
      />
    `);

    this.set('setRecord.winnerIndex', 0);

    assert.equal(
      this.setRecord.get('winnerIndex'),
      0,
      'Winner has been settled'
    );

    assert.dom('[data-test-single-set]').hasClass('disabled');

    assert.dom('[data-test-plus-icon]').doesNotExist();

    assert.dom('[data-test-minus-icon]').doesNotExist();
  });

  module('actions', function () {
    test('it handles win of player1 correctly', async function (assert) {
      assert.expect(4);

      this.set('onSettleGame', () => {
        assert.ok(true, 'onSettleGame has been invoked');
      });

      await render(hbs`
      <SingleSet 
        @set={{this.setRecord}} 
        @setNumber={{this.setNumber}} 
        @onSettleGame={{this.onSettleGame}}
      />
    `);

      assert.equal(
        this.setRecord.winnerIndex,
        undefined,
        "Initialy winner hasn't been settled"
      );

      for (let clicksOnPlayer1 = 0; clicksOnPlayer1 < this.pointsToWin; clicksOnPlayer1++) {
        await click('[data-test-player-1-score] [data-test-plus-icon]');
      }

      assert.equal(
        this.setRecord.winnerIndex,
        0,
        'When player1 score reaches expected amount, he becomes a winner'
      );

      assert.dom('[data-test-single-set]').hasClass('disabled');
    });

    test('it handles win of player2 correctly', async function (assert) {
      assert.expect(4);

      this.set('onSettleGame', () => {
        assert.ok(true, 'onSettleGame has been invoked');
      });

      await render(hbs`
      <SingleSet 
        @set={{this.setRecord}} 
        @setNumber={{this.setNumber}} 
        @onSettleGame={{this.onSettleGame}}
      />
    `);

      assert.equal(
        this.setRecord.winnerIndex,
        undefined,
        "Initialy winner hasn't been settled"
      );

      for (let clicksOnPlayer2 = 0; clicksOnPlayer2 < this.pointsToWin; clicksOnPlayer2++) {
        await click('[data-test-player-2-score] [data-test-plus-icon]');
      }

      assert.equal(
        this.setRecord.winnerIndex,
        1,
        'When player2 score reaches expected amount, he becomes a winner'
      );

      assert.dom('[data-test-single-set]').hasClass('disabled');
    });

    test('Player needs advantage of at least two points to win', async function (assert) {
      assert.expect(3);

      this.set('onSettleGame', () => {});

      await render(hbs`
      <SingleSet 
        @set={{this.setRecord}} 
        @setNumber={{this.setNumber}} 
        @onSettleGame={{this.onSettleGame}}
      />
    `);

      assert.equal(
        this.setRecord.winnerIndex,
        undefined,
        "Initialy winner hasn't been settled"
      );

      for (let clicksOnPlayer1 = 0; clicksOnPlayer1 < (this.pointsToWin - 1); clicksOnPlayer1++) {
        await click('[data-test-player-1-score] [data-test-plus-icon]');
      }

      for (let clicksOnPlayer2 = 0; clicksOnPlayer2 < this.pointsToWin; clicksOnPlayer2++) {
        await click('[data-test-player-2-score] [data-test-plus-icon]');
      }

      assert.equal(
        this.setRecord.winnerIndex,
        undefined,
        'If none of the players has expected advantage there is no winner'
      );

      for (let clicksOnPlayer1 = 0; clicksOnPlayer1 < 3; clicksOnPlayer1++) {
        await click('[data-test-player-1-score] [data-test-plus-icon]');
      }

      assert.equal(
        this.setRecord.winnerIndex,
        0,
        'When player reaches expected advantege, player becomes a winner'
      );
    });
  });
});
