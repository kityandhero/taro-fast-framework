import { attachPropertiesToComponent } from 'easy-soft-utility';

import { useTransition } from './tools';
import { Transition } from './transition';

import './index.less';

export default attachPropertiesToComponent(Transition, {
  useTransition,
});
