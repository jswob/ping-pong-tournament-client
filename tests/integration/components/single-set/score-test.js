import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | single-set/score', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    let store = this.owner.lookup('service:store');

    const player1 = store.createRecord('player', { nickname: 'some1', id: 1 });
    const player2 = store.createRecord('player', { nickname: 'some2', id: 2 });

    const game = store.createRecord('game', {
      players: [player1, player2],
      amountOfSets: 2,
      pointsToWin: 11,
    });

    const setRecord = store.createRecord('set', { game: game });

    const callback = () => {};

    this.setProperties({
      setRecord,
      callback,
      isEnabled: true,
      scoreParam: 'player1Score',
    });
  });

  test('it renders itself correctly', async function (assert) {
    assert.expect(14);

    const className = 'some-class';
    this.set('className', className);

    await render(
      hbs`
      <SingleSet::Score 
        class={{this.className}}
        @set={{this.setRecord}} 
        @isEnabled={{this.isEnabled}}
        @scoreParam={{this.scoreParam}}
        @callback={{this.callback}}  
      />`
    );

    assert
      .dom('[data-test-score]')
      .exists()
      .hasClass('single-set-score')
      .hasClass(className, 'It has passed class');

    assert
      .dom('[data-test-score] > [data-test-minus-icon]')
      .exists()
      .hasClass('icon')
      .hasClass('minus-icon')
      .hasText('remove_circle');

    assert
      .dom('[data-test-score] > [data-test-plus-icon]')
      .exists()
      .hasClass('icon')
      .hasClass('plus-icon')
      .hasText('add_circle');

    assert
      .dom('[data-test-score] > [data-test-value-span]')
      .exists()
      .hasClass('value-span')
      .hasText(
        this.setRecord.get(this.scoreParam) + '',
        "It shows correct value of player's score"
      );
  });

  test("It doesn't show button icons when isEnabled is false", async function (assert) {
    assert.expect(2);

    this.set('isEnabled', false);

    await render(
      hbs`
      <SingleSet::Score 
        @set={{this.setRecord}} 
        @isEnabled={{this.isEnabled}}
        @scoreParam={{this.scoreParam}}
        @callback={{this.callback}}  
      />`
    );

    assert.dom('[data-test-minus-icon]').doesNotExist();

    assert.dom('[data-test-plus-icon]').doesNotExist();
  });

  test("It has 'winner' or 'loser' class when setRecord isn't enabled", async function (assert) {
    assert.expect(4);

    await render(
      hbs`
      <SingleSet::Score 
        @set={{this.setRecord}} 
        @isEnabled={{this.isEnabled}}
        @scoreParam={{this.scoreParam}}
        @callback={{this.callback}}  
      />`
    );

    this.setRecord.set('winnerIndex', 0);

    assert
      .dom('[data-test-score]')
      .doesNotHaveClass('winner')
      .doesNotHaveClass('loser');

    this.set('isEnabled', false);

    assert.dom('[data-test-score]').hasClass('winner');

    this.set('setRecord.winnerIndex', 1);

    assert.dom('[data-test-score]').hasClass('loser');
  });

  test('It is possible to increment selected scoreParam', async function (assert) {
    assert.expect(3);

    this.set('callback', (set) => {
      assert.ok(true, 'Callback has been invoked');
    });

    await render(
      hbs`
      <SingleSet::Score 
        @set={{this.setRecord}} 
        @isEnabled={{this.isEnabled}}
        @scoreParam={{this.scoreParam}}
        @callback={{this.callback}}  
      />`
    );

    assert.equal(
      this.setRecord.get(this.scoreParam),
      0,
      'Initialy scoreParam value is 0'
    );

    await click('[data-test-plus-icon]');

    assert.equal(
      this.setRecord.get(this.scoreParam),
      1,
      'scoreParam has been updated to 1'
    );
  });

  test('It is possible to decrement selected scoreParam', async function (assert) {
    assert.expect(3);

    this.set('callback', () => {
      assert.ok(true, 'Callback has been invoked');
    });

    await render(
      hbs`
      <SingleSet::Score 
        @set={{this.setRecord}} 
        @isEnabled={{this.isEnabled}}
        @scoreParam={{this.scoreParam}}
        @callback={{this.callback}}  
      />`
    );

    this.set('setRecord.' + this.scoreParam, 1);

    assert.equal(
      this.setRecord.get(this.scoreParam),
      1,
      'Initialy scoreParam value is 1'
    );

    await click('[data-test-minus-icon]');

    assert.equal(
      this.setRecord.get(this.scoreParam),
      0,
      'scoreParam has been updated to 0'
    );
  });

  test('scoreParam cannot be decremented if it equals 0', async function (assert) {
    assert.expect(2);

    this.set('callback', () => {
      assert.ok(false, 'Callback cannot be invoked');
    });

    await render(
      hbs`
      <SingleSet::Score 
        @set={{this.setRecord}} 
        @isEnabled={{this.isEnabled}}
        @scoreParam={{this.scoreParam}}
        @callback={{this.callback}}  
      />`
    );

    this.set('setRecord.' + this.scoreParam, 0);

    assert.equal(
      this.setRecord.get(this.scoreParam),
      0,
      'Initialy scoreParam value is 0'
    );

    await click('[data-test-minus-icon]');

    assert.equal(
      this.setRecord.get(this.scoreParam),
      0,
      'The value remained the same'
    );
  });
});
