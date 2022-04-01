import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

import { pathCollection } from '../../../customConfig/config';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class BasePageWrapper extends PageWrapper {
  verifySession = true;

  verifyTicket = true;

  verifyTicketValidity = true;

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

  goToHomeTab(callback = null) {
    this.switchTab({
      url: `/${pathCollection.news.home.path}`,
      success: () => {
        if (isFunction(callback)) {
          callback();
        }
      },
    });
  }
}
