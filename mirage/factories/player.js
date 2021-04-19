import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  nickname: () => {
    const { firstName, lastName } = faker.name;

    return firstName() + ' ' + lastName();
  },
});
