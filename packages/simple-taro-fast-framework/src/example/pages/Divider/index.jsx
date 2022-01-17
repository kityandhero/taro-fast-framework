import { View, Text } from '@tarojs/components';

import {
  Card,
  Divider,
  Space,
  Icon,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSearch } = Icon;
const { buildDivider } = Divider;

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="基础分割线" headerStyle={cardHeaderStyle}>
          <Divider />
        </Card>

        <Card header="带内容的分割线" headerStyle={cardHeaderStyle}>
          <Divider>默认内容在中间</Divider>
          <Divider contentPosition="left">左侧内容</Divider>
          <Divider contentPosition="right">右侧内容</Divider>
        </Card>

        <Card header="自定义样式" headerStyle={cardHeaderStyle}>
          <Divider
            style={{
              color: '#1677ff',
              borderColor: '#1677ff',
              borderStyle: 'dashed',
            }}
          >
            自定义样式
          </Divider>
        </Card>

        <Card header="图标" headerStyle={cardHeaderStyle}>
          <Divider
            style={{
              color: '#1677ff',
              borderColor: '#1677ff',
              borderStyle: 'dashed',
            }}
          >
            <Space>
              <IconSearch size={16} />
              <Text>搜索</Text>
            </Space>
          </Divider>
        </Card>

        <Card header="buildDivider" headerStyle={cardHeaderStyle}>
          {buildDivider({
            contentPosition: 'left',
            style: {
              color: '#1677ff',
              borderColor: '#1677ff',
              borderStyle: 'dashed',
            },
            icon: <IconSearch size={16} />,
            text: '搜索',
          })}
        </Card>
      </View>
    );
  }
}
