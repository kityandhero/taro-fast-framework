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
  appId: 'pdbkzlnf00wu0w',
  showLogInConsole: checkEnvIsDevelopment(),
  // showRequestInfo: checkEnvIsDevelopment(),
  showUseVirtualRequestMessage: false,
  apiPrefix: {
    corsTargetDomain: 'https://universalitymallapi.1010101.cc',
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
  simulationLocation: true,
  simulationLocationData: {
    latitude: 34.74821,
    longitude: 113.61332,
    speed: -1,
    accuracy: 65,
    altitude: 0,
    verticalAccuracy: 65,
    horizontalAccuracy: 65,
    dataVersion: 917923,
  },
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
