import { PageWrapperRemote } from '../../../customComponents';

class BasePageWrapper extends PageWrapperRemote {
  verifySession = false;

  verifyTicket = false;

  verifyTicketValidity = false;

  needReLocationWhenRepeatedShow = false;
}

export { BasePageWrapper };
