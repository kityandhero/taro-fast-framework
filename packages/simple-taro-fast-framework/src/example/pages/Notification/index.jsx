import { View } from '@tarojs/components';

import { Card, Space, Button } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  renderFurther() {
    return (
      <View className="index">
        <Card header="块级按钮">
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
      </View>
    );
  }
}
