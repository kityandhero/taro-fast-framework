import { recordObject } from 'taro-fast-common/es/utils/tools';
import { AuthorizationWrapper } from 'taro-fast-framework/es/framework';

export default class PageWrapper extends AuthorizationWrapper {
  reloadRemoteMetaData = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/getMetaData',
      payload: { force: true },
    });
  };

  getRemoteMetaData = () => {
    const { global } = this.props;
    return global;
  };

  /**
   * 登录校验失败时候的回调, 例如访问需要登录才能调用的接口
   * @returns
   */
  authorizeFailCallback = (remoteData) => {
    recordObject(remoteData);
  };
}
