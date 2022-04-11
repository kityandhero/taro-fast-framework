import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class BasePageWrapper extends PageWrapper {
  verifyTicket = false;

  dispatchSignInSilent = (data) => {
    return this.dispatchApi({
      type: 'entrance/signInSilent',
      payload: data,
    });
  };

  getSignInSilentApiData = () => {
    return getApiDataCore({ props: this.props, modelName: 'entrance' });
  };

  parseTokenFromSignInSilentApiData = (remoteData) => {
    const { token } = remoteData;

    return token || '';
  };
}
