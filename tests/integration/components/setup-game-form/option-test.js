import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | setup-game-form/option', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders as expected', async function (assert) {
    assert.expect(11);

    const testData = {
      title: 'some title',
      class: 'test-class',
      errors: [
        { key: 'test', validation: 'validation' },
        { key: 'fdsaf', validation: 'validation' },
        { key: 'test', validation: 'validation' },
      ],
      key: 'test',
    };

    
    this.setProperties({ ...testData });

    await render(hbs`
      <SetupGameForm::Option 
        class={{this.class}} 
        @title={{this.title}} 
        @errors={{this.errors}} 
        @key={{this.key}}
      >
        <input data-test-child />
      </SetupGameForm::Option>
    `);

    assert
      .dom('[data-test-setup-game-form-option]')
      .exists({ count: 1 })
      .hasClass('setup-game-form-option')
      .hasClass(testData.class);

    assert
      .dom('[data-test-child]')
      .exists({ count: 1 }, 'Childs are generated');

    assert
      .dom('[data-test-header]')
      .exists({ count: 1 })
      .hasClass('header')
      .hasText(testData.title);

    assert
      .dom('[data-test-validation-error]')
      .exists({ count: 2 })
      .hasText(testData.errors[0].validation);

    this.set('title', null);

    assert
      .dom('[data-test-header]')
      .doesNotExist("If title isn't passed, headline element is not generated");

    this.set('errors', [{ key: 'some', validation: 'some' }]);

    assert
      .dom('[data-test-validation-errors]')
      .doesNotExist(
        "If errors aren't passed, validation-errors component is not generated"
      );
  });
});
