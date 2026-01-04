import { AppBase } from 'taro-fast-framework';

import { config } from './app.config.extra';
import { prepareModel } from './modelBuilders';

import './app.less';

prepareModel();

class App extends AppBase {
  constructor(properties) {
    super(properties, config);
  }
}

export default App;
