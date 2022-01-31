import { View } from '@tarojs/components';

import {
  Card,
  Space,
  Button,
  VerticalBox,
  Line,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

import './index.less';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="基本用法" headerStyle={cardHeaderStyle}>
            <Space>
              {new Array(4).fill(null).map((_, index) => (
                <Button key={index}>Button</Button>
              ))}
            </Space>
          </Card>

          <Card header="设定间隔" headerStyle={cardHeaderStyle}>
            <Space size={24}>
              {new Array(3).fill(null).map((_, index) => (
                <Button key={index}>Button</Button>
              ))}
            </Space>
          </Card>

          <Card header="设定双向间隔" headerStyle={cardHeaderStyle}>
            <Space size={[8, 26]}>
              {new Array(4).fill(null).map((_, index) => (
                <Button key={index}>Button</Button>
              ))}
            </Space>
          </Card>

          <Card header="设置方向" headerStyle={cardHeaderStyle}>
            <VerticalBox>
              <Space direction="vertical" fillWidth>
                <View className="space-align-block">
                  <Space align="center">
                    center
                    <Button type="primary">Primary</Button>
                    <View className="mock-block">Block</View>
                  </Space>
                </View>
                <View className="space-align-block">
                  <Space align="start">
                    start
                    <Button type="primary">Primary</Button>
                    <View className="mock-block">Block</View>
                  </Space>
                </View>
                <View className="space-align-block">
                  <Space align="end">
                    end
                    <Button type="primary">Primary</Button>
                    <View className="mock-block">Block</View>
                  </Space>
                </View>
                <View className="space-align-block">
                  <Space align="baseline">
                    baseline
                    <Button type="primary">Primary</Button>
                    <View className="mock-block">Block</View>
                  </Space>
                </View>
              </Space>
            </VerticalBox>
          </Card>

          <Card header="自动换行" headerStyle={cardHeaderStyle}>
            <Space size={[8, 16]} wrap>
              {new Array(20).fill(null).map((_, index) => (
                <Button key={index}>Button</Button>
              ))}
            </Space>
          </Card>

          <Card header="垂直模式" headerStyle={cardHeaderStyle}>
            <Space direction="vertical" fillWidth>
              {new Array(3).fill(null).map((_, index) => (
                <Button key={index} block color="primary" size="large">
                  Button
                </Button>
              ))}
            </Space>
          </Card>

          <Card header="自定义间隔" headerStyle={cardHeaderStyle}>
            <Space split={<Line direction="vertical" width={2} height={40} />}>
              {new Array(3).fill(null).map((_, index) => (
                <Button key={index}>Button</Button>
              ))}
            </Space>
          </Card>
        </Space>
      </View>
    );
  }
}
