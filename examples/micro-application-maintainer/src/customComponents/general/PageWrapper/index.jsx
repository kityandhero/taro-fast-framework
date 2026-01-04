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

  goToUserTab(callback = null) {
    switchTab({
      url: `${pathCollection.root.maintainer.path}`,
      success: () => {
        if (isFunction(callback)) {
          callback();
        }
      },
    });
  }

  goToSignIn = () => {
    navigateTo({
      url: pathCollection.maintainer.signIn.path,
    });
  };

  goToPageListApplicationUserFeedback = () => {
    navigateTo({
      url: pathCollection.maintainer.pageListApplicationUserFeedback.path,
    });
  };

  redirectToPageListApplicationUserFeedback = () => {
    redirectTo({
      url: pathCollection.maintainer.pageListApplicationUserFeedback.path,
    });
  };

  goToDetailApplicationUserFeedback = (id) => {
    if (checkStringIsNullOrWhiteSpace(id)) {
      showSimpleErrorMessage('跳转页面参数值无效');

      return;
    }

    navigateTo({
      url: `${pathCollection.maintainer.detailApplicationUserFeedback.path}?id=${id}`,
    });
  };

  goToSubmitApplicationUserFeedback = () => {
    navigateTo({
      url: pathCollection.maintainer.submitApplicationUserFeedback.path,
    });
  };
}

export { PageWrapper };
