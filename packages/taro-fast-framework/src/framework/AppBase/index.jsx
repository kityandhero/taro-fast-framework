import { Component } from 'react';
import { Provider } from 'react-redux';
import { removeSessionRefreshing } from 'src/utils/globalStorageAssist';

import {
  getAppInitConfigData,
  recordObject,
  getDefaultTaroGlobalData,
  setTaroGlobalData,
  canIUse,
  clearLocalStorage,
  getUpdateManager,
} from 'taro-fast-common/es/utils/tools';
import { isUndefined } from 'taro-fast-common/es/utils/typeCheck';

import { getStore } from '../../utils/dvaAssist';

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
    if (canIUse('getUpdateManager')) {
      const updateManager = getUpdateManager();

      const that = this;

      updateManager.onCheckForUpdate((data) => {
        if (data.hasUpdate) {
          updateManager.onUpdateReady(() => {
            clearLocalStorage;

            updateManager.applyUpdate();
          });
          updateManager.onUpdateFailed(() => {
            that.showModal({
              title: '已经有新版本喽~',
              content:
                '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
            });
          });
        }
      });
    } else {
      this.showModal({
        title: '溫馨提示',
        content:
          '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
      });
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    this.showStartupInfo();

    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}

export default AppBase;
