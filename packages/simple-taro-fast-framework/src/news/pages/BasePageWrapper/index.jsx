import { isArray, isFunction } from 'easy-soft-utility';

import { pathCollection } from '../../../customConfig';
import BasePageWrapperCore from '../BasePageWrapperCore';

export default class BasePageWrapper extends BasePageWrapperCore {
  // verifySession = true;

  // verifyTicketValidity = true;

  needReLocationWhenRepeatedShow = true;

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
