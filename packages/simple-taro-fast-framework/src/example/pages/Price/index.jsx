import { View } from '@tarojs/components';

import { Card, Space, Price } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="普通显示" headerStyle={cardHeaderStyle}>
          <Price price={4.78} />
        </Card>

        <Card header="显示修饰符" headerStyle={cardHeaderStyle}>
          <Space>
            <Price price={4.78} prefix="¥" />
            <Price price={4.78} prefix="$" />
          </Space>
        </Card>

        <Card header="删除线" headerStyle={cardHeaderStyle}>
          <Price price={4.78} itemStyle={{ color: '#ccc' }} strikethrough />
        </Card>

        <Card header="外层样式" headerStyle={cardHeaderStyle}>
          <Price
            price={4.78}
            bodyStyle={{
              border: 'var(--tfc-px-2) solid #ccc',
              padding: 'var(--tfc-px-6)',
            }}
          />
        </Card>

        <Card header="元素通用样式" headerStyle={cardHeaderStyle}>
          <Price
            price={4.78}
            itemStyle={{ color: '#ccc', fontSize: '3var(--tfc-px-6)' }}
          />
        </Card>

        <Card header="复杂显示" headerStyle={cardHeaderStyle}>
          <Price
            price={4.78}
            prefix="¥"
            itemStyle={{
              color: '#E04247',
              fontWeight: 'bold',
            }}
            prefixStyle={{
              fontSize: 'var(--tfc-px-6)',
              marginRight: '5rpx',
            }}
            integerPartStyle={{ fontSize: 'var(--tfc-px-48)' }}
            pointStyle={{ fontSize: 'var(--tfc-px-48)' }}
            decimalPartStyle={{ fontSize: 'var(--tfc-px-48)' }}
          />
        </Card>
      </View>
    );
  }
}
