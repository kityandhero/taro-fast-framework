import { Component } from 'react';
import { Provider } from 'react-redux';

import { getStore } from '../../utils/dvaAssist';

class AppComponent extends Component {
  componentWillMount() {
    this.initDva();

    this.taroGlobalData.appInitCustomLocal = this.establishConfig();
  }

  componentDidMount() {
    //延迟执行, 避免配置未合并完成前调用
    setTimeout(() => {
      this.loadRemoteMetaData();
    }, 200);
  }

  initDva = () => {
    this.store = getStore(this.modelsCollection);
  };

  establishConfig = () => {
    return null;
  };

  loadRemoteMetaData = () => {};

  modelsCollection = null;

  store = null;

  taroGlobalData = {
    test: 'success',
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}

export default AppComponent;
