import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  nickname: (i) => `player${i + 1}`,
});
