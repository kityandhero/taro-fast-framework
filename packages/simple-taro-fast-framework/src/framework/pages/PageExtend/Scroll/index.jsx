import { pathCollection } from '../../../../customConfig/constants';
import ChannelPageBase from '../../../../customComponents/ChannelPageBase';

import iconBasic from '../../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '滚动视图',
  list: [
    {
      id: 'Basic',
      name: '基础使用',
      path: pathCollection.framework.pageExtend.scroll.basic.path,
    },
    {
      id: 'UpperBox',
      name: '上部固定区域',
      path: pathCollection.framework.pageExtend.scroll.upperBox.path,
    },
    {
      id: 'EmptyPlaceholder',
      name: '空数据占位',
      path: pathCollection.framework.pageExtend.scroll.emptyPlaceholder.path,
    },
    {
      id: 'PullRefresh',
      name: '下拉刷新',
      path: pathCollection.framework.pageExtend.scroll.pullRefresh.path,
    },
    {
      id: 'CustomPullRefresh',
      name: '自定义下拉刷新',
      path: pathCollection.framework.pageExtend.scroll.customPullRefresh.path,
    },
    {
      id: 'ScrollLowerLoad',
      name: '触底加载',
      path: pathCollection.framework.pageExtend.scroll.lowerLoad.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
