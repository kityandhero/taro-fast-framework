import { View } from '@tarojs/components';

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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Tabbar',
    name: '底部导航栏',
  };

  renderContent = () => {
    return (
      <View className="index">
        <Divider>图标模式</Divider>

        <Tabbar
          items={itemsIcon}
          onClick={(o) => {
            console.log(o);
          }}
        />

        <Divider>图片模式</Divider>

        <Tabbar
          items={itemsImage}
          onClick={(o) => {
            console.log(o);
          }}
        />

        <Divider>图标图片混合模式</Divider>

        <Tabbar
          items={itemsMix}
          itemWidth={130}
          onClick={(o) => {
            console.log(o);
          }}
        />

        <Divider>固定底部</Divider>

        <Tabbar
          value="user"
          fixed
          items={items2}
          onClick={(o) => {
            console.log(o);
          }}
        />
      </View>
    );
  };
}
