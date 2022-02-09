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
      path: pathCollection.ellipsis.path,
    },
    {
      id: 'ImageBox',
      name: '图片',
      path: pathCollection.imageBox.path,
    },
    {
      id: 'ColorText',
      name: '装饰文字',
      path: pathCollection.colorText.path,
    },
    {
      id: 'Price',
      name: '价格',
      path: pathCollection.price.path,
    },
    {
      id: 'Loading',
      name: '加载提示',
      path: pathCollection.loading.path,
    },
    {
      id: 'Tag',
      name: '标签',
      path: pathCollection.tag.path,
    },
    {
      id: 'Countdown',
      name: '倒计时',
      path: pathCollection.countdown.path,
    },
    {
      id: 'Transition',
      name: '变换动画',
      path: pathCollection.transition.path,
    },
    {
      id: 'Notification',
      name: '动态通知',
      path: pathCollection.notification.path,
    },
    {
      id: 'Avatar',
      name: '头像',
      path: pathCollection.avatar.path,
    },
    {
      id: 'Badge',
      name: '徽记',
      path: pathCollection.badge.path,
    },
    {
      id: 'Item',
      name: '条目项',
      path: pathCollection.item.path,
    },
    {
      id: 'NoticeBar',
      name: '通知条',
      path: pathCollection.noticeBar.path,
    },
    {
      id: 'Footer',
      name: '底部',
      path: pathCollection.footer.path,
    },
    {
      id: 'HelpBox',
      name: '帮助提示',
      path: pathCollection.helpBox.path,
    },
    {
      id: 'Swiper',
      name: '滑动展示',
      path: pathCollection.swiper.path,
    },
    {
      id: 'Steps',
      name: '步骤条',
      path: pathCollection.steps.path,
    },
    {
      id: 'DataGrid',
      name: '数据表格',
      path: pathCollection.dataGrid.path,
    },
    {
      id: 'SearchBar',
      name: '搜索条',
      path: pathCollection.searchBar.path,
    },
    {
      id: 'Cascader',
      name: '级联选择',
      path: pathCollection.cascader.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
