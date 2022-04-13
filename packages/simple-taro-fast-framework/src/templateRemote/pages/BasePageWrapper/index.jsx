import PageWrapperRemote from '../../../customComponents/PageWrapperRemote';

export default class BasePageWrapper extends PageWrapperRemote {
  verifySession = false;

  verifyTicket = false;

  verifyTicketValidity = false;

  needReLocationWhenRepeatedShow = false;
}
