import { View } from '@tarojs/components';

import { Card, Space, Button } from 'taro-fast-component/es/customComponents';

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
    id: 'Notification',
    name: '通知',
  };

  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  renderContent = () => {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="触发通知" style={style} headerStyle={cardHeaderStyle}>
            <Space direction="vertical" fillWidth>
              <Button
                block
                size="large"
                onClick={() => {
                  this.handleClick();
                }}
              >
                普通消息
              </Button>

              <Button
                block
                size="large"
                onClick={() => {
                  this.handleClick('success');
                }}
              >
                成功消息
              </Button>

              <Button
                block
                size="large"
                onClick={() => {
                  this.handleClick('error');
                }}
              >
                错误消息
              </Button>

              <Button
                block
                size="large"
                onClick={() => {
                  this.handleClick('warning');
                }}
              >
                警告消息
              </Button>
            </Space>
          </Card>
        </Space>
      </View>
    );
  };
}
