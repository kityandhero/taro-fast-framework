import { pathCollection } from '../../../../customConfig/constants';
import ChannelPageBase from '../../../../customComponents/ChannelPageBase';

import iconBasic from '../../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '滚动视图模式',
  list: [
    {
      id: 'Basic',
      name: '基础使用',
      path: pathCollection.framework.variableView.scrollViewBasic.path,
    },
    {
      id: 'UpperBox',
      name: '使用上部固定区域',
      path: pathCollection.framework.variableView.scrollViewUpperBox.path,
    },
    {
      id: 'EmptyPlaceholder',
      name: '空数据占位',
      path: pathCollection.framework.variableView.scrollViewEmpty.path,
    },
    {
      id: 'ScrollViewPullRefresh',
      name: '下拉刷新 [默认模式]',
      path: pathCollection.framework.variableView.scrollPullRefresh.path,
    },
    {
      id: 'ScrollViewPullRefresh',
      name: '下拉刷新 [自定义模式]',
      path: pathCollection.framework.variableView.scrollCustomPullRefresh.path,
    },
    {
      id: 'ScrollLowerLoad',
      name: '触底加载',
      path: pathCollection.framework.variableView.scrollLowerLoad.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
