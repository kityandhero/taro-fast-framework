import AuthorizationWrapper from 'taro-fast-framework/es/framework/AuthorizationWrapper';

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
}
