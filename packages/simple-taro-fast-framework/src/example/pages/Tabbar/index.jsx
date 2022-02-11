import { View } from '@tarojs/components';

import { Tabbar } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';

const items = [
  {
    name: 'User',
    icon: 'user',
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
        <Tabbar items={items} />
      </View>
    );
  };
}
