import { connect } from 'easy-soft-dva';
import { sortBy } from 'easy-soft-utility';

import { checkWeAppEnvironment } from 'taro-fast-common';

import iconBasic from '../../../../assets/images/icon-list-basic.png';
import { ChannelPageBase } from '../../../../customComponents';
import { pathCollection } from '../../../../customConfig';

const list = [
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
    hidden: !checkWeAppEnvironment(),
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
];

const o = {
  icon: iconBasic,
  title: '滚动视图',
  list: sortBy(list, (one) => {
    return one.id;
  }),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '滚动视图',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
