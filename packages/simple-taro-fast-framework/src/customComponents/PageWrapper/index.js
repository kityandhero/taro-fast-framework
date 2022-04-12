import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';

import PageWrapperCore from '../PageWrapperCore';

export default class PageWrapper extends PageWrapperCore {
  dispatchRefreshSession = (data) => {
    return this.dispatchApi({
      type: 'session/refreshSession',
      payload: data,
    });
  };

  dispatchCheckTicketValidity = (data) => {
    return this.dispatchApi({
      type: 'entrance/checkTicketValidity',
      payload: data,
    });
  };

  getCheckTicketValidityApiData = () => {
    console.log(this.props);

    const data = getApiDataCore({
      props: this.props,
      modelName: 'entrance',
    });

    return data;
  };

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
