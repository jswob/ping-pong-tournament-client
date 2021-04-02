import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import validateUniqueness from 'ping-pong-tournament-client/validators/uniqueness';
import Model from '@ember-data/model';

class TestModel extends Model {}

module('Unit | Validator | uniqueness', function (hooks) {
  setupTest(hooks);

  test('It validates correctly ', function (assert) {
    assert.expect(2);

    this.owner.register('model:test-model', TestModel);

    const store = this.owner.lookup('service:store');

    const testData = {
      test1: store.createRecord('test-model', { id: 1 }),
      test2: store.createRecord('test-model', { id: 2 }),
    };

    const key = 'test1';
    const options = { on: 'test2' };
    const validator = validateUniqueness(options);
    const expectedErrorMessage = `Test1 can't be the same as Test2`;

    assert.equal(
      validator(key, testData.test1, null, { test2: testData.test1 }),
      expectedErrorMessage,
      'If records have the same id, returns error'
    );
    assert.equal(
      validator(key, testData.test1, null, { test2: testData.test2 }),
      true,
      'If records have different id, return true'
    );
  });
});
