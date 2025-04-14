import { AppBase, appendConfigure } from 'taro-fast-framework';

import { config } from './app.config.extra';
import { configComplain } from './app.config.extra.complain';
import { prepareModel } from './modelBuilders';

import './app.less';

prepareModel();

class App extends AppBase {
  constructor(properties) {
    super(properties, config);
  }

  doWhenBootstrap = (options) => {
    const { query } = options;

    const { mode } = {
      mode: '',
      ...query,
    };

    if (mode === 'complain') {
      appendConfigure(configComplain);
    }
  };
}

export default App;
