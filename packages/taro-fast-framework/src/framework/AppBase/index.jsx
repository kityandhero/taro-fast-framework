import { Component } from 'react';
import { Provider } from 'react-redux';

import {
  canIUse,
  clearLocalStorage,
  getAppInitConfigData,
  getDefaultTaroGlobalData,
  getUpdateManager,
  isWechat,
  recordObject,
  setTaroGlobalData,
} from 'taro-fast-common/es/utils/tools';
import { isUndefined } from 'taro-fast-common/es/utils/typeCheck';

import { getStore } from '../../utils/dvaAssist';
import {
  removeAdministrativeDivisionFullData,
  removeSelectedAddressData,
  removeSessionRefreshing,
  setLaunchOption,
} from '../../utils/globalStorageAssist';

const defaultTaroGlobalData = getDefaultTaroGlobalData();

let modelNameList = [];

let appInitCustomObject = {};

class AppBase extends Component {
  store = null;

  taroGlobalData = defaultTaroGlobalData;

  constructor(props, config, models) {
    super(props);

    appInitCustomObject = config;

    removeSessionRefreshing();
    removeSelectedAddressData();
    removeAdministrativeDivisionFullData();

    this.setAppInitCustomLocal(config);

    modelNameList = models.map((item) => {
      const { namespace: ns } = item;

      return ns;
    });

    this.initDva(models);

    this.initLocationMode();
  }

  componentDidMount() {
    recordObject({
      appInitConfig: getAppInitConfigData(),
    });

    this.checkUpdateVersion();
  }

  onLaunch(options) {
    setLaunchOption(options);
  }

  setAppInitCustomLocal(config) {
    this.taroGlobalData.appInitCustomLocal = config;

    setTaroGlobalData(config);
  }

  initDva = (models) => {
    this.store = getStore(models);
  };

  initLocationMode = () => {
    const { initialLocationMode } = appInitCustomObject;

    if (!isUndefined(initialLocationMode)) {
      const { dispatch } = this.store;

      dispatch({
        type: 'schedulingControl/initialLocationMode',
        payload: {
          initialLocationMode,
        },
      });
    }
  };

  showStartupInfo = () => {
    const { dispatch } = this.store;

    dispatch({
      type: 'schedulingControl/showAppInitCustom',
      payload: {
        config: appInitCustomObject,
      },
    });

    dispatch({
      type: 'schedulingControl/showModelNameList',
      payload: {
        modelNameList: modelNameList.join(),
      },
    });
  };

  checkUpdateVersion = () => {
    if (isWechat) {
      if (canIUse('getUpdateManager')) {
        const updateManager = getUpdateManager();

        if (updateManager) {
          const that = this;

          updateManager.onCheckForUpdate((data) => {
            if (data.hasUpdate) {
              updateManager.onUpdateReady(() => {
                clearLocalStorage;

                updateManager.applyUpdate();
              });
              updateManager.onUpdateFailed(() => {
                that.showModal({
                  title: '?????????????????????~',
                  content:
                    '??????????????????????????????????????? ?????????-???????????? ???????????????????????????~',
                });
              });
            }
          });
        }
      } else {
        this.showModal({
          title: '????????????',
          content:
            '?????????????????????????????????????????????????????????????????????????????????????????????',
        });
      }
    }
  };

  // ??? App ????????? render() ????????????????????????
  // ?????????????????????
  render() {
    this.showStartupInfo();

    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}

export default AppBase;
