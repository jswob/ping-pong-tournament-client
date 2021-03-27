import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import validateModelType from 'ping-pong-tournament-client/validators/model-type';
import Model from '@ember-data/model';

class TestModel extends Model {};

module('Unit | Validator | model-type', function (hooks) {
  setupTest(hooks);

  test('It validates correctly', function (assert) {
    assert.expect(5);

    this.owner.register('model:test-model', TestModel);

    const store = this.owner.lookup('service:store');

    const key = 'testKey';
    const options = { type: 'test-model' };
    const validator = validateModelType(options);
    const expectedErrorMessage = 'TestKey must have correct type';

    const record = store.createRecord(options.type);

    assert.equal(validator(key, null), expectedErrorMessage);
    assert.equal(validator(key, {}), expectedErrorMessage);
    assert.equal(validator(key, { type: 'badType' }), expectedErrorMessage);
    assert.equal(validator(key, { type: options.type }), expectedErrorMessage);
    assert.equal(validator(key, record), true);
  });
});
