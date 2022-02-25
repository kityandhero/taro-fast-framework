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
      id: 'RemoteLoad',
      name: '远程加载',
      path: pathCollection.framework.pageExtend.scroll.remoteLoad.path,
    },
    {
      id: 'RemoteLoad',
      name: '自定义初始加载提示器',
      path: pathCollection.framework.pageExtend.scroll.remoteLoadSpecial.path,
    },
    {
      id: 'PullRefresh',
      name: '下拉刷新-下拉提示器效果',
      path: pathCollection.framework.pageExtend.scroll.pullRefresh.path,
    },
    {
      id: 'PullRefresh',
      name: '下拉刷新-缩放提示器效果',
      path: pathCollection.framework.pageExtend.scroll.pullRefreshSpecial.path,
    },
    {
      id: 'LowerLoad',
      name: '触底加载-底部提示效果',
      path: pathCollection.framework.pageExtend.scroll.lowerLoad.path,
    },
    {
      id: 'LowerLoad',
      name: '触底加载-外部提示效果',
      path: pathCollection.framework.pageExtend.scroll.lowerLoadSpecial.path,
    },
    {
      id: 'ComplexSample',
      name: '复杂示例',
      path: pathCollection.framework.pageExtend.scroll.complexSample.path,
    },
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '滚动视图',
});

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
