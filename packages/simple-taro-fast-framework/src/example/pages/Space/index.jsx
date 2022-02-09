import { View } from '@tarojs/components';

import {
  Card,
  Space,
  Button,
  VerticalBox,
  Line,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

import './index.less';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Space',
    name: '间隔布局',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="基本用法" style={style} headerStyle={cardHeaderStyle}>
          <Space>
            {new Array(4).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </Card>

        <Card header="设定间隔" style={style} headerStyle={cardHeaderStyle}>
          <Space size={24}>
            {new Array(3).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </Card>

        <Card header="设定双向间隔" style={style} headerStyle={cardHeaderStyle}>
          <Space size={[8, 26]} wrap>
            {new Array(8).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </Card>

        <Card header="设置方向" style={style} headerStyle={cardHeaderStyle}>
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

        <Card header="自动换行" style={style} headerStyle={cardHeaderStyle}>
          <Space size={[8, 16]} wrap>
            {new Array(20).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </Card>

        <Card header="垂直模式" style={style} headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            {new Array(3).fill(null).map((_, index) => (
              <Button key={index} block color="primary" size="large">
                Button
              </Button>
            ))}
          </Space>
        </Card>

        <Card header="自定义间隔" style={style} headerStyle={cardHeaderStyle}>
          <Space split={<Line direction="vertical" width={2} height={40} />}>
            {new Array(3).fill(null).map((_, index) => (
              <Button key={index}>Button</Button>
            ))}
          </Space>
        </Card>
      </Space>
    );
  };
}
