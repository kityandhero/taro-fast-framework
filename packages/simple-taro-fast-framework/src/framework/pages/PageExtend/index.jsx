import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '内置视图',
  list: [
    {
      id: 'BuiltInEffect',
      name: '内置功能',
      path: pathCollection.framework.pageExtend.builtInEffect.path,
    },
    {
      id: 'Normal',
      name: '普通视图',
      path: pathCollection.framework.pageExtend.normal.path,
    },
    {
      id: 'Scroll',
      name: '滚动视图',
      path: pathCollection.framework.pageExtend.scroll.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}