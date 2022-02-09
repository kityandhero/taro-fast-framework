import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '表单',
  list: [
    {
      id: 'InputItem',
      name: '输入项',
      path: pathCollection.inputItem.path,
    },
    {
      id: 'Switch',
      name: '开关',
      path: pathCollection.switch.path,
    },
    {
      id: 'SwitchItem',
      name: '开关项',
      path: pathCollection.switchItem.path,
    },
    {
      id: 'Radio',
      name: '单选',
      path: pathCollection.radio.path,
    },
    {
      id: 'RadioSelector',
      name: '弹出式单选',
      path: pathCollection.radioSelector.path,
    },
    {
      id: 'CheckBox',
      name: '复选',
      path: pathCollection.checkBox.path,
    },
    {
      id: 'CheckBoxSelector',
      name: '弹出式复选',
      path: pathCollection.checkBoxSelector.path,
    },
    {
      id: 'Progress',
      name: '进度条',
      path: pathCollection.progress.path,
    },
    {
      id: 'ProgressBox',
      name: '扩展进度条',
      path: pathCollection.progressBox.path,
    },
    {
      id: 'ProgressItem',
      name: '进度项',
      path: pathCollection.progressItem.path,
    },
    {
      id: 'Stepper',
      name: '进步器',
      path: pathCollection.stepper.path,
    },
    {
      id: 'StepperItem',
      name: '进步项',
      path: pathCollection.stepperItem.path,
    },
    {
      id: 'TextAreaItem',
      name: '文本域编辑项',
      path: pathCollection.textAreaItem.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
