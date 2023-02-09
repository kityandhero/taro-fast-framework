import { locationModeCollection } from 'taro-fast-common';
import { AppBase } from 'taro-fast-framework';

import LogoImage from './assets/images/logo.png';
import { prepareModel } from './models';

import './app.less';

const config = {
  webRootFontSize: '152%',
  appId: 'pdbwl0roqjy03k',
  // showRequestInfo: checkWhetherDevelopmentEnvironment(),
  promptSimulation: false,
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
    latitude: '34.74821',
    longitude: '113.61332',
    speed: -1,
    accuracy: 65,
    altitude: 0,
    verticalAccuracy: 65,
    horizontalAccuracy: 65,
    dataVersion: '917923',
  },
};

prepareModel();

class App extends AppBase {
  constructor(properties) {
    super(properties, config);
  }
}

export default App;
