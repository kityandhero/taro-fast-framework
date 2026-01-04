import { navigateTo } from 'easy-soft-utility';

import { pathCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { PageWrapperCore } from '../../general/PageWrapperCore';

class PageWrapperExtra extends PageWrapperCore {
  getGetCurrentOperatorApiEffect = (data = {}) => {
    return {
      type: modelTypeCollection.maintainerTypeCollection.getCurrentInfo,
      payload: data,
    };
  };

  goToResetPassword = () => {
    navigateTo({
      url: pathCollection.maintainer.resetPassword.path,
    });
  };

  goToChangePassword = () => {
    navigateTo({
      url: pathCollection.maintainer.changePassword.path,
    });
  };

  goToEditInformation = () => {
    navigateTo({
      url: pathCollection.maintainer.editInformation.path,
    });
  };

  goToSecurity = () => {
    navigateTo({
      url: pathCollection.maintainer.security.path,
    });
  };
}

export { PageWrapperExtra };
