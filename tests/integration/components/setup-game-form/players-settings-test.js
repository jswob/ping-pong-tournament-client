import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
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

    test('it shows selected options correctly', async function (assert) {
      assert.expect(4);

      this.set('action', (changeset, key, value) => {
        assert.ok(true, 'Passed update action has been invoked');

        changeset[key] = value;
      });

      assert
        .dom('[data-test-player1-option] .ember-basic-dropdown-trigger')
        .hasNoText('In the beginning first select is empty');

      assert
        .dom('[data-test-player2-option] .ember-basic-dropdown-trigger')
        .hasNoText('In the beginning second select is empty');

      this.set('changeset', {
        player1: { nickname: 'player1' },
        player2: { nickname: 'player2' },
        errors: [],
        validate: () => {},
        changes: [],
      });

      assert
        .dom('[data-test-player1-option] .ember-basic-dropdown-trigger')
        .hasText(
          this.changeset.player1.nickname,
          'If player1 is selected, selcect 1 shows its nickname'
        );

      assert
        .dom('[data-test-player2-option] .ember-basic-dropdown-trigger')
        .hasText(
          this.changeset.player2.nickname,
          'If player2 is selected, selcect 2 shows its nickname'
        );
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
