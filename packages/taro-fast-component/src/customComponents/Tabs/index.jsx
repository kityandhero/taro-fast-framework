import { attachPropertiesToComponent } from 'taro-fast-common/es/utils/tools';

import TabPanel from './panel';
import Tabs from './tabs';

import './index.less';

export default attachPropertiesToComponent(Tabs, {
  TabPanel,
});
