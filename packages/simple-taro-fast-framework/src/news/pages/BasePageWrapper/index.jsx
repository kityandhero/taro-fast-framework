import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class BasePageWrapper extends PageWrapper {
  verifyTicket = true;

  verifyTicketValidity = true;

  getDispatch = () => {
    const { dispatch } = this.props;

    return dispatch;
  };

  dispatchRefreshSession = (data) => {
    const dispatch = this.getDispatch();

    return dispatch({
      type: 'session/refreshSession',
      payload: data,
    });
  };

  dispatchCheckTicketValidity = (data) => {
    const dispatch = this.getDispatch();

    return dispatch({
      type: 'entrance/checkTicketValidity',
      payload: data,
    });
  };

  getCheckTicketValidityApiData = () => {
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
