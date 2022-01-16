import { View } from '@tarojs/components';

import {
  BlockArea,
  Space,
  Price,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="普通显示">
          <Price price={4.78} />
        </BlockArea>

        <BlockArea title="显示修饰符">
          <Space>
            <Price price={4.78} prefix="¥" />
            <Price price={4.78} prefix="$" />
          </Space>
        </BlockArea>

        <BlockArea title="删除线">
          <Price price={4.78} itemStyle={{ color: '#ccc' }} strikethrough />
        </BlockArea>

        <BlockArea title="外层样式">
          <Price
            price={4.78}
            bodyStyle={{ border: '2rpx solid #ccc', padding: '6rpx' }}
          />
        </BlockArea>

        <BlockArea title="元素通用样式">
          <Price
            price={4.78}
            itemStyle={{ color: '#ccc', fontSize: '36rpx' }}
          />
        </BlockArea>

        <BlockArea title="复杂显示">
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
        </BlockArea>
      </View>
    );
  }
}
