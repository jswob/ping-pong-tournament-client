import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | setup-game-form/game-settings',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(async function () {
      const testData = {
        class: 'hello',
        changeset: {
          errors: [],
          sets: null,
          pointsToWin: null,
        },
        update: () => {},
      };

      this.setProperties(testData);

      await render(hbs`
        <SetupGameForm::GameSettings 
          class={{this.class}}
          @update={{this.update}} 
          @changeset={{this.changeset}} 
        />`);
    });

    test('it renders all data', async function (assert) {
      assert.expect(9);

      assert
        .dom('[data-test-game-settings]')
        .exists()
        .hasClass('game-settings')
        .hasClass(this.class, 'It has passed class');

      assert.dom('[data-test-sets-option]').exists();
      assert
        .dom('[data-test-sets-option] > [data-test-header]')
        .hasText('Number of sets');
      assert.dom('[data-test-sets-option] [data-test-sets-input]').exists();

      assert.dom('[data-test-points-option]').exists();
      assert
        .dom('[data-test-points-option] > [data-test-header]')
        .hasText('Number of points to win a set');
      assert.dom('[data-test-points-option] [data-test-points-input]').exists();
    });

    test('it renders passed validation errors', async function (assert) {
      assert.expect(9);

      assert.dom('[data-test-validation-error]').doesNotExist();

      this.set('changeset', {
        errors: [
          { key: 'sets', validation: 'dsafas' },
          { key: 'pointsToWin', validation: ['hello', 'world'] },
        ],
      });

      assert.dom('[data-test-validation-error]').exists({ count: 3 });

      assert
        .dom('[data-test-sets-option] [data-test-validation-error]')
        .exists()
        .hasText(this.changeset.errors[0].validation);

      assert
        .dom(
          '[data-test-points-option] [data-test-validation-error]:nth-child(1)'
        )
        .exists()
        .hasText(this.changeset.errors[1].validation[0]);

      assert
        .dom(
          '[data-test-points-option] [data-test-validation-error]:nth-child(2)'
        )
        .exists()
        .hasText(this.changeset.errors[1].validation[1]);

      this.set('changeset', {
        errors: [],
      });

      assert.dom('[data-test-validation-error]').doesNotExist();
    });

    test('it correctly executes passed update action', async function (assert) {
      assert.expect(6);

      this.set('update', (changeset, key, event) => {
        assert.ok(changeset);
        assert.equal(key, 'sets');
        assert.ok(event);
      });

      await fillIn('[data-test-sets-input]', 12);

      this.set('update', (changeset, key, event) => {
        assert.ok(changeset);
        assert.equal(key, 'pointsToWin');
        assert.ok(event);
      });

      await fillIn('[data-test-points-input]', 12);
    });
  }
);
