import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | players-manager', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('switchModeHandler correctly switches queryParam', function (assert) {
    assert.expect(2);
    let controller = this.owner.lookup('controller:players-manager');

    assert.equal(
      controller.createMode,
      false,
      'Initialy createMode is disabled'
    );

    console.log(controller.switchModeHandler);

    controller.switchCreateModeHandler();

    assert.equal(
      controller.createMode,
      true,
      'After invoking switchCreateModeHandler action createMode is enabled'
    );
  });
});
