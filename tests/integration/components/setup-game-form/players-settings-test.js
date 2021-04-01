import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module(
  'Integration | Component | setup-game-form/players-settings',
  function (hooks) {
    setupRenderingTest(hooks);
    setupMirage(hooks);

    hooks.beforeEach(async function () {
      this.server.createList('player', 2);

      const store = this.owner.lookup('service:store');

      const testData = {
        class: 'some-class',
        changeset: {
          player1: null,
          player2: null,
          errors: [],
          validate: () => {},
          changes: [],
        },
        update: () => {},
        players: await store.findAll('player'),
      };

      this.setProperties(testData);

      await render(
        hbs`
        <SetupGameForm::PlayersSettings 
          class={{this.class}}
          @players={{this.players}} 
          @changeset={{this.changeset}} 
          @update={{this.update}} 
        />`
      );
    });

    test('it renders all data', async function (assert) {
      assert.expect(7);

      assert
        .dom('[data-test-players-settings]')
        .exists()
        .hasClass('players-settings')
        .hasClass(this.class, 'It has passed class');

      assert.dom('[data-test-player1-option]').exists();

      assert
        .dom('[data-test-player1-option] .ember-basic-dropdown-trigger')
        .exists();

      assert.dom('[data-test-player2-option]').exists();

      assert
        .dom('[data-test-player1-option] .ember-basic-dropdown-trigger')
        .exists();
    });

    test('it opens selects correctly, and shows expected data', async function (assert) {
      assert.expect(7);

      assert.dom('[ul').doesNotExist();

      await click('[data-test-player1-option] .ember-basic-dropdown-trigger');

      assert
        .dom('ul > li')
        .exists(
          { count: this.players.length },
          'After clicking, select 1 shows options'
        );

      assert
        .dom('ul > li:first-child')
        .hasText(this.players.firstObject.nickname);

      await click('ul > li:first-child');

      assert
        .dom('[ul')
        .doesNotExist('After selecting option ul element disappear');

      await click('[data-test-player2-option] .ember-basic-dropdown-trigger');

      assert
        .dom('ul > li')
        .exists(
          { count: this.players.length },
          'After clicking select 2 shows options'
        );

      assert
        .dom('ul > li:first-child')
        .hasText(this.players.firstObject.nickname);

      await click('ul > li:first-child');

      assert
        .dom('[ul')
        .doesNotExist('After selecting option ul element disappear');
    });

    test('it shows errors correctly', async function (assert) {
      assert.expect(4);

      assert
        .dom('[data-test-player1-option] [data-test-validation-error]')
        .doesNotExist();

      assert
        .dom('[data-test-player2-option] [data-test-validation-error]')
        .doesNotExist();

      this.set('changeset', {
        player1: { id: 1, nickname: 'hello' },
        player2: { id: 2, nickname: 'hello' },
        errors: [
          { key: 'player1', validation: 'rewrqewqrew' },
          { key: 'player2', validation: 'rewrqewqrew' },
        ],
        validate: () => {},
        changes: [],
      });

      assert
        .dom('[data-test-player1-option] [data-test-validation-error]')
        .exists();

      assert
        .dom('[data-test-player2-option] [data-test-validation-error]')
        .exists();
    });

    test('It ables user to filter players in player1 select', async function (assert) {
      assert.expect(2);

      await click('[data-test-player1-option] .ember-power-select-trigger');

      await fillIn(
        '.ember-basic-dropdown-content input',
        this.players.firstObject.nickname
      );

      assert
        .dom('.ember-basic-dropdown-content li')
        .exists({ count: 1 })
        .hasText(this.players.firstObject.nickname);
    });

    test('It ables user to filter players in player2 select', async function (assert) {
      assert.expect(2);

      await click('[data-test-player2-option] .ember-power-select-trigger');

      await fillIn(
        '.ember-basic-dropdown-content input',
        this.players.firstObject.nickname
      );

      assert
        .dom('.ember-basic-dropdown-content li')
        .exists({ count: 1 })
        .hasText(this.players.firstObject.nickname);
    });

    test('it inovkes validate function on changeset correctly', async function (assert) {
      assert.expect(7);

      this.set('changeset', {
        isValid: true,
        player1: null,
        player2: null,
        errors: [],
        validate: (player) => {
          assert.equal(player, 'player2', 'It validates correct player');
        },
        changes: [],
      });

      this.set('update', (changeset, key, player) => {
        assert.ok(changeset.isValid, 'It passes changeset to callback');
        assert.ok(key, 'It passes key to callback');
        assert.ok(player, 'It passes player to callback');
      });

      await click('[data-test-player2-option] .ember-basic-dropdown-trigger');

      await click('ul > li:first-child');

      this.changeset.changes = [{ key: 'player2' }];

      await click('[data-test-player1-option] .ember-basic-dropdown-trigger');

      await click('ul > li:last-child');
    });
  }
);
