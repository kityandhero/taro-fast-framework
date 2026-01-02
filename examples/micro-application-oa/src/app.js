import { AppBase, appendConfigure } from 'taro-fast-framework';

import { config } from './app.config.extra';
import { configComplain } from './app.config.extra.complain';
import { prepareModel } from './modelBuilders';
import { judgeComplain } from './utils';

import './app.less';

prepareModel();

class App extends AppBase {
  constructor(properties) {
    super(properties, config);
  }

  doWhenBootstrap = (options) => {
    if (judgeComplain(options)) {
      appendConfigure(configComplain);
    }
  };
}

export default App;
