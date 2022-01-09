import { View, Text } from '@tarojs/components';

import {
  Space,
  BlockArea,
  Button,
  Icon,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

const { IconSearch } = Icon;

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="不同颜色的按钮">
          <Space wrap>
            <Button
              onClick={() => {
                alert('hello.');
              }}
            >
              Default
            </Button>
            <Button color="primary">Primary</Button>
            <Button color="success">Success</Button>
            <Button color="danger">Danger</Button>
            <Button color="warning">Warning</Button>
          </Space>
        </BlockArea>

        <BlockArea title="块级按钮">
          <Button block color="primary" size="large">
            Block Button
          </Button>
        </BlockArea>

        <BlockArea title="填充模式">
          <Space wrap>
            <Button color="primary" fill="solid">
              Solid
            </Button>
            <Button color="primary" fill="outline">
              Outline
            </Button>
            <Button color="primary" fill="none">
              None
            </Button>
          </Space>
        </BlockArea>

        <BlockArea title="不同大小的按钮">
          <Space wrap align="center">
            <Button size="mini" color="primary">
              Mini
            </Button>
            <Button size="small" color="primary">
              Small
            </Button>
            <Button size="middle" color="primary">
              Middle
            </Button>
            <Button size="large" color="primary">
              Large
            </Button>
          </Space>
        </BlockArea>

        <BlockArea title="禁用状态">
          <Space wrap>
            <Button disabled>Disabled</Button>
            <Button disabled color="primary">
              Disabled
            </Button>
          </Space>
        </BlockArea>

        <BlockArea title="加载状态">
          <Space wrap>
            <Button loading color="primary" loadingText="加载中">
              Loading
            </Button>
            <Button loading>Loading</Button>
          </Space>
        </BlockArea>

        <BlockArea title="带图标的按钮">
          <Button>
            <Space>
              <IconSearch size={19} />
              <Text >搜索</Text>
            </Space>
          </Button>
        </BlockArea>

        <BlockArea title="不同类型圆角">
          <Space wrap>
            <Button shape="default" color="primary">
              Default Button
            </Button>
            <Button block shape="rounded" color="primary">
              Rounded Button
            </Button>
            <Button block shape="rectangular" color="primary">
              Rectangular Button
            </Button>
          </Space>
        </BlockArea>
      </View>
    );
  }
}
