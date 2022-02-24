import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '元件',
  list: [
    {
      id: 'Ellipsis',
      name: '文字省略',
      path: pathCollection.example.ellipsis.path,
    },
    {
      id: 'ImageBox',
      name: '图片',
      path: pathCollection.example.imageBox.path,
    },
    {
      id: 'ColorText',
      name: '装饰文字',
      path: pathCollection.example.colorText.path,
    },
    {
      id: 'Price',
      name: '价格',
      path: pathCollection.example.price.path,
    },
    {
      id: 'Loading',
      name: '加载提示',
      path: pathCollection.example.loading.path,
    },
    {
      id: 'Tag',
      name: '标签',
      path: pathCollection.example.tag.path,
    },
    {
      id: 'Countdown',
      name: '倒计时',
      path: pathCollection.example.countdown.path,
    },
    {
      id: 'Transition',
      name: '变换动画',
      path: pathCollection.example.transition.path,
    },
    {
      id: 'Notification',
      name: '动态通知',
      path: pathCollection.example.notification.path,
    },
    {
      id: 'Avatar',
      name: '头像',
      path: pathCollection.example.avatar.path,
    },
    {
      id: 'Badge',
      name: '徽记',
      path: pathCollection.example.badge.path,
    },
    {
      id: 'Item',
      name: '条目项',
      path: pathCollection.example.item.path,
    },
    {
      id: 'NoticeBar',
      name: '通知条',
      path: pathCollection.example.noticeBar.path,
    },
    {
      id: 'Footer',
      name: '底部',
      path: pathCollection.example.footer.path,
    },
    {
      id: 'HelpBox',
      name: '帮助提示',
      path: pathCollection.example.helpBox.path,
    },
    {
      id: 'Swiper',
      name: '滑动展示',
      path: pathCollection.example.swiper.path,
    },
    {
      id: 'Steps',
      name: '步骤条',
      path: pathCollection.example.steps.path,
    },
    {
      id: 'DataGrid',
      name: '数据表格',
      path: pathCollection.example.dataGrid.path,
    },
    {
      id: 'SearchBar',
      name: '搜索条',
      path: pathCollection.example.searchBar.path,
    },
    {
      id: 'Cascader',
      name: '级联选择',
      path: pathCollection.example.cascader.path,
    },
    {
      id: 'Tabbar',
      name: '底部导航栏',
      path: pathCollection.example.tabbar.path,
    },
    {
      id: 'BackTop',
      name: '返回头部',
      path: pathCollection.example.backTop.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
