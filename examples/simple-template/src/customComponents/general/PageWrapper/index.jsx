import { isFunction, navigateTo } from 'easy-soft-utility';

import { switchTab } from 'taro-fast-common';

import { pathCollection } from '../../../customConfig';
import { PageWrapperExtra } from '../../custom/PageWrapperExtra';

class PageWrapper extends PageWrapperExtra {
  goToHomeTab(callback = null) {
    switchTab({
      url: `${pathCollection.root.home.path}`,
      success: () => {
        if (isFunction(callback)) {
          callback();
        }
      },
    });
  }

  goToSignIn = () => {
    navigateTo({
      url: pathCollection.customer.signIn.path,
    });
  };

  goToApprove = (id) => {
    navigateTo(`${pathCollection.customer.approve.path}?id=${id}`);
  };

  goToPageListCreateApprove = () => {
    navigateTo({
      url: pathCollection.customer.pageListCreateApprove.path,
    });
  };

  goToPageListLatestApprove = () => {
    navigateTo({
      url: pathCollection.customer.pageListLatestApprove.path,
    });
  };

  goToPageListWaitApprove = () => {
    navigateTo({
      url: pathCollection.customer.pageListWaitApprove.path,
    });
  };
}

export { PageWrapper };
