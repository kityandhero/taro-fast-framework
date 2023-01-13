import { Component } from 'react';

import { envCollection } from 'taro-fast-common/es/utils/constants';
import {
  canIUse,
  checkEnv,
  clearLocalStorage,
  getDefaultTaroGlobalData,
  getEnv,
  getUpdateManager,
  isWechat,
  recordConfig,
  recordInfo,
  setTaroGlobalData,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isUndefined } from 'taro-fast-common/es/utils/typeCheck';
import { toString } from 'taro-fast-common/es/utils/typeConvert';

import { defaultSettingsLayoutCustom } from '../../utils/defaultSettingsSpecial';
import { Provider } from '../../utils/dva';
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

function setRootFontSize() {
  const env = getEnv();

  if (env !== envCollection.WEB) {
    return;
  }

  const webRootFontSize = defaultSettingsLayoutCustom.getWebRootFontSize();

  if (stringIsNullOrWhiteSpace(webRootFontSize)) {
    return;
  }

  if (window) {
    var doc = window.document.documentElement;

    if (doc) {
      doc.style.fontSize = toString(webRootFontSize);

      recordInfo(
        `set document font-size -> ${webRootFontSize}, it is in config.`,
      );
    }
  }
}

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
    this.checkUpdateVersion();
  }

  onLaunch(options) {
    checkEnv();

    setRootFontSize();

    setLaunchOption(options);

    this.onBootstrap();

    // 仅限小程序显示启动信息, 常规react生命周期中暂不支持
    this.showStartupInfo();
  }

  setAppInitCustomLocal(config) {
    this.taroGlobalData.appInitCustomLocal = config;

    setTaroGlobalData(config);
  }

  onBootstrap() {
    this.doWhenBootstrap();
  }

  doWhenBootstrap = () => {
    recordConfig(
      'doWhenBootstrap do nothing, if you need do something on application bootstrap, please override it: doWhenBootstrap = () => {} in app.js(jsx/ts/tsx)',
    );
  };

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
                  title: '已经有新版本喽~',
                  content:
                    '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
                });
              });
            }
          });
        }
      } else {
        this.showModal({
          title: '溫馨提示',
          content:
            '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        });
      }
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}

export default AppBase;
