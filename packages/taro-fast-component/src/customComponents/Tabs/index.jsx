import { attachPropertiesToComponent } from 'taro-fast-common/es/utils/tools';

import Tabs from './tabs';
import TabPanel from './panel';

import './index.less';

export default attachPropertiesToComponent(Tabs, {
  TabPanel,
});
