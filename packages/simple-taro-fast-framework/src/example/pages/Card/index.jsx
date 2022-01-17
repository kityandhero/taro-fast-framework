import { View } from '@tarojs/components';

import {
  Card,
  Item,
  ColorText,
  Icon,
  Button,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconEdit } = Icon;

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index" style={{ backgroundColor: '#453e21' }}>
        <Card
          header="基础用法"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
        </Card>

        <Card
          header="扩展"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra={<Button size="mini">扩展</Button>}
        >
          <Item arrow>条目1</Item>
          <Item arrow>条目2</Item>
          <Item arrow>条目3</Item>
        </Card>

        <Card
          mode="card"
          header="卡片模式"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item title="这里是标题">这里是主信息</Item>
          <Item title="这里是标题">这里是主信息</Item>
        </Card>

        <Card
          header={
            <ColorText
              icon={<IconEdit size={16} color="#ff3ce7" />}
              text="附带图标"
            />
          }
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra={<Button size="mini">扩展</Button>}
        >
          <Item arrow>条目1</Item>
          <Item arrow>条目2</Item>
          <Item arrow>条目3</Item>
        </Card>
      </View>
    );
  }
}
