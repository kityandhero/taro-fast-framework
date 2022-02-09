import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '基础',
  list: [
    {
      id: 'Util',
      name: '功能函数',
      path: pathCollection.utils.path,
    },
    {
      id: 'CSS',
      name: '内置变量',
      path: pathCollection.cssVariable.path,
    },
    {
      id: 'Color',
      name: '颜色',
      path: pathCollection.color.path,
    },
    {
      id: 'Icon',
      name: '图标',
      path: pathCollection.icon.path,
    },
    {
      id: 'Line',
      name: '线条',
      path: pathCollection.line.path,
    },
    {
      id: 'Button',
      name: '按钮',
      path: pathCollection.button.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
