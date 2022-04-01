import { Component } from 'react';
import { Provider } from 'react-redux';

import {
  getAppInitConfigData,
  recordObject,
  getDefaultTaroGlobalData,
  setTaroGlobalData,
  recordLog,
} from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';

import { getStore } from '../../utils/dvaAssist';
import modelCollection from '../../models/index';

const defaultTaroGlobalData = getDefaultTaroGlobalData();

let modelNameList = [];

class AppBase extends Component {
  store = null;

  taroGlobalData = defaultTaroGlobalData;

  constructor(props, config, models) {
    super(props);

    this.setAppInitCustomLocal(config);

    modelNameList = [
      ...(isArray(models) ? models : [models]),
      ...modelCollection,
    ].map((item) => {
      const { namespace: ns } = item;

      return ns;
    });

    this.initDva(models);
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

  loadRemoteMetaData = () => {};

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    recordLog(`modelNameList: ${modelNameList.join()}`);

    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}

export default AppBase;
