import { attachPropertiesToComponent } from 'taro-fast-common/es/utils/tools';

import Grid from './grid';
import Item from './item';

import './index.less';

export default attachPropertiesToComponent(Grid, {
  Item,
});
