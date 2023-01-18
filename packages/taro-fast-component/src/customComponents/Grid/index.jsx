import { attachPropertiesToComponent } from 'easy-soft-utility';

import Grid from './grid';
import Item from './item';

import './index.less';

export default attachPropertiesToComponent(Grid, {
  Item,
});
