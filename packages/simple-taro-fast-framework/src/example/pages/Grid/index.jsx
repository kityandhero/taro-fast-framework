import { View } from '@tarojs/components';

import { BlockArea, Grid } from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

const styles = {
  border: 'solid 1px #999999',
  background: '#f5f5f5',
  textAlign: 'center',
  color: '#999999',
  height: '100%',
};

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="基础用法">
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
        </BlockArea>

        <BlockArea title="控制格子的跨度">
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
        </BlockArea>
      </View>
    );
  }
}
