import { sortBy } from 'taro-fast-common/es/utils/tools';
import { connect } from 'taro-fast-framework/es/utils/dva';

import iconBasic from '../../../assets/images/icon-list-basic.png';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';
import { pathCollection } from '../../../customConfig/pathConfig';

const list = [
  {
    id: 'Util',
    name: '功能函数',
    path: pathCollection.example.utils.path,
  },
  {
    id: 'CSS',
    name: '内置变量',
    path: pathCollection.example.cssVariable.path,
  },
  {
    id: 'Color',
    name: '颜色',
    path: pathCollection.example.color.path,
  },
  {
    id: 'Icon',
    name: '图标',
    path: pathCollection.example.icon.path,
  },
  {
    id: 'Line',
    name: '线条',
    path: pathCollection.example.line.path,
  },
  {
    id: 'Link',
    name: '链接',
    path: pathCollection.example.link.path,
  },
  {
    id: 'Button',
    name: '按钮',
    path: pathCollection.example.button.path,
  },
];

const o = {
  icon: iconBasic,
  title: '基础',
  list: sortBy(list, (one) => {
    return one.id;
  }),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '基础',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
