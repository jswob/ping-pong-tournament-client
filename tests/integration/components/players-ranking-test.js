import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Integration | Component | players-ranking', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.server.createList('player', 2);

    const store = this.owner.lookup('service:store');

    const playersRecords = await store.findAll('player');

    this.setProperties({
      players: playersRecords,
      updateFilterQuery: () => {},
      filterQuery: 'player',
    });
  });

  test('it renders iteself correctly', async function (assert) {
    assert.expect(7);

    await render(hbs`
      <PlayersRanking 
        @players={{this.players}} 
        @filterQuery={{this.filterQuery}} 
        @updateFilterQuery={{this.updateFilterQuery}} 
      />`);

    assert
      .dom('[data-test-players-ranking]')
      .exists()
      .hasClass('players-ranking');

    assert
      .dom('[data-test-players-ranking] > [data-test-filter-input]')
      .exists()
      .hasClass('filter-input')
      .hasValue(this.filterQuery);

    assert
      .dom('[data-test-players-ranking] > [data-test-ranking-players-list]')
      .exists();

    assert.dom('[data-test-single-player]').exists({ count: 2 });
  });

  test('it invokes updateFilterQuery method on change of the filter-input value', async function (assert) {
    assert.expect(2);

    const inputValue = 'some-value';

    this.set('updateFilterQuery', (event) => {
      assert.ok(true, 'updateFilterQuery has been invoked');
      assert.equal(
        inputValue,
        event.target.value,
        'It passes event to the updateFilterQuery function'
      );
    });

    await render(hbs`
      <PlayersRanking 
        @players={{this.players}} 
        @filterQuery={{this.filterQuery}} 
        @updateFilterQuery={{this.updateFilterQuery}} 
      />`);

    await fillIn('[data-test-filter-input]', inputValue);
  });
});
