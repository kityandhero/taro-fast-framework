import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '扩展组件',
  list: [
    {
      id: 'Circle',
      name: '进度环',
      path: pathCollection.circle.path,
    },
    {
      id: 'Selector',
      name: '高级选择',
      path: pathCollection.selector.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
