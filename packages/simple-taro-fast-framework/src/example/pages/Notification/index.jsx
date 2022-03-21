import { Notification } from 'taro-fast-common/es/customComponents';
import { Space, Button } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';
import CodeBox from '../../../customComponents/CodeBox';

const config1 = {
  message: '通消息知',
  type: 'info',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '弹出通知',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Notification',
    name: '通知',
    description: '通知组件',
  };

  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="触发通知">
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
        </SimpleBox>

        <CodeBox
          config={config1}
          componentName="Notification"
          mockChildren={false}
          useInnerBox={false}
        />

        <PropertyBox config={Notification.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
