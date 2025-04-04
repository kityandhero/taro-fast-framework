import { connect } from 'easy-soft-dva';
import { sortBy } from 'easy-soft-utility';

import iconBasic from '../../../assets/images/icon-list-basic.png';
import { ChannelPageBase } from '../../../customComponents';
import { pathCollection } from '../../../customConfig';

const list = [
  {
    id: 'InputItem',
    name: '输入项',
    path: pathCollection.example.inputItem.path,
  },
  {
    id: 'Switch',
    name: '开关',
    path: pathCollection.example.switch.path,
  },
  {
    id: 'SwitchItem',
    name: '开关项',
    path: pathCollection.example.switchItem.path,
  },
  {
    id: 'Radio',
    name: '单选',
    path: pathCollection.example.radio.path,
  },
  {
    id: 'RadioPopup',
    name: '自定义弹出式单选',
    path: pathCollection.example.radioPopup.path,
  },
  {
    id: 'RadioSelector',
    name: '弹出式单选',
    path: pathCollection.example.radioSelector.path,
  },
  {
    id: 'CheckBox',
    name: '复选',
    path: pathCollection.example.checkBox.path,
  },
  {
    id: 'CheckBoxPopup',
    name: '自定义弹出式复选',
    path: pathCollection.example.checkBoxPopup.path,
  },
  {
    id: 'CheckBoxSelector',
    name: '弹出式复选',
    path: pathCollection.example.checkBoxSelector.path,
  },
  {
    id: 'Progress',
    name: '进度条',
    path: pathCollection.example.progress.path,
  },
  {
    id: 'ProgressBox',
    name: '扩展进度条',
    path: pathCollection.example.progressBox.path,
  },
  {
    id: 'ProgressItem',
    name: '进度项',
    path: pathCollection.example.progressItem.path,
  },
  {
    id: 'Stepper',
    name: '进步器',
    path: pathCollection.example.stepper.path,
  },
  {
    id: 'StepperItem',
    name: '进步项',
    path: pathCollection.example.stepperItem.path,
  },
  {
    id: 'TextAreaItem',
    name: '文本域编辑项',
    path: pathCollection.example.textAreaItem.path,
  },
  {
    id: 'DatetimePicker',
    name: '日期时间选择器',
    path: pathCollection.example.datetimePicker.path,
  },
  {
    id: 'DatetimeItem',
    name: '日期时间项',
    path: pathCollection.example.datetimeItem.path,
  },
  {
    id: 'DatetimeRangePicker',
    name: '日期时间范围选择器',
    path: pathCollection.example.datetimeRangePicker.path,
  },
];

const o = {
  icon: iconBasic,
  title: '表单',
  list: sortBy(list, (one) => {
    return one.id;
  }),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '表单',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
