import { validateNumber } from 'ember-changeset-validations/validators';
import validateModelType from '../validators/model-type';

export default {
  player1: validateModelType({ type: 'player' }),
  player2: validateModelType({ type: 'player' }),
  sets: validateNumber({ integer: true, gt: 0 }),
  pointsToWin: validateNumber({ integer: true, gt: 0 }),
};
