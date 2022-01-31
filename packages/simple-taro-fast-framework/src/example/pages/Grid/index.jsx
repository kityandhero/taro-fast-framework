import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Card, Grid, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const styles = {
  border: `solid ${transformSize(1)} #999999`,
  background: '#f5f5f5',
  textAlign: 'center',
  color: '#999999',
  height: '100%',
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="基础用法" headerStyle={cardHeaderStyle}>
            <Grid columns={3} gap={8}>
              <Grid.Item>
                <View style={styles}>A</View>
              </Grid.Item>
              <Grid.Item>
                <View style={styles}>B</View>
              </Grid.Item>
              <Grid.Item>
                <View style={styles}>C</View>
              </Grid.Item>
              <Grid.Item>
                <View style={styles}>D</View>
              </Grid.Item>
              <Grid.Item>
                <View style={styles}>E</View>
              </Grid.Item>
            </Grid>
          </Card>

          <Card header="控制格子的跨度" headerStyle={cardHeaderStyle}>
            <Grid columns={3} gap={8}>
              <Grid.Item>
                <View style={styles}>A</View>
              </Grid.Item>
              <Grid.Item span={2}>
                <View style={styles}>B</View>
              </Grid.Item>
              <Grid.Item span={2}>
                <View style={styles}>C</View>
              </Grid.Item>
              <Grid.Item>
                <View style={styles}>D</View>
              </Grid.Item>
              <Grid.Item span={3}>
                <View style={styles}>E</View>
              </Grid.Item>
            </Grid>
          </Card>
        </Space>
      </View>
    );
  }
}
