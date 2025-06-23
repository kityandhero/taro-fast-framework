import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  navigateTo,
  redirectTo,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

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

  goToPageListApplicationUserFeedback = () => {
    navigateTo({
      url: pathCollection.user.pageListApplicationUserFeedback.path,
    });
  };

  redirectToPageListApplicationUserFeedback = () => {
    redirectTo({
      url: pathCollection.user.pageListApplicationUserFeedback.path,
    });
  };

  goToDetailApplicationUserFeedback = (id) => {
    if (checkStringIsNullOrWhiteSpace(id)) {
      showSimpleErrorMessage('跳转页面参数值无效');

      return;
    }

    navigateTo({
      url: `${pathCollection.user.detailApplicationUserFeedback.path}?id=${id}`,
    });
  };

  goToSubmitApplicationUserFeedback = () => {
    navigateTo({
      url: pathCollection.user.submitApplicationUserFeedback.path,
    });
  };
}

export { PageWrapper };
