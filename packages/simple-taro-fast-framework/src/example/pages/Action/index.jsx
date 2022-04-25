import { connect } from 'react-redux';

import { sortBy } from 'taro-fast-common/es/utils/tools';

import { pathCollection } from '../../../customConfig/config';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

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
    id: 'Modal',
    name: '弹窗',
    path: pathCollection.example.modal.path,
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
