import { Component } from 'react';

import { ApplicationProvider, getDispatch } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  environmentCollection,
  flushLocalStorage,
  isUndefined,
  logConfig,
  logInfo,
  toString,
} from 'easy-soft-utility';

import {
  canIUse,
  checkEnvironment,
  checkWeAppEnvironment,
  getDefaultTaroGlobalData,
  getEnvironment,
  getUpdateManager,
  getWebRootFontSize,
  setTaroGlobalData,
} from 'taro-fast-common';

import { appendEmbedModelBuilder } from '../../modelBuilders';
import { removeAdministrativeDivisionFullDataCache } from '../../utils/administrativeDivisionFullDataCacheAssist';
import { configEnvironment } from '../../utils/configAssist';
import { setLaunchOption } from '../../utils/launchOptionAssist';
import { removeSelectedAddressData } from '../../utils/selectedAddressDataAssist';
import { removeSessionRefreshing } from '../../utils/sessionRefreshingAssist';

const defaultTaroGlobalData = getDefaultTaroGlobalData();

let appInitCustomObject = {};

function setMainFontSize() {
  const environment = getEnvironment();

  if (environment !== environmentCollection.WEB) {
    return;
  }

  const webRootFontSize = getWebRootFontSize();

  if (checkStringIsNullOrWhiteSpace(webRootFontSize)) {
    return;
  }

  if (window && window.document.documentElement) {
    window.document.documentElement.style.fontSize = toString(webRootFontSize);

    logInfo(`set document font-size -> ${webRootFontSize}, it is in config.`);
  }
}

appendEmbedModelBuilder();

let initApplicationComplete = false;

class AppBase extends Component {
  store = null;

  taroGlobalData = defaultTaroGlobalData;

  constructor(properties, config) {
    super(properties);

    if (!initApplicationComplete) {
      this.setAppInitCustomLocal(config);

      configEnvironment(config);

      appInitCustomObject = config;

      removeSessionRefreshing();
      removeSelectedAddressData();
      removeAdministrativeDivisionFullDataCache();

      this.initLocationMode();
    }

    initApplicationComplete = true;

    logInfo('application start complete');
  }

  componentDidMount() {
    this.checkUpdateVersion();
  }

  onLaunch(options) {
    checkEnvironment();

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

  initLocationMode = () => {
    const { initialLocationMode } = appInitCustomObject;

    if (!isUndefined(initialLocationMode)) {
      const dispatch = getDispatch();

      dispatch({
        type: 'schedulingControl/initialLocationMode',
        payload: {
          initialLocationMode,
        },
      });
    }
  };

  showStartupInfo = () => {};

  checkUpdateVersion = () => {
    if (checkWeAppEnvironment()) {
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
    return <ApplicationProvider>{this.props.children}</ApplicationProvider>;
  }
}

export { AppBase };
