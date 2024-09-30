import { connect } from 'easy-soft-dva';
import { sortBy } from 'easy-soft-utility';

import iconBasic from '../../../assets/images/icon-list-basic.png';
import { ChannelPageBase } from '../../../customComponents';
import { pathCollection } from '../../../customConfig';

const list = [
  {
    id: 'ActionSheet',
    name: '动作面板',
    path: pathCollection.example.actionSheet.path,
  },
  {
    id: 'FloatAction',
    name: '浮动按钮',
    path: pathCollection.example.floatAction.path,
  },
  {
    id: 'Message',
    name: '消息提示',
    path: pathCollection.example.message.path,
  },
  {
    id: 'Modal',
    name: '弹窗',
    path: pathCollection.example.modal.path,
  },
  {
    id: 'Notification',
    name: '动态通知',
    path: pathCollection.example.notification.path,
  },
  {
    id: 'ImagePicker',
    name: '图片选择',
    path: pathCollection.example.imagePicker.path,
  },
];

const o = {
  icon: iconBasic,
  title: '操作反馈',
  list: sortBy(list, (one) => {
    return one.id;
  }),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '操作反馈',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
