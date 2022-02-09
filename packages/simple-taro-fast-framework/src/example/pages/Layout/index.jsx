import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '布局',
  list: [
    {
      id: 'Flex',
      name: '弹性布局',
      path: pathCollection.flex.path,
    },
    {
      id: 'FlexBox',
      name: '自动布局',
      path: pathCollection.flexBox.path,
    },
    {
      id: 'Space',
      name: '间隔布局',
      path: pathCollection.space.path,
    },
    {
      id: 'Divider',
      name: '间隔线',
      path: pathCollection.divider.path,
    },
    {
      id: 'HorizontalCenterBox',
      name: '水平居中',
      path: pathCollection.horizontalCenterBox.path,
    },
    {
      id: 'VerticalBox',
      name: '垂直居中',
      path: pathCollection.verticalBox.path,
    },
    {
      id: 'CenterBox',
      name: '容器居中',
      path: pathCollection.centerBox.path,
    },
    {
      id: 'Grid',
      name: '宫格',
      path: pathCollection.grid.path,
    },
    {
      id: 'Card',
      name: '卡片',
      path: pathCollection.card.path,
    },
    {
      id: 'Popup',
      name: '弹出面板',
      path: pathCollection.popup.path,
    },
    {
      id: 'Tabs',
      name: '标签面板',
      path: pathCollection.tabs.path,
    },
    {
      id: 'Overlay',
      name: '遮罩',
      path: pathCollection.overlay.path,
    },
    {
      id: 'Collapse',
      name: '折叠面板',
      path: pathCollection.collapse.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
