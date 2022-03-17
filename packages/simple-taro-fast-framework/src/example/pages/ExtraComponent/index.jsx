import { pathCollection } from '../../../customConfig/config';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '扩展组件',
  list: [
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
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '扩展组件',
});

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
