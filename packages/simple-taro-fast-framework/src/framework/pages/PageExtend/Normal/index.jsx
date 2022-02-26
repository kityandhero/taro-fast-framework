import { isWechat } from 'taro-fast-common/es/utils/tools';

import { pathCollection } from '../../../../customConfig/constants';
import ChannelPageBase from '../../../../customComponents/ChannelPageBase';

import iconBasic from '../../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '默认视图',
  list: [
    {
      id: 'Basic',
      name: '基础使用',
      path: pathCollection.framework.pageExtend.normal.basic.path,
    },
    {
      id: 'UpperBox',
      name: '上部区域',
      path: pathCollection.framework.pageExtend.normal.upperBox.path,
    },
    {
      id: 'RemoteLoad',
      name: '远程加载',
      path: pathCollection.framework.pageExtend.normal.remoteLoad.path,
    },
    {
      id: 'RemoteLoad',
      name: '自定义初始加载提示器',
      path: pathCollection.framework.pageExtend.normal.remoteLoadSpecial.path,
    },
    {
      id: 'PullRefresh',
      name: '下拉刷新-下拉提示器效果',
      path: pathCollection.framework.pageExtend.normal.pullRefresh.path,
    },
    {
      id: 'PullRefresh',
      name: '下拉刷新-缩放提示器效果',
      path: pathCollection.framework.pageExtend.normal.pullRefreshSpecial.path,
      hidden: !isWechat,
    },
    {
      id: 'LowerLoad',
      name: '触底加载-底部提示效果',
      path: pathCollection.framework.pageExtend.normal.lowerLoad.path,
    },
    {
      id: 'LowerLoad',
      name: '触底加载-外部提示效果',
      path: pathCollection.framework.pageExtend.normal.lowerLoadSpecial.path,
    },
    {
      id: 'ComplexSample',
      name: '复杂示例',
      path: pathCollection.framework.pageExtend.normal.complexSample.path,
    },
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '首页',
});

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
