import { setupServer } from 'msw/node';
import { memberHandlers } from './handlers/member';
import { membershipHandlers } from './handlers/membership';
import { checkInHandlers } from './handlers/checkin';

export const server = setupServer(...memberHandlers, ...membershipHandlers, ...checkInHandlers);
