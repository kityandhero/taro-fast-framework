import { navigateTo } from 'easy-soft-utility';

import { getLaunchOption } from 'taro-fast-framework';

import { pathCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { judgeComplain } from '../../../utils';
import { PageWrapperCore } from '../../general/PageWrapperCore';

class PageWrapperExtra extends PageWrapperCore {
  getGetCurrentOperatorApiEffect = (data = {}) => {
    const o = getLaunchOption();
    const result = judgeComplain(o);

    return {
      type: result
        ? modelTypeCollection.customerTypeCollection.getCurrentInfo
        : modelTypeCollection.userTypeCollection.getCurrentInfo,
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
}

export { PageWrapperExtra };
