import AppComponent from "taro-fast-framework/es/customComponents/AppComponent";

import { getTaroGlobalData } from "taro-fast-framework/es/utils/tools";

import "./app.less";

class App extends AppComponent {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    const a = getTaroGlobalData();

    if (a) {
      a.pp = 2;
    }

    return this.props.children;
  }
}

export default App;
