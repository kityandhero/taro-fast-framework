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
      url: pathCollection.user.signIn.path,
    });
  };
}

export { PageWrapper };
