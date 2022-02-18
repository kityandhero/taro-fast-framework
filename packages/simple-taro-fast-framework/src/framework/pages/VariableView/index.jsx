import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '内置视图',
  list: [
    {
      id: 'NormalMode',
      name: '普通视图模式',
      path: pathCollection.framework.variableView.normalMode.path,
    },
    {
      id: 'ScrollMode',
      name: '滚动视图模式',
      path: pathCollection.framework.variableView.scrollMode.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
