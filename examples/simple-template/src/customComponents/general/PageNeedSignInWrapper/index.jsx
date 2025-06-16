import { navigateTo } from 'easy-soft-utility';

import { emptyLogic } from 'taro-fast-common';

import { pathCollection } from '../../../customConfig';
import { PageWrapper } from '../PageWrapper';

const primaryCallName = 'customComponents::general::PageNeedSignInWrapper';

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

  // eslint-disable-next-line no-unused-vars
  buildExtraStateDataWhenCustomerUpdate = (o) => {
    this.logEmptyCallTrack(
      o,
      primaryCallName,
      'buildExtraStateDataWhenCustomerUpdate',
      emptyLogic,
    );
  };

  buildCustomerData = () => {
    const { currentCustomer } = this.state;

    if ((currentCustomer || null) == null) {
      const signInSuccess = this.checkSignInSuccess();

      if (signInSuccess) {
        const that = this;

        that.getCustomer({
          successCallback: (data) => {
            that.logFunctionCallTrace(
              data,
              primaryCallName,
              'buildCustomerData',
              'successCallback',
              'buildExtraStateDataWhenCustomerUpdate',
            );

            const o = that.buildExtraStateDataWhenCustomerUpdate(data);

            that.setState({
              ...o,
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
      url: pathCollection.user.setAvatar.path,
    });
  };

  goToSetBirthday = () => {
    navigateTo({
      url: pathCollection.user.setBirthday.path,
    });
  };

  goToSetAddress = () => {
    navigateTo({
      url: pathCollection.user.setAddress.path,
    });
  };
}

export { PageNeedSignInWrapper };
