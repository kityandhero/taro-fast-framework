import { attachPropertiesToComponent } from 'taro-fast-common/es/utils/tools';

import { Transition } from './transition';
import { useTransition } from './tools';

import './index.less';

export default attachPropertiesToComponent(Transition, {
  useTransition,
});
