import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | players-manager', function (hooks) {
  setupTest(hooks);

  test('switchMode correctly switches queryParam', function (assert) {
    assert.expect(2);
    let controller = this.owner.lookup('controller:players-manager');

    assert.equal(
      controller.createMode,
      false,
      'Initialy createMode is disabled'
    );

    controller.switchCreateMode();

    assert.equal(
      controller.createMode,
      true,
      'After invoking switchCreateMode action createMode is enabled'
    );
  });
});
