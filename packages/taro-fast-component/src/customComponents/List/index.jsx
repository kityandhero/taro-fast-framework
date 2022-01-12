import { attachPropertiesToComponent } from 'taro-fast-common/es/utils/tools';

import List from './list';
import Item from './item';

import './index.less';

export default attachPropertiesToComponent(List, { Item });
