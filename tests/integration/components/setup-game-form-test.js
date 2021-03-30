import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | setup-game-form', function (hooks) {
  setupRenderingTest(hooks);

  test('It renders itself correctly', async function (assert) {
    assert.expect(12);

    const testData = {
      changeset: { isValid: false, validate: () => {} },
      buttonText: 'some button text',
      headline: 'some headline',
      class: 'some-class',
    };

    this.setProperties({ ...testData });

    await render(hbs`
      <SetupGameForm 
        class={{this.class}}
        @changeset={{this.changeset}}
        @buttonText={{this.buttonText}} 
        @headline={{this.headline}} 
      >
        <div data-test-child ></div>
      </SetupGameForm>
      `);

    assert
      .dom('[data-test-setup-game-form]')
      .exists()
      .hasClass('setup-game-form')
      .hasClass(this.class, 'It has passed class');

    assert
      .dom('[data-test-setup-game-form] > [data-test-main-header]')
      .exists()
      .hasClass('main-header')
      .hasText(this.headline);

    assert.dom('[data-test-child]').exists();

    assert
      .dom('[data-test-setup-game-form] > [data-test-h-rull]')
      .exists()
      .hasClass('h-rull');

    assert
      .dom('[data-test-setup-game-form] > [data-test-submit-button]')
      .exists()
      .hasClass('submit-button')
      .hasText(this.buttonText);
  });

  test("If changeset is invalid, submit button has 'disabled' class", async function (assert) {
    assert.expect(2);

    const testData = {
      changeset: {
        isValid: true,
        validate: () => {},
      },
    };

    this.setProperties({ ...testData });

    await render(hbs`<SetupGameForm @changeset={{this.changeset}} />`);

    assert.dom('[data-test-submit-button]').doesNotHaveClass('disabled');

    this.set('changeset', { isValid: false });

    assert.dom('[data-test-submit-button]').hasClass('disabled');
  });

  test('It correctly handles submit event', async function (assert) {
    assert.expect(2);

    const testData = {
      changeset: {
        isValid: false,
        validate: () => {
          assert.ok(true, 'Changeset validate method has been invoked');
        },
      },
      callback: (changeset) => {
        assert.ok(
          changeset.isValid,
          'Callback has been invoked with valid changeset'
        );
      },
    };

    this.setProperties({ ...testData });

    await render(hbs`
      <SetupGameForm 
        @changeset={{this.changeset}} 
        @onSubmit={{this.callback}} 
        @buttonText="some" 
      />`);

    await click('[data-test-submit-button]');

    this.set('changeset', { isValid: true });

    await click('[data-test-submit-button]');
  });
});
