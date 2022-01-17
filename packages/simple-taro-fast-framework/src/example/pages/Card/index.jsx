import { View } from '@tarojs/components';

import { Card, Item } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index" style={{ backgroundColor: '#453e21' }}>
        <Card header="基础用法" style={style}>
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
        </Card>

        <Card header="扩展" style={style} extra="扩展">
          <Item arrow>条目1</Item>
          <Item arrow>条目2</Item>
          <Item arrow>条目3</Item>
        </Card>

        <Card mode="card" header="卡片模式" style={style}>
          <Item title="这里是标题">这里是主信息</Item>
          <Item title="这里是标题">这里是主信息</Item>
        </Card>
      </View>
    );
  }
}
