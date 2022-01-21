import { Component } from 'react';
import { Provider } from 'react-redux';

import {
  getAppInitConfigData,
  recordObject,
  getDefaultTaroGlobalData,
} from 'taro-fast-common/es/utils/tools';

import { getStore } from '../../utils/dvaAssist';

const defaultTaroGlobalData = getDefaultTaroGlobalData();

class AppComponent extends Component {
  store = null;

  taroGlobalData = defaultTaroGlobalData;

  constructor(props, config, models) {
    super(props);

    this.taroGlobalData.appInitCustomLocal = config;

    this.initDva(models);

    console.log(this.store);
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

  getModelsCollection() {
    return this.modelsCollection;
  }

  initDva = (models) => {
    this.store = getStore(models);
  };

  loadRemoteMetaData = () => {};

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}

export default AppComponent;
