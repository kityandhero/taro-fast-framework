import { Text } from '@tarojs/components';

import {
  Space,
  Card,
  Button,
  Icon,
  Divider,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const { IconSearch } = Icon;

const colorList = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'cyan',
  'blue',
  'purple',
  'mauve',
  'pink',
  'brown',
  'grey',
  'gray',
  'black',
];

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Button',
    name: '按钮',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="普通按钮模式" style={style} headerStyle={cardHeaderStyle}>
          <Space wrap>
            <Button>普通按钮</Button>
          </Space>
        </Card>

        <Card header="微信按钮模式" style={style} headerStyle={cardHeaderStyle}>
          <Space wrap>
            <Button weappButton>微信按钮</Button>
          </Space>
        </Card>

        <Card
          header="内置颜色 附带阴影"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Space wrap size={16}>
            {colorList.map((o, i) => {
              return (
                <Button key={`${i}`} backgroundColor={o} fill="solid">
                  {o}
                </Button>
              );
            })}
          </Space>

          <Divider>微信按钮</Divider>

          <Space wrap size={16}>
            {colorList.map((o, i) => {
              return (
                <Button
                  key={`${i}`}
                  weappButton
                  backgroundColor={o}
                  fill="solid"
                >
                  {o}
                </Button>
              );
            })}
          </Space>
        </Card>

        <Card header="渐变色" style={style} headerStyle={cardHeaderStyle}>
          <Space wrap size={16}>
            <Button backgroundColor={['#f43f3b', ' #ec008c']}>
              gradual-red
            </Button>
            <Button backgroundColor={['#ff9700', ' #ed1c24']}>
              gradual-orange
            </Button>
            <Button backgroundColor={['#39b54a', ' #8dc63f']}>
              yellow-green
            </Button>
            <Button backgroundColor={['#9000ff', ' #5e00ff']}>
              olive-purple
            </Button>
            <Button backgroundColor={['#ec008c', ' #6739b6']}>
              gradual-pink
            </Button>
            <Button backgroundColor={['#0081ff', ' #1cbbb4']}>
              gradual-blue
            </Button>
          </Space>

          <Divider>微信按钮</Divider>

          <Space wrap size={16}>
            <Button weappButton backgroundColor={['#f43f3b', ' #ec008c']}>
              gradual-red
            </Button>
            <Button weappButton backgroundColor={['#ff9700', ' #ed1c24']}>
              gradual-orange
            </Button>
            <Button weappButton backgroundColor={['#39b54a', ' #8dc63f']}>
              yellow-green
            </Button>
            <Button weappButton backgroundColor={['#9000ff', ' #5e00ff']}>
              olive-purple
            </Button>
            <Button weappButton backgroundColor={['#ec008c', ' #6739b6']}>
              gradual-pink
            </Button>
            <Button weappButton backgroundColor={['#0081ff', ' #1cbbb4']}>
              gradual-blue
            </Button>
          </Space>
        </Card>

        <Card header="自定义颜色" style={style} headerStyle={cardHeaderStyle}>
          <Space wrap>
            <Button backgroundColor="#45e209">Solid</Button>
            <Button backgroundColor="#99a2a9">Outline</Button>
            <Button backgroundColor="#a5ee0f">None</Button>
          </Space>

          <Divider>微信按钮</Divider>

          <Space wrap>
            <Button weappButton backgroundColor="#45e209">
              Solid
            </Button>
            <Button weappButton backgroundColor="#99a2a9">
              Outline
            </Button>
            <Button weappButton backgroundColor="#a5ee0f">
              None
            </Button>
          </Space>
        </Card>

        <Card
          header="不同的填充模式"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Space wrap>
            <Button backgroundColor="blue" fill="solid">
              Solid
            </Button>
            <Button backgroundColor="blue" fill="outline">
              Outline
            </Button>
            <Button backgroundColor="blue" fill="none">
              None
            </Button>
          </Space>

          <Divider>微信按钮</Divider>

          <Space wrap>
            <Button weappButton backgroundColor="blue" fill="solid">
              Solid
            </Button>
            <Button weappButton backgroundColor="blue" fill="outline">
              Outline
            </Button>
            <Button weappButton backgroundColor="blue" fill="none">
              None
            </Button>
          </Space>
        </Card>

        <Card
          header="不同大小的按钮"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Space wrap align="center">
            <Button size="mini" backgroundColor="purple">
              Mini
            </Button>
            <Button size="small" backgroundColor="purple">
              Small
            </Button>
            <Button size="middle" backgroundColor="purple">
              Middle
            </Button>
            <Button size="large" backgroundColor="purple">
              Large
            </Button>
          </Space>

          <Divider>微信按钮</Divider>

          <Space wrap align="center">
            <Button weappButton size="mini" backgroundColor="purple">
              Mini
            </Button>
            <Button weappButton size="small" backgroundColor="purple">
              Small
            </Button>
            <Button weappButton size="middle" backgroundColor="purple">
              Middle
            </Button>
            <Button weappButton size="large" backgroundColor="purple">
              Large
            </Button>
          </Space>
        </Card>

        <Card header="块级按钮" style={style} headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <Button block size="mini">
              Block Button
            </Button>

            <Button block size="middle">
              Block Button
            </Button>

            <Button block size="large">
              Block Button
            </Button>
          </Space>

          <Divider>微信按钮</Divider>

          <Space direction="vertical" fillWidth>
            <Button weappButton block size="mini">
              Block Button
            </Button>

            <Button weappButton block size="middle">
              Block Button
            </Button>

            <Button weappButton block size="large">
              Block Button
            </Button>
          </Space>
        </Card>

        <Card header="禁用状态" style={style} headerStyle={cardHeaderStyle}>
          <Space wrap>
            <Button disabled>Disabled</Button>
            <Button disabled backgroundColor="blue">
              Disabled
            </Button>
          </Space>

          <Divider>微信按钮</Divider>

          <Space wrap>
            <Button weappButton disabled>
              Disabled
            </Button>
            <Button weappButton disabled backgroundColor="blue">
              Disabled
            </Button>
          </Space>
        </Card>

        <Card header="加载状态" style={style} headerStyle={cardHeaderStyle}>
          <Space wrap>
            <Button backgroundColor="blue" loading loadingText="加载中">
              Loading
            </Button>
            <Button
              backgroundColor="blue"
              loading
              loadingType="comet"
              loadingText="加载中"
            >
              Loading
            </Button>
            <Button loading loadingMode="overlay">
              Loading
            </Button>
            <Button loading loadingType="comet" loadingMode="overlay">
              Loading
            </Button>
            <Button loading>Loading</Button>
            <Button loading loadingType="comet">
              Loading
            </Button>
          </Space>

          <Divider>微信按钮</Divider>

          <Space wrap>
            <Button
              weappButton
              backgroundColor="blue"
              loading
              loadingText="加载中"
            >
              Loading
            </Button>
            <Button
              weappButton
              backgroundColor="blue"
              loading
              loadingType="comet"
              loadingText="加载中"
            >
              Loading
            </Button>
            <Button weappButton loading loadingMode="overlay">
              Loading
            </Button>
            <Button
              weappButton
              loading
              loadingType="comet"
              loadingMode="overlay"
            >
              Loading
            </Button>
            <Button weappButton loading>
              Loading
            </Button>
            <Button weappButton loading loadingType="comet">
              Loading
            </Button>
          </Space>
        </Card>

        <Card header="带图标的按钮" style={style} headerStyle={cardHeaderStyle}>
          <Button>
            <Space>
              <IconSearch size={38} />
              <Text>搜索</Text>
            </Space>
          </Button>

          <Divider>微信按钮</Divider>

          <Button weappButton>
            <Space>
              <IconSearch size={38} />
              <Text>搜索</Text>
            </Space>
          </Button>
        </Card>

        <Card header="不同类型圆角" style={style} headerStyle={cardHeaderStyle}>
          <Space wrap>
            <Button shape="default" backgroundColor="blue">
              Default Button
            </Button>
            <Button block shape="rounded" backgroundColor="olive">
              Rounded Button
            </Button>
            <Button block shape="rectangular" backgroundColor="pink">
              Rectangular Button
            </Button>
          </Space>

          <Divider>微信按钮</Divider>

          <Space wrap>
            <Button weappButton shape="default" backgroundColor="blue">
              Default Button
            </Button>
            <Button weappButton block shape="rounded" backgroundColor="olive">
              Rounded Button
            </Button>
            <Button
              weappButton
              block
              shape="rectangular"
              backgroundColor="pink"
            >
              Rectangular Button
            </Button>
          </Space>
        </Card>

        <Card header="自定义大小" style={style} headerStyle={cardHeaderStyle}>
          <Space wrap>
            <Button
              shape="default"
              backgroundColor="blue"
              paddingTop={20}
              paddingBottom={20}
              paddingLeft={20}
              paddingRight={20}
            >
              Default Button
            </Button>
            <Button
              block
              shape="rounded"
              backgroundColor="olive"
              paddingTop={20}
              paddingBottom={20}
              paddingLeft={20}
              paddingRight={20}
              borderRadius={3000}
            >
              Rounded Button
            </Button>
            <Button
              block
              shape="rectangular"
              backgroundColor="pink"
              paddingTop={20}
              paddingBottom={20}
              paddingLeft={20}
              paddingRight={20}
            >
              Rectangular Button
            </Button>
          </Space>

          <Divider>微信按钮</Divider>

          <Space wrap>
            <Button
              weappButton
              shape="default"
              backgroundColor="blue"
              paddingTop={20}
              paddingBottom={20}
              paddingLeft={20}
              paddingRight={20}
            >
              Default Button
            </Button>
            <Button
              weappButton
              block
              shape="rounded"
              backgroundColor="olive"
              paddingTop={20}
              paddingBottom={20}
              paddingLeft={20}
              paddingRight={20}
              borderRadius={3000}
            >
              Rounded Button
            </Button>
            <Button
              weappButton
              block
              shape="rectangular"
              backgroundColor="pink"
              paddingTop={20}
              paddingBottom={20}
              paddingLeft={20}
              paddingRight={20}
            >
              Rectangular Button
            </Button>
          </Space>
        </Card>
      </Space>
    );
  };
}
