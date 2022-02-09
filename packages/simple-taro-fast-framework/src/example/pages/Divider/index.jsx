import { View, Text } from '@tarojs/components';

import {
  Card,
  Divider,
  Space,
  Icon,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const { IconSearch } = Icon;
const { buildDivider } = Divider;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Divider',
    name: '间隔线',
  };

  renderContent = () => {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="默认水平模式"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Divider />
          </Card>

          <Card
            header="带内容的分割线"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Divider>默认内容在中间</Divider>
            <Divider contentPosition="left">左侧内容</Divider>
            <Divider contentPosition="right">右侧内容</Divider>
          </Card>

          <Card header="定义线颜色" style={style} headerStyle={cardHeaderStyle}>
            <Divider lineColor="#1677ff">内容</Divider>
          </Card>

          <Card header="定义线类型" style={style} headerStyle={cardHeaderStyle}>
            <Divider lineStyle="dashed">内容</Divider>
          </Card>

          <Card header="定义线宽度" style={style} headerStyle={cardHeaderStyle}>
            <Divider lineWidth={20}>内容</Divider>
          </Card>

          <Card
            header="定义上下间距"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Divider margin={10}>内容</Divider>
          </Card>

          <Card
            header="定义内容高度"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Divider height={60}>内容</Divider>
          </Card>

          <Card header="附带图标" style={style} headerStyle={cardHeaderStyle}>
            <Divider
              style={{
                color: '#1677ff',
                borderColor: '#1677ff',
                borderStyle: 'dashed',
              }}
            >
              <Space>
                <IconSearch size={32} />
                <Text>搜索</Text>
              </Space>
            </Divider>
          </Card>

          <Card
            header="buildDivider"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            {buildDivider({
              contentPosition: 'left',
              style: {
                color: '#1677ff',
                borderColor: '#1677ff',
                borderStyle: 'dashed',
              },
              icon: <IconSearch size={32} />,
              text: '搜索',
            })}
          </Card>
        </Space>
      </View>
    );
  };
}
