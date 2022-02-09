import {
  Card,
  Item,
  ColorText,
  Icon,
  Button,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const { IconEdit } = Icon;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Card',
    name: '卡片',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
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
          <Item label="3" border={false} />
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
          <Item label="条目3" arrow border={false} />
        </Card>

        <Card
          mode="card"
          header="卡片模式"
          style={{
            ...style,
            ...{
              borderBottom: '1rpx solid var(--tfc-border-color)',
            },
          }}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item title="这里是标题" label="这里是主信息" />
          <Item title="这里是标题" label="这里是主信息" border={false} />
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
          <Item label="条目3" arrow border={false} />
        </Card>
      </Space>
    );
  };
}
