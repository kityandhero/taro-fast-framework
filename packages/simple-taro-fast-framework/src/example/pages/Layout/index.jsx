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
      path: pathCollection.example.flex.path,
    },
    {
      id: 'FlexBox',
      name: '自动布局',
      path: pathCollection.example.flexBox.path,
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
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
