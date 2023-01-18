import { getStore, Provider } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  envCollection,
  flushLocalStorage,
  isUndefined,
  logConfig,
  logInfo,
  toString,
} from 'easy-soft-utility';
import { Component } from 'react';

import {
  canIUse,
  checkEnv,
  getDefaultTaroGlobalData,
  getEnv,
  getUpdateManager,
  isWechat,
  setTaroGlobalData,
} from 'taro-fast-common/es/utils/tools';

import { getModelCollection } from '../../models';
import { configEnvironment } from '../../utils/configAssist';
import { defaultSettingsLayoutCustom } from '../../utils/defaultSettingsSpecial';
import {
  removeAdministrativeDivisionFullData,
  removeSelectedAddressData,
  removeSessionRefreshing,
  setLaunchOption,
} from '../../utils/globalStorageAssist';

const defaultTaroGlobalData = getDefaultTaroGlobalData();

let appInitCustomObject = {};

function setMainFontSize() {
  const env = getEnv();

  if (env !== envCollection.WEB) {
    return;
  }

  const webRootFontSize = defaultSettingsLayoutCustom.getWebRootFontSize();

  if (checkStringIsNullOrWhiteSpace(webRootFontSize)) {
    return;
  }

  if (window) {
    var doc = window.document.documentElement;

    if (doc) {
      doc.style.fontSize = toString(webRootFontSize);

      logInfo(`set document font-size -> ${webRootFontSize}, it is in config.`);
    }
  }
}

let models = [];
let initApplicationComplete = false;

class AppBase extends Component {
  store = null;

  taroGlobalData = defaultTaroGlobalData;

  constructor(props, config) {
    super(props);

    if (!initApplicationComplete) {
      this.setAppInitCustomLocal(config);

      configEnvironment();

      models = getModelCollection();

      appInitCustomObject = config;

      removeSessionRefreshing();
      removeSelectedAddressData();
      removeAdministrativeDivisionFullData();

      this.initDva(models);

      this.initLocationMode();
    }

    initApplicationComplete = true;

    logInfo('application start complete');
  }

  componentDidMount() {
    this.checkUpdateVersion();
  }

  onLaunch(options) {
    checkEnv();

    setMainFontSize();

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
    logConfig(
      'doWhenBootstrap do nothing, if you need do something on application bootstrap, please override it: doWhenBootstrap = () => {} in app.js(jsx/ts/tsx)',
    );
  };

  initDva = () => {
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
                flushLocalStorage;

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
