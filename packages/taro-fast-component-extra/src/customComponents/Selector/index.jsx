import { attachPropertiesToComponent } from 'taro-fast-common/es/utils/tools';

import { buildOption } from './options';
import Selector from './selector';

import './index.less';

export default attachPropertiesToComponent(Selector, {
  buildOption,
});
