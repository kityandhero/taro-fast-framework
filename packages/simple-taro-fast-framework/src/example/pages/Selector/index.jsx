import { useState } from 'react';
import { View } from '@tarojs/components';

import { Card, Space } from 'taro-fast-component/es/customComponents';
import { Selector } from 'taro-fast-component-extra/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const ItemList = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
  },
  {
    label: '选项四',
    value: '4',
  },
];

// 避免取消选择
const RadioMode = () => {
  const [value, setValue] = useState('1');
  return (
    <Selector
      options={ItemList}
      value={[value]}
      onChange={(v) => {
        if (v.length) {
          setValue(v[0]);
        }
      }}
    />
  );
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="单选" style={cardStyle} headerStyle={cardHeaderStyle}>
            <Selector
              options={ItemList}
              value={['1']}
              onChange={(arr, extend) => console.log(arr, extend.items)}
            />
          </Card>

          <Card header="多选" style={cardStyle} headerStyle={cardHeaderStyle}>
            <Selector
              options={ItemList}
              value={['2', '3']}
              multiple
              onChange={(arr, extend) => console.log(arr, extend.items)}
            />
          </Card>

          <Card
            header="全局禁止"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Selector
              options={ItemList}
              value={['1']}
              disabled
              onChange={(arr) => console.log(arr)}
            />
          </Card>

          <Card
            header="固定两列"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Selector
              columns={2}
              options={ItemList}
              value={['2', '3']}
              multiple
              onChange={(arr) => console.log(arr)}
            />
          </Card>

          <Card
            header="固定三列"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Selector
              columns={3}
              options={ItemList}
              value={['2', '3']}
              multiple
              onChange={(arr) => console.log(arr)}
            />
          </Card>

          <Card
            header="避免取消选择"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <RadioMode />
          </Card>

          <Card
            header="选项带描述"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Selector
              columns={2}
              options={[
                {
                  label: '选项一',
                  description: '描述信息',
                  value: '1',
                },
                {
                  label: '选项二',
                  description: '描述信息',
                  value: '2',
                },
              ]}
              value={['1']}
            />
          </Card>

          <Card
            header="自定义样式（通过 style）"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Selector
              style={{ '--checked-color': '#ffe2e5' }}
              options={ItemList}
              value={['1', '2']}
              multiple
            />
          </Card>

          <Card
            header="自定义样式（通过 className）"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Selector
              className="my-selector"
              options={ItemList}
              value={['1', '2']}
              multiple
            />
          </Card>
        </Space>
      </View>
    );
  }
}
