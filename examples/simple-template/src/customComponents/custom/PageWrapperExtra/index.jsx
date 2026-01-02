import { navigateTo } from 'easy-soft-utility';

import { pathCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { PageWrapperCore } from '../../general/PageWrapperCore';

class PageWrapperExtra extends PageWrapperCore {
  getGetCurrentOperatorApiEffect = (data = {}) => {
    return {
      type: modelTypeCollection.userTypeCollection.getCurrentInfo,
      payload: data,
    };
  };

  goToResetPassword = () => {
    navigateTo({
      url: pathCollection.user.resetPassword.path,
    });
  };

  goToChangePassword = () => {
    navigateTo({
      url: pathCollection.user.changePassword.path,
    });
  };

  goToEditInformation = () => {
    navigateTo({
      url: pathCollection.user.editInformation.path,
    });
  };

  goToSecurity = () => {
    navigateTo({
      url: pathCollection.user.security.path,
    });
  };

  goToSetting = () => {
    navigateTo({
      url: pathCollection.user.setting.path,
    });
  };
}

export { PageWrapperExtra };
