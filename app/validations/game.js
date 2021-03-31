import {
  validateNumber,
  validatePresence,
} from 'ember-changeset-validations/validators';
import validateModelType from 'ping-pong-tournament-client/validators/model-type';
import validateUniqueness from 'ping-pong-tournament-client/validators/uniqueness';

export default {
  player1: [
    validatePresence(true),
    validateModelType({ type: 'player' }),
    validateUniqueness({ on: 'player2' }),
  ],
  player2: [
    validatePresence(true),
    validateModelType({ type: 'player' }),
    validateUniqueness({ on: 'player1' }),
  ],
  sets: validateNumber({ integer: true, gt: 0 }),
  pointsToWin: validateNumber({ integer: true, gt: 0 }),
};
