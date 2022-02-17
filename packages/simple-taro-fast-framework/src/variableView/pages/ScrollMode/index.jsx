import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '滚动视图模式',
  list: [
    {
      id: 'ScrollView',
      name: '普通模式',
      path: pathCollection.variableView.scrollView.path,
    },
    {
      id: 'ScrollViewPullRefresh',
      name: '默认下拉刷新',
      path: pathCollection.variableView.scrollPullRefresh.path,
    },
    {
      id: 'ScrollViewPullRefresh',
      name: '自定义下拉刷新',
      path: pathCollection.variableView.scrollCustomPullRefresh.path,
    },
    {
      id: 'ScrollLowerLoad',
      name: '触底加载',
      path: pathCollection.variableView.scrollLowerLoad.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
