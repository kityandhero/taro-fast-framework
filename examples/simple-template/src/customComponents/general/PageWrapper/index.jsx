import { isFunction, navigateTo } from 'easy-soft-utility';

import { switchTab } from 'taro-fast-common';
import { getVerifySignInResult } from 'taro-fast-framework';

import { pathCollection } from '../../../customConfig';
import { PageWrapperExtra } from '../../custom/PageWrapperExtra';

class PageWrapper extends PageWrapperExtra {
  checkSignInSuccess = () => {
    const verifySignInResult = getVerifySignInResult();
    const v = this.getSignInResult();

    return v === verifySignInResult.success;
  };

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
}

export { PageWrapper };
