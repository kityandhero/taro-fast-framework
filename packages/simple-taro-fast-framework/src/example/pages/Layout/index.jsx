import { connect } from 'react-redux';

import { sortBy } from 'taro-fast-common/es/utils/tools';

import { pathCollection } from '../../../customConfig/config';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const list = [
  {
    id: 'Flex',
    name: '弹性布局',
    path: pathCollection.example.flex.path,
  },
  {
    id: 'HeadNavigation',
    name: '头部导航',
    path: pathCollection.example.headNavigation.path,
  },
  {
    id: 'FlexBox',
    name: '自动布局',
    path: pathCollection.example.flexBox.path,
  },
  {
    id: 'FixedBox',
    name: '定位布局',
    path: pathCollection.example.fixedBox.path,
  },
  {
    id: 'Space',
    name: '间隔布局',
    path: pathCollection.example.space.path,
  },
  {
    id: 'Divider',
    name: '间隔线',
    path: pathCollection.example.divider.path,
  },
  {
    id: 'FadeInBox',
    name: '渐显容器',
    path: pathCollection.example.fadeInBox.path,
  },
  {
    id: 'ScrollBox',
    name: '滚动容器',
    path: pathCollection.example.scrollBox.path,
  },
  {
    id: 'HorizontalCenterBox',
    name: '水平居中',
    path: pathCollection.example.horizontalCenterBox.path,
  },
  {
    id: 'VerticalBox',
    name: '垂直居中',
    path: pathCollection.example.verticalBox.path,
  },
  {
    id: 'CenterBox',
    name: '容器居中',
    path: pathCollection.example.centerBox.path,
  },
  {
    id: 'ThumbnailBox',
    name: '缩略容器',
    path: pathCollection.example.thumbnailBox.path,
  },
  {
    id: 'ScaleBox',
    name: '比例容器',
    path: pathCollection.example.scaleBox.path,
  },
  {
    id: 'HtmlBox',
    name: 'Html容器',
    path: pathCollection.example.htmlBox.path,
  },
  {
    id: 'TranslucentBox',
    name: '半透明容器',
    path: pathCollection.example.translucentBox.path,
  },
  {
    id: 'Transition',
    name: '动画容器',
    path: pathCollection.example.transition.path,
  },
  {
    id: 'Swiper',
    name: '滑动布局',
    path: pathCollection.example.swiper.path,
  },
  {
    id: 'Grid',
    name: '宫格',
    path: pathCollection.example.grid.path,
  },
  {
    id: 'Card',
    name: '卡片',
    path: pathCollection.example.card.path,
  },
  {
    id: 'Popup',
    name: '弹出面板',
    path: pathCollection.example.popup.path,
  },
  {
    id: 'Tabs',
    name: '标签面板',
    path: pathCollection.example.tabs.path,
  },
  {
    id: 'Overlay',
    name: '遮罩',
    path: pathCollection.example.overlay.path,
  },
  {
    id: 'Collapse',
    name: '折叠面板',
    path: pathCollection.example.collapse.path,
  },
  {
    id: 'BackboardBox',
    name: '背板面板',
    path: pathCollection.example.backboardBox.path,
  },
];

const o = {
  icon: iconBasic,
  title: '布局',
  list: sortBy(list, (one) => {
    return one.id;
  }),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '布局',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
