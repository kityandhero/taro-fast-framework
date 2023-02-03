import { PageWrapperRemote } from '../../../customComponents';

export default class BasePageWrapper extends PageWrapperRemote {
  verifySession = false;

  verifyTicket = false;

  verifyTicketValidity = false;

  needReLocationWhenRepeatedShow = false;
}
