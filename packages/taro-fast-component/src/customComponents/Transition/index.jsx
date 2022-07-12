import { attachPropertiesToComponent } from 'taro-fast-common/es/utils/tools';

import { useTransition } from './tools';
import { Transition } from './transition';

import './index.less';

export default attachPropertiesToComponent(Transition, {
  useTransition,
});
