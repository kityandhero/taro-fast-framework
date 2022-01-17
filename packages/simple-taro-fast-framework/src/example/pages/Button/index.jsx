import { View, Text } from '@tarojs/components';

import {
  Space,
  Card,
  Button,
  Icon,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSearch } = Icon;

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="不同颜色的按钮">
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
        </Card>

        <Card header="块级按钮">
          <Button block color="primary" size="large">
            Block Button
          </Button>
        </Card>

        <Card header="填充模式">
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
        </Card>

        <Card header="不同大小的按钮">
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
        </Card>

        <Card header="禁用状态">
          <Space wrap>
            <Button disabled>Disabled</Button>
            <Button disabled color="primary">
              Disabled
            </Button>
          </Space>
        </Card>

        <Card header="加载状态">
          <Space wrap>
            <Button loading color="primary" loadingText="加载中">
              Loading
            </Button>
            <Button loading>Loading</Button>
          </Space>
        </Card>

        <Card header="带图标的按钮">
          <Button>
            <Space>
              <IconSearch size={19} />
              <Text>搜索</Text>
            </Space>
          </Button>
        </Card>

        <Card header="不同类型圆角">
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
        </Card>
      </View>
    );
  }
}
