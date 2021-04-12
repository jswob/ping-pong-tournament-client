import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | casual/new', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('It is possible to visist /casual/new', async function (assert) {
    assert.expect(1);

    await visit('/casual/new');

    assert.equal(currentURL(), '/casual/new');
  });

  test('User can create a new casual game', async function (assert) {
    assert.expect(7);

    const schema = this.server.schema.games;

    const testData = {
      player1: 'player1',
      player2: 'player2',
      amountOfSets: 4,
      pointsToWin: 27,
    };

    this.server.createList('player', 2);

    const store = this.owner.lookup('service:store');

    await visit('/casual/new');

    assert.equal(
      schema.all().length,
      0,
      'In the beginnig there is no game record in store'
    );

    await click('[data-test-player1-option] .ember-basic-dropdown-trigger');
    await fillIn('.ember-basic-dropdown-content input', testData.player1);
    await click('ul > li');

    await click('[data-test-player2-option] .ember-basic-dropdown-trigger');
    await fillIn('.ember-basic-dropdown-content input', testData.player2);
    await click('ul > li');

    await fillIn('[data-test-sets-input]', testData.amountOfSets);

    await fillIn('[data-test-points-input]', testData.pointsToWin);

    await click('[data-test-submit-button]');

    assert.equal(
      schema.all().length,
      1,
      'After submiting form game record has been created'
    );

    const game = schema.all().models[0];

    assert.equal(game.playerIds[0], '1', 'player1 is correct');
    assert.equal(game.playerIds[1], '2', 'player2 is correct');

    assert.equal(
      game.amountOfSets,
      testData.amountOfSets,
      'amountOfSets is correct'
    );
    assert.equal(
      game.pointsToWin,
      testData.pointsToWin,
      'pointsToWin is correct'
    );

    assert.equal(currentURL(), `/casual/play/${game.id}`);
  });
});
