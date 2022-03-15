import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Grid, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Grid',
    name: '宫格布局',
    description: '宫格布局',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="用法展示" config={config1}>
          <Grid {...config1}>
            <Grid.Item>
              <View style={itemStyle}>A</View>
            </Grid.Item>
            <Grid.Item>
              <View style={itemStyle}>B</View>
            </Grid.Item>
            <Grid.Item>
              <View style={itemStyle}>C</View>
            </Grid.Item>
            <Grid.Item>
              <View style={itemStyle}>D</View>
            </Grid.Item>
            <Grid.Item>
              <View style={itemStyle}>E</View>
            </Grid.Item>
          </Grid>
        </SimpleBox>

        <SimpleBox header="控制格子的跨度" config={config2}>
          <Grid {...config2}>
            <Grid.Item>
              <View style={itemStyle}>A</View>
            </Grid.Item>
            <Grid.Item span={2}>
              <View style={itemStyle}>B</View>
            </Grid.Item>
            <Grid.Item span={2}>
              <View style={itemStyle}>C</View>
            </Grid.Item>
            <Grid.Item>
              <View style={itemStyle}>D</View>
            </Grid.Item>
            <Grid.Item span={3}>
              <View style={itemStyle}>E</View>
            </Grid.Item>
          </Grid>
        </SimpleBox>

        <PropertyBox
          header="Grid 可配置项以及默认值"
          config={Grid.defaultProps}
          labelWidth={170}
        />

        <PropertyBox
          header="Grid.Item 可配置项以及默认值"
          config={Grid.Item.defaultProps}
          labelWidth={170}
        />
      </Space>
    );
  };
}
