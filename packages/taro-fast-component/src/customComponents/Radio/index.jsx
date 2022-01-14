import { attachPropertiesToComponent } from 'taro-fast-common/es/utils/tools';

import Radio from './radio';
import { radioOptionProperties } from './tools';

import './index.less';

export default attachPropertiesToComponent(Radio, {
  optionProperties: radioOptionProperties,
});
