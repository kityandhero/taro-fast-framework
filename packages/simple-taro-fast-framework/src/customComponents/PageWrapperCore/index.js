import { recordObject } from 'taro-fast-common/es/utils/tools';
import { AuthorizationWrapper } from 'taro-fast-framework/es/framework';
// import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';

import { getQQMapWX } from '../../utils/tools';

export default class PageWrapper extends AuthorizationWrapper {
  loadRemoteRequestDelay = 100;

  useFadeSpinWrapper = true;

  useSimulationFadeSpin = true;

  simulationFadeSpinDuration = 800;

  hideFadeSpinWrapperAfterLoadRemoteRequest = false;

  showRenderCountInConsole = false;

  viewStyle = {
    backgroundColor: '#fff',
  };

  // loadRemoteRequestAfterMount = false;

  getGlobal = () => {
    const { global } = this.props;

    return global;
  };

  // dispatchCheckTicketValidity = (data) => {
  //   return this.dispatchApi({
  //     type: 'entrance/checkTicketValidity',
  //     payload: data,
  //   });
  // };

  // dispatchRefreshSession = (data) => {
  //   return this.dispatchApi({
  //     type: 'session/refreshSession',
  //     payload: data,
  //   });
  // };

  // dispatchSignIn = (data) => {
  //   return this.dispatchApi({
  //     type: 'entrance/signIn',
  //     payload: data,
  //   });
  // };

  // dispatchSignInSilent = (data) => {
  //   return this.dispatchApi({
  //     type: 'entrance/signInSilent',
  //     payload: data,
  //   });
  // };

  // getCheckTicketValidityApiData = () => {
  //   console.log(this.props);

  //   const data = getApiDataCore({
  //     props: this.props,
  //     modelName: 'entrance',
  //   });

  //   return data;
  // };

  // getRefreshSessionApiData = () => {
  //   const data = getApiDataCore({
  //     props: this.props,
  //     modelName: 'session',
  //   });

  //   return data;
  // };

  // getSignInApiData = () => {
  //   const data = getApiDataCore({
  //     props: this.props,
  //     modelName: 'entrance',
  //   });

  //   return data;
  // };

  // getSignInSilentApiData = () => {
  //   const data = getApiDataCore({
  //     props: this.props,
  //     modelName: 'entrance',
  //   });

  //   return data;
  // };

  getRemoteMetaData = () => {
    const global = this.getGlobalWrapper();

    return global;
  };

  parseSignInResultFromRemoteApiData = (remoteData) => {
    const { signInResult } = remoteData;

    return signInResult;
  };

  parseTokenFromSignInApiData = (remoteData) => {
    const { token } = remoteData;

    return token || '';
  };

  reloadRemoteMetaData = () => {
    this.dispatchApi({
      type: 'global/getMetaData',
      payload: { force: true },
    });
  };

  /**
   * 登录校验失败时候的回调, 例如访问需要登录才能调用的接口
   * @returns
   */
  authorizeFailCallback = (remoteData) => {
    recordObject(remoteData);
  };

  reverseGeocoder = ({ location, success, fail }) => {
    const map = getQQMapWX();

    map.reverseGeocoder({
      location,
      success,
      fail,
    });
  };
}
