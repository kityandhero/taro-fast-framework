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
          header="默认布局"
          style={style}
          headerStyle={cardHeaderStyle}
          footer="这里是底部内容"
        >
          这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域,这是内容区域
        </Card>

        <Card
          header="通栏视图"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item label="1" />
          <Item label="2" />
          <Item label="3" />
        </Card>

        <Card
          header="扩展"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra={<Button size="mini">扩展</Button>}
        >
          <Item label="条目1" arrow />
          <Item label="条目2" arrow />
          <Item label="条目3" arrow />
        </Card>

        <Card
          mode="card"
          header="卡片模式"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item title="这里是标题" label="这里是主信息" />
          <Item title="这里是标题" label="这里是主信息" />
        </Card>

        <Card
          header={
            <ColorText
              icon={<IconEdit size={32} color="#ff3ce7" />}
              text="附带图标"
            />
          }
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
          extra={<Button size="mini">扩展</Button>}
        >
          <Item label="条目1" arrow />
          <Item label="条目2" arrow />
          <Item label="条目3" arrow />
        </Card>
      </View>
    );
  }
}
