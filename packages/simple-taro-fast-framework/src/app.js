import { checkEnvIsDevelopment } from 'taro-fast-common/es/utils/tools';
import { locationModeCollection } from 'taro-fast-common/es/utils/constants';
import { AppBase } from 'taro-fast-framework/es/framework';
import 'taro-fast-common/es/constants.css';
import 'taro-fast-component/es/index.css';
import 'taro-fast-component-extra/es/index.css';
import 'taro-fast-component-prism/es/index.css';

import LogoImage from './assets/images/logo.png';

import models from './models';

import './app.less';

const config = {
  showLogInConsole: checkEnvIsDevelopment(),
  // showRequestInfo: checkEnvIsDevelopment(),
  showUseVirtualRequestMessage: false,
  apiPrefix: {
    corsTargetDomain: 'https://universalitymallapi.panduolakeji.com',
  },
  apiSuccessCode: 200,
  authenticationFailCode: 2001,
  signInPath: '/user/login',
  apiVersion: 'v1',
  useLocation: false,
  initialLocationMode: locationModeCollection.auto,
  footerImage: LogoImage,
  footerText: '中国****科技有限公司',
  footerDescription:
    'Copyright © 2022. All Rights Reserved. 京ICP备 ******** 号-2',
};

class App extends AppBase {
  constructor(props) {
    super(props, config, models);
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}
}

export default App;
