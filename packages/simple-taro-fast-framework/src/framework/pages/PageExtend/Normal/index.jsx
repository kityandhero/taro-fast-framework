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
      id: 'PullRefresh',
      name: '下拉刷新',
      path: pathCollection.framework.pageExtend.normal.pullRefresh.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
