import { connect } from 'react-redux';

import { sortBy } from 'taro-fast-common/es/utils/tools';

import { pathCollection } from '../../../customConfig/config';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const list = [
  {
    id: 'Circle',
    name: '进度环',
    path: pathCollection.example.circle.path,
  },
  {
    id: 'Selector',
    name: '高级选择',
    path: pathCollection.example.selector.path,
  },
];

const o = {
  icon: iconBasic,
  title: '扩展组件',
  list: sortBy(list, (one) => {
    return one.id;
  }),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '扩展组件',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
