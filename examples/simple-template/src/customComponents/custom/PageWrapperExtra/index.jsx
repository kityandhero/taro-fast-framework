import { navigateTo } from 'easy-soft-utility';

import { pathCollection } from '../../../customConfig';
import { PageWrapperCore } from '../../general/PageWrapperCore';

class PageWrapperExtra extends PageWrapperCore {
  goToResetPassword = () => {
    navigateTo(pathCollection.customer.resetPassword);
  };
}

export { PageWrapperExtra };
