// import { Provider } from 'react-redux';

// import dva from 'taro-fast-framework/es/utils/dva';
import AppComponent from 'taro-fast-framework/es/customComponents/AppComponent';

import models from './models';

import './app.less';

// const dvaApp = dva.createApp({
//   initialState: {},
//   models: models,
// });

// const store = dvaApp.getStore();

class App extends AppComponent {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  modelsCollection = models;

  // // 在 App 类中的 render() 函数没有实际作用
  // // 请勿修改此函数
  // render() {
  //   return <Provider store={store}>{this.props.children}</Provider>;
  // }
}

export default App;
