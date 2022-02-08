import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Card, Space, Price } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="普通显示"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Price price={4.78} />
          </Card>

          <Card
            header="显示修饰符"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Space>
              <Price price={4.78} prefix="¥" />
              <Price price={4.78} prefix="$" />
            </Space>
          </Card>

          <Card header="删除线" style={cardStyle} headerStyle={cardHeaderStyle}>
            <Price price={4.78} itemStyle={{ color: '#ccc' }} strikethrough />
          </Card>

          <Card
            header="外层样式"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Price
              price={4.78}
              bodyStyle={{
                border: `${transformSize(2)} solid #ccc`,
                padding: transformSize(6),
              }}
            />
          </Card>

          <Card
            header="元素通用样式"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Price
              price={4.78}
              itemStyle={{ color: '#ccc', fontSize: transformSize(36) }}
            />
          </Card>

          <Card
            header="复杂显示"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Price
              price={4.78}
              prefix="¥"
              itemStyle={{
                color: '#E04247',
                fontWeight: 'bold',
              }}
              prefixStyle={{
                fontSize: transformSize(24),
                marginRight: transformSize(5),
              }}
              integerPartStyle={{ fontSize: transformSize(48) }}
              pointStyle={{ fontSize: transformSize(48) }}
              decimalPartStyle={{ fontSize: transformSize(48) }}
            />
          </Card>
        </Space>
      </View>
    );
  }
}
