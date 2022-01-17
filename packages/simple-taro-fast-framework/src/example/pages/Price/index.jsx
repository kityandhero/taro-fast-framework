import { View } from '@tarojs/components';

import { Card, Space, Price } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="普通显示">
          <Price price={4.78} />
        </Card>

        <Card header="显示修饰符">
          <Space>
            <Price price={4.78} prefix="¥" />
            <Price price={4.78} prefix="$" />
          </Space>
        </Card>

        <Card header="删除线">
          <Price price={4.78} itemStyle={{ color: '#ccc' }} strikethrough />
        </Card>

        <Card header="外层样式">
          <Price
            price={4.78}
            bodyStyle={{ border: '2rpx solid #ccc', padding: '6rpx' }}
          />
        </Card>

        <Card header="元素通用样式">
          <Price
            price={4.78}
            itemStyle={{ color: '#ccc', fontSize: '36rpx' }}
          />
        </Card>

        <Card header="复杂显示">
          <Price
            price={4.78}
            prefix="¥"
            itemStyle={{
              color: '#E04247',
              fontWeight: 'bold',
            }}
            prefixStyle={{
              fontSize: '26rpx',
              marginRight: '5rpx',
            }}
            integerPartStyle={{ fontSize: '48rpx' }}
            pointStyle={{ fontSize: '48rpx' }}
            decimalPartStyle={{ fontSize: '48rpx' }}
          />
        </Card>
      </View>
    );
  }
}
