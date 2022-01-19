import { attachPropertiesToComponent } from 'taro-fast-common/es/utils/tools';

import CheckBox from './checkBox';
import { checkBoxOptionProperties } from './tools';

export default attachPropertiesToComponent(CheckBox, {
  optionProperties: checkBoxOptionProperties,
});
