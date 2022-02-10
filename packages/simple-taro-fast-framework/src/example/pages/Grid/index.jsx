import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Card, Grid, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const itemStyle = {
  border: `solid ${transformSize(1)} #999999`,
  background: '#f5f5f5',
  textAlign: 'center',
  color: '#999999',
  height: '100%',
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Grid',
    name: '宫格布局',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="基础用法" style={style} headerStyle={cardHeaderStyle}>
          <Grid columns={3} gap={8}>
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
        </Card>

        <Card
          header="控制格子的跨度"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Grid columns={3} gap={8}>
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
        </Card>
      </Space>
    );
  };
}
