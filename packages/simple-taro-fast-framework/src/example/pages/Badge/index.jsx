import { View } from '@tarojs/components';

import {
  Space,
  Card,
  Avatar,
  Badge,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="Badge Wrapper" headerStyle={cardHeaderStyle}>
          <Space wrap style={{ '--gap': 'val(--tfc-px-24)' }}>
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
              content={Badge.dot}
              style={{ '--right': '100%', '--top': '100%' }}
            >
              <Avatar text="图" />
            </Badge>

            <Badge
              color="#87d068"
              content={Badge.dot}
              style={{ '--right': '100%' }}
            >
              <Avatar text="图" />
            </Badge>

            <Badge content={Badge.dot}>
              <Avatar text="图" />
            </Badge>

            <Badge
              color="orange"
              content={Badge.dot}
              style={{ '--top': '100%' }}
            >
              <Avatar text="图" />
            </Badge>
          </Space>
        </Card>

        <Card header="Badge Only" headerStyle={cardHeaderStyle}>
          <Space style={{ '--gap': 'val(--tfc-px-24)' }}>
            <Badge content="99+" />

            <Badge content="新消息!" />
          </Space>
        </Card>
      </View>
    );
  }
}
