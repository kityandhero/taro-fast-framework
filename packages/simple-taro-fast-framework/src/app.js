import AppComponent from 'taro-fast-framework/es/customComponents/AppComponent';

import models from './models';

import './app.less';

class App extends AppComponent {
  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  modelsCollection = models;

  establishConfig = () => {
    return {
      showLogInConsole: true,
      showRequestInfo: true,
      useVirtualRequest: false,
      showUseVirtualRequestMessage: false,
      apiPrefix: {
        corsTargetDomain: 'https://universalitymallapi.panduolakeji.com',
      },
      apiSuccessCode: 200,
      authenticationFailCode: 2001,
      loginPath: '/user/login',
      apiVersion: 'v1',
    };
  };

  loadRemoteMetaData = () => {
    const { dispatch } = this.store;

    dispatch({
      type: 'global/getMetaData',
      payload: { force: true },
    });
  };
}

export default App;
