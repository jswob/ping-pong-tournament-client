import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | highlight', function (hooks) {
  setupRenderingTest(hooks);

  test('it highlights string correctly', async function (assert) {
    assert.expect(11)
    
    this.setProperties({
      base: 'some text',
      highlight: '',
    });

    const check = () => {
      assert.dom('[data-test-wrapper]').hasText(this.base);
      assert
        .dom('[data-test-wrapper] > strong')
        .exists()
        .hasText(this.highlight);
    }

    await render(hbs`
      <div data-test-wrapper>
        {{highlight this.base this.highlight}}
      </div>`);

    assert.dom('[data-test-wrapper]').hasText(this.base);
    assert.dom('[data-test-wrapper] > strong').doesNotExist();

    this.setProperties({
      base: 'anna',
      highlight: 'n',
    });

    check();

    this.set('highlight', 'a')

    check();

    this.setProperties({
      base: 'qwerty',
      highlight: 'y',
    });

    check();
  });
});
