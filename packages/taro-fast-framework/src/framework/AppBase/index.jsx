import { Component } from 'react';
import { Provider } from 'react-redux';

import {
  getAppInitConfigData,
  recordObject,
  getDefaultTaroGlobalData,
  setTaroGlobalData,
} from 'taro-fast-common/es/utils/tools';
import { isUndefined } from 'taro-fast-common/es/utils/typeCheck';

import { getStore } from '../../utils/dvaAssist';
import { defaultSettingsLayoutCustom } from '../../utils/defaultSettingsSpecial';

const defaultTaroGlobalData = getDefaultTaroGlobalData();

let modelNameList = [];

let appInitCustomObject = {};

class AppBase extends Component {
  store = null;

  taroGlobalData = defaultTaroGlobalData;

  constructor(props, config, models) {
    super(props);

    appInitCustomObject = config;

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

    //延迟执行, 避免配置未合并完成前调用
    setTimeout(() => {
      this.loadRemoteMetaData();
    }, 200);
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

  loadRemoteMetaData = () => {};

  showStartupInfo = () => {
    const showLogInConsole = defaultSettingsLayoutCustom.getShowLogInConsole();

    if (showLogInConsole) {
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
