import { Component } from 'react';
import { Provider } from 'react-redux';

import { getStore } from '../../utils/dvaAssist';

class AppComponent extends Component {
  componentWillMount() {
    this.store = getStore(this.modelsCollection);
  }

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
