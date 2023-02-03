import { PageWrapperSimulation } from '../../../customComponents';

class BasePageWrapper extends PageWrapperSimulation {
  verifySession = false;

  verifyTicket = false;

  verifyTicketValidity = false;

  needReLocationWhenRepeatedShow = false;
}

export { BasePageWrapper };
