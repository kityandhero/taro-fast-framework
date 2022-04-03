import PageWrapper from '../../../customComponents/PageWrapper';

export default class BasePageWrapper extends PageWrapper {
  verifySession = false;

  verifyTicket = false;

  verifyTicketValidity = false;

  needReLocationWhenRepeatedShow = false;
}
