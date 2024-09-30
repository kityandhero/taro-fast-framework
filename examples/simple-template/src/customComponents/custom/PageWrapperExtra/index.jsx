import { navigateTo } from 'easy-soft-utility';

import { pathCollection } from '../../../customConfig';
import { PageWrapperCore } from '../../general/PageWrapperCore';

class PageWrapperExtra extends PageWrapperCore {
  goToResetPassword = () => {
    navigateTo(pathCollection.customer.resetPassword.path);
  };

  goToChangePassword = () => {
    navigateTo(pathCollection.customer.changePassword.path);
  };

  goToEditInformation = () => {
    navigateTo(pathCollection.customer.editInformation.path);
  };

  goToFlowCase = () => {
    navigateTo(pathCollection.root.flowCase.path);
  };
}

export { PageWrapperExtra };
