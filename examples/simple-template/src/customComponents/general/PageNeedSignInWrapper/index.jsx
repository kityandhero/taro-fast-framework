import { navigateTo } from 'easy-soft-utility';

import { pathCollection } from '../../../customConfig';
import { PageWrapper } from '../PageWrapper';

class PageNeedSignInWrapper extends PageWrapper {
  needSignIn = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      currentCustomer: null,
    };
  }

  doWorkAdjustDidMount = () => {
    this.buildCustomerData();
  };

  buildCustomerData = () => {
    const { currentCustomer } = this.state;

    if ((currentCustomer || null) == null) {
      const signInSuccess = this.checkSignInSuccess();

      if (signInSuccess) {
        const that = this;

        that.getCustomer({
          successCallback: (data) => {
            that.setState({
              currentCustomer: data,
            });
          },
        });
      }
    }
  };

  refreshCustomerData = (force = false) => {
    const signInSuccess = this.checkSignInSuccess();

    if (signInSuccess) {
      const that = this;

      that.getCustomer({
        force,
        successCallback: (data) => {
          that.setState({
            currentCustomer: data,
          });
        },
      });
    }
  };

  goToSetAvatar = () => {
    navigateTo({
      url: pathCollection.customer.setAvatar.path,
    });
  };

  goToSetBirthday = () => {
    navigateTo({
      url: pathCollection.customer.setBirthday.path,
    });
  };

  goToSetAddress = () => {
    navigateTo({
      url: pathCollection.customer.setAddress.path,
    });
  };
}

export { PageNeedSignInWrapper };
