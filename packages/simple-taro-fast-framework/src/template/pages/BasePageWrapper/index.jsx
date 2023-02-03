import { PageWrapperSimulation } from '../../../customComponents/PageWrapperSimulation';

export default class BasePageWrapper extends PageWrapperSimulation {
  verifySession = false;

  verifyTicket = false;

  verifyTicketValidity = false;

  needReLocationWhenRepeatedShow = false;
}
