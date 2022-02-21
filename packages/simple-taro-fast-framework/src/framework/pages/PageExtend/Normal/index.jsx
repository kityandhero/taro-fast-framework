import { pathCollection } from '../../../../customConfig/constants';
import ChannelPageBase from '../../../../customComponents/ChannelPageBase';

import iconBasic from '../../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '普通视图',
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
      id: 'RemoteLoadSpecial',
      name: '自定义初始加载提示器',
      path: pathCollection.framework.pageExtend.normal.remoteLoadSpecial.path,
    },
    {
      id: 'PullRefresh',
      name: '下拉刷新',
      path: pathCollection.framework.pageExtend.normal.pullRefresh.path,
    },
    {
      id: 'LowerLoad',
      name: '触底加载',
      path: pathCollection.framework.pageExtend.normal.lowerLoad.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
