import { View } from '@tarojs/components';

import { List } from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

export default class Index extends PageWrapper {
  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  renderFurther() {
    return (
      <View className="index">
        <List header="基础用法">
          <List.Item>1</List.Item>
          <List.Item>2</List.Item>
          <List.Item>3</List.Item>
        </List>
      </View>
    );
  }
}
