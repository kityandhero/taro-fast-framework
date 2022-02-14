import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '视图示例',
  list: [
    {
      id: 'Normal',
      name: '普通视图',
      path: pathCollection.variableView.normal.path,
    },
    {
      id: 'ScrollView',
      name: '滚动视图',
      path: pathCollection.variableView.scroll.path,
    },
    {
      id: 'ScrollViewPullRefresh',
      name: '滚动视图下拉刷新',
      path: pathCollection.variableView.scrollPullRefresh.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
