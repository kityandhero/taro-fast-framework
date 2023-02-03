import { connect } from 'easy-soft-dva';
import { sortBy } from 'easy-soft-utility';

import iconBasic from '../../../assets/images/icon-list-basic.png';
import { ChannelPageBase } from '../../../customComponents';
import { pathCollection } from '../../../customConfig';

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
