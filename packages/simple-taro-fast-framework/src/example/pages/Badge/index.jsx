import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Space,
  Card,
  Avatar,
  Badge,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Badge',
    name: '徽记',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="包裹模式" style={style} headerStyle={cardHeaderStyle}>
          <Space wrap style={{ '--gap': transformSize(24) }}>
            <Badge content="5">
              <Avatar text="图" />
            </Badge>
            <Badge content="新">
              <Avatar text="图" />
            </Badge>
            <Badge content="更新啦">
              <Avatar text="图" />
            </Badge>

            <Badge
              color="#108ee9"
              dot
              style={{ '--right': '100%', '--top': '100%' }}
            >
              <Avatar text="图" />
            </Badge>

            <Badge color="#87d068" dot style={{ '--right': '100%' }}>
              <Avatar text="图" />
            </Badge>

            <Badge dot>
              <Avatar text="图" />
            </Badge>

            <Badge color="orange" dot style={{ '--top': '100%' }}>
              <Avatar text="图" />
            </Badge>
          </Space>
        </Card>

        <Card header="单独使用" style={style} headerStyle={cardHeaderStyle}>
          <Space style={{ '--gap': transformSize(24) }}>
            <Badge content="99+" />

            <Badge content="新消息!" />
          </Space>
        </Card>
      </Space>
    );
  };
}
