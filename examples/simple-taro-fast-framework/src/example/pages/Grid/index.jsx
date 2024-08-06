import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { Grid, Space } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const itemStyle = {
  border: `solid ${transformSize(1)} #999999`,
  background: '#f5f5f5',
  textAlign: 'center',
  color: '#999999',
  height: '100%',
};

const config1 = {
  columns: 3,
  gap: 8,
};

const config2 = {
  columns: 3,
  gap: 20,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '宫格布局',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Grid',
    name: '宫格布局',
    description: '宫格布局',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      header: '用法展示',
      currentConfig: config1,
      inner: [
        <Grid.Item key="item-A">
          <View style={itemStyle}>A</View>
        </Grid.Item>,
        <Grid.Item key="item-B">
          <View style={itemStyle}>B</View>
        </Grid.Item>,
        <Grid.Item key="item-C">
          <View style={itemStyle}>C</View>
        </Grid.Item>,
        <Grid.Item key="item-D">
          <View style={itemStyle}>D</View>
        </Grid.Item>,
        <Grid.Item key="item-E">
          <View style={itemStyle}>E</View>
        </Grid.Item>,
      ],
    };
  }

  establishControlList = () => {
    return [
      {
        header: '用法展示',
        config: config1,
        inner: [
          <Grid.Item key="item-A">
            <View style={itemStyle}>A</View>
          </Grid.Item>,
          <Grid.Item key="item-B">
            <View style={itemStyle}>B</View>
          </Grid.Item>,
          <Grid.Item key="item-C">
            <View style={itemStyle}>C</View>
          </Grid.Item>,
          <Grid.Item key="item-D">
            <View style={itemStyle}>D</View>
          </Grid.Item>,
          <Grid.Item key="item-E">
            <View style={itemStyle}>E</View>
          </Grid.Item>,
        ],
      },
      {
        header: '控制格子的跨度',
        config: config2,
        inner: [
          <Grid.Item key="item-A">
            <View style={itemStyle}>A</View>
          </Grid.Item>,
          <Grid.Item key="item-B" span={2}>
            <View style={itemStyle}>B</View>
          </Grid.Item>,
          <Grid.Item key="item-C" span={2}>
            <View style={itemStyle}>C</View>
          </Grid.Item>,
          <Grid.Item key="item-D">
            <View style={itemStyle}>D</View>
          </Grid.Item>,
          <Grid.Item key="item-E" span={3}>
            <View style={itemStyle}>E</View>
          </Grid.Item>,
        ],
      },
      {
        header: '元素生成模式',
        config: {
          ...config1,
          list: [
            {
              text: 'A',
              onGridItemClick: () => {
                console.log('Grid Item Clicked');
              },
            },
            {
              text: 'B',
            },
            {
              text: 'C',
            },
            {
              span: 2,
              text: 'D',
            },
            {
              text: 'E',
            },
          ],
          // eslint-disable-next-line no-unused-vars
          itemBuilder: ({ item, index }) => {
            const { text } = item;

            return <View style={itemStyle}>{text}</View>;
          },
        },
        description: 'itemBuilder: 示例 ({ item, index })=>{...}',
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Grid key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Grid>
    );
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="Grid"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['itemBuilder']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox
          header="Grid 可配置项以及默认值"
          config={Grid.defaultProps}
          labelWidth={240}
        />

        <PropertyBox
          header="Grid.Item 可配置项以及默认值"
          config={Grid.Item.defaultProps}
          labelWidth={240}
        />
      </Space>
    );
  };
}
