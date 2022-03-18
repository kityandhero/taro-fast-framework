import { attachPropertiesToComponent } from 'taro-fast-common/es/utils/tools';

import Selector from './selector';
import { buildOption } from './options';

import './index.less';

export default attachPropertiesToComponent(Selector, {
  buildOption,
});
