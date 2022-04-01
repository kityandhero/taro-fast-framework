import { recordObject } from 'taro-fast-common/es/utils/tools';
import { AuthorizationWrapper } from 'taro-fast-framework/es/framework';

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

  dispatchSetSignInProcessDetection = (data) => {
    return this.dispatchApi({
      type: 'entrance/setSignInProcessDetection',
      payload: !!data,
    });
  };

  getCheckTicketValidityApiData = () => {
    const {
      entrance: { data },
    } = this.props;

    return data || {};
  };

  getRefreshSessionApiData = () => {
    const {
      session: { data },
    } = this.props;

    return data || {};
  };

  getSignInApiData = () => {
    const {
      entrance: { data },
    } = this.props;

    return data || {};
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
