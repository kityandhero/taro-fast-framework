// import { checkEnvIsDevelopment } from 'taro-fast-common/es/utils/tools';
import { AppBase } from 'taro-fast-framework/es/framework';
import 'taro-fast-component/es/index.css';

import models from './models';

import './app.less';

class App extends AppBase {
  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  modelsCollection = models;

  establishConfig = () => {
    return {
      // showLogInConsole: checkEnvIsDevelopment(),
      showLogInConsole: true,
      // showRequestInfo: checkEnvIsDevelopment(),
      showRequestInfo: true,
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
