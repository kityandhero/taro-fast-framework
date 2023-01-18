import { attachPropertiesToComponent } from 'easy-soft-utility';

import { buildOption } from './options';
import Selector from './selector';

import './index.less';

export default attachPropertiesToComponent(Selector, {
  buildOption,
});
