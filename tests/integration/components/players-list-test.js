import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';

module('Integration | Component | players-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders itself correctly', async function (assert) {
    assert.expect(6);

    const testData = {
      class: 'fake-class',
    };

    this.setProperties(testData);

    await render(
      hbs`<PlayersList data-test-players-list class={{this.class}} />`
    );

    assert
      .dom('[data-test-players-list]')
      .exists({ count: 1 })
      .hasClass('players-list')
      .hasClass(testData.class, 'It has passed class');

    assert
      .dom('[data-test-players-list] > [data-test-header]')
      .exists({ count: 1 })
      .hasClass('header')
      .hasText('Players list');
  });

  test('it renders all passed players', async function (assert) {
    assert.expect(2);

    const testData = {
      players: A([
        {
          id: 1,
          nickname: 'player1',
        },
        {
          id: 2,
          nickname: 'player2',
        },
        {
          id: 3,
          nickname: 'player3',
        },
      ]),
    };

    this.setProperties(testData);

    await render(
      hbs`<PlayersList data-test-players-list @players={{this.players}} />`
    );

    assert
      .dom('[data-test-players-list] > [data-test-single-player]')
      .exists({ count: testData.players.length })
      .hasClass('single-player');
  });
});
