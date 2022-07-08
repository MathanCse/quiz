import { module, test } from 'qunit';
import { setupTest } from 'quiz/tests/helpers';

module('Unit | Controller | question', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:question');
    assert.ok(controller);
  });
});
