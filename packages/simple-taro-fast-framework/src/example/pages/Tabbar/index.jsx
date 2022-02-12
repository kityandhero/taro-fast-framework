import { View } from '@tarojs/components';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { Divider, Tabbar } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';

import iconAction from '../../../assets/images/icon-list-action.png';
import iconBasic from '../../../assets/images/icon-list-basic.png';
import iconForm from '../../../assets/images/icon-list-form.png';
// import iconHOC from '../../../assets/images/icon-list-hoc.png';
import iconLayout from '../../../assets/images/icon-list-layout.png';

const itemsIcon = [
  {
    name: 'home',
    icon: 'home',
    text: '首页',
  },
  {
    name: 'mail',
    icon: 'mail',
    text: '邮箱',
  },
  {
    name: 'shopping-cart',
    icon: 'shopping-cart',
    text: '购物车',
  },
  {
    name: 'camera',
    icon: 'camera',
    text: '相机',
  },
  {
    name: 'user',
    icon: 'user',
    text: '用户',
  },
];

const itemsImage = [
  {
    name: 'action',
    image: iconAction,
    text: 'action',
  },
  {
    name: 'basic',
    image: iconBasic,
    text: 'basic',
  },
  {
    name: 'form',
    image: iconForm,
    text: 'form',
  },
  {
    name: 'layout',
    image: iconLayout,
    text: 'layout',
    hidden: true,
  },
];

const itemsMix = [
  {
    name: 'home',
    icon: 'home',
    text: '首页',
  },
  {
    name: 'basic',
    image: iconBasic,
    text: 'basic',
  },
  {
    name: 'form',
    image: iconForm,
    text: 'form',
  },
  {
    name: 'layout',
    image: iconLayout,
    text: 'layout',
  },
  {
    name: 'user',
    icon: 'user',
    text: '用户',
  },
];

const items2 = [
  {
    name: 'home',
    icon: 'home',
    text: '首页',
  },
  {
    name: 'mail',
    icon: 'mail',
    text: '邮箱',
  },
  {
    name: 'shopping-cart',
    icon: 'shopping-cart',
    text: '购物车',
    badgeContent: '12',
  },
  {
    name: 'camera',
    icon: 'camera',
    text: '相机',
    activeImage: iconLayout,
    dot: true,
  },
  {
    name: 'user',
    icon: 'user',
    activeIcon: 'sketch',
    text: '用户',
  },
];

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Tabbar',
    name: '底部导航栏',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        value: 'user',
      },
    };
  }

  changeTab = (o) => {
    const { name } = o;

    console.log(o);

    if (!stringIsNullOrWhiteSpace(name)) {
      this.setState({ value: name });
    }
  };

  renderContent = () => {
    const { value } = this.state;

    return (
      <View className="index">
        <Divider>图标模式</Divider>

        <Tabbar items={itemsIcon} />

        <Divider>图片模式</Divider>

        <Tabbar items={itemsImage} />

        <Divider>图标图片混合模式</Divider>

        <Tabbar items={itemsMix} itemWidth={130} />

        <Divider>固定底部</Divider>

        <Tabbar value={value} fixed items={items2} onClick={this.changeTab} />
      </View>
    );
  };
}
