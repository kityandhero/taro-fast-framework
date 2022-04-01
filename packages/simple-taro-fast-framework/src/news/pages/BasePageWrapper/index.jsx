import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class BasePageWrapper extends PageWrapper {
  verifyTicket = true;

  verifyTicketValidity = true;

  getDispatch = () => {
    const { dispatch } = this.props;

    return dispatch;
  };

  dispatchCheckTicketValidity = (data) => {
    return this.dispatchApi({
      type: 'entrance/checkTicketValidity',
      payload: data,
    });
  };

  dispatchRefreshSession = (data) => {
    return this.dispatchApi({
      type: 'session/refreshSession',
      payload: data,
    });
  };

  dispatchSetSignInProcessDetection = (data) => {
    return this.dispatchApi({
      type: 'global/setCheckSignInProcessing',
      payload: !!data,
    });
  };

  getCheckTicketValidityApiData = () => {
    const {
      entrance: { data },
    } = this.props;

    return data || {};
  };

  getRefreshSessionApiData = () => {
    const {
      session: { data },
    } = this.props;

    return data || {};
  };

  getSignInApiData = () => {
    const {
      entrance: { data },
    } = this.props;

    return data || {};
  };

  getSectionList = () => {
    const { global } = this.props;

    const { sectionList } = {
      ...{
        sectionList: [],
      },
      ...global,
    };

    return isArray(sectionList) ? sectionList : [];
  };
}
