import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class BasePageWrapper extends PageWrapper {
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
