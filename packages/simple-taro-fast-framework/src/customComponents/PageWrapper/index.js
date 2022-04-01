import { recordObject } from 'taro-fast-common/es/utils/tools';
import { AuthorizationWrapper } from 'taro-fast-framework/es/framework';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';

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

  getDispatch = () => {
    const { dispatch } = this.props;

    return dispatch;
  };

  dispatchCheckTicketValidity = (data) => {
    return this.dispatchApi({
      type: 'entrance/checkTicketValidity',
      payload: data,
    });
  };

  dispatchRefreshSession = (data) => {
    return this.dispatchApi({
      type: 'session/refreshSession',
      payload: data,
    });
  };

  dispatchSingIn = (data) => {
    return this.dispatchApi({
      type: 'entrance/signIn',
      payload: data,
    });
  };

  getCheckTicketValidityApiData = () => {
    return getApiDataCore({ props: this.props, modelName: 'entrance' });
  };

  getRefreshSessionApiData = () => {
    return getApiDataCore({ props: this.props, modelName: 'session' });
  };

  getSignInApiData = () => {
    return getApiDataCore({ props: this.props, modelName: 'entrance' });
  };

  getRemoteMetaData = () => {
    const global = this.getGlobalWrapper();

    return global;
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
}
