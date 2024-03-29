import { connect } from 'easy-soft-dva';
import {
  showSimpleErrorMessage,
  showSimpleInfoMessage,
  showSimpleOpenMessage,
  showSimpleRuntimeError,
  showSimpleSuccessMessage,
  showSimpleWarnMessage,
} from 'easy-soft-utility';

import { Button, Space } from 'taro-fast-component';

import { ContentPageBase, SimpleBox } from '../../../customComponents';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '消息提示',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Message',
    name: '消息',
    description: '消息提示',
  };

  handleClick = (type) => {
    this.notifyMessage({
      message: '消息提示',
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
                showSimpleOpenMessage('open message');
              }}
            >
              Open Message
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                showSimpleInfoMessage('Info Message');
              }}
            >
              Info Message
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                showSimpleSuccessMessage('Success Message');
              }}
            >
              Success Message
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                showSimpleWarnMessage('Warn Message');
              }}
            >
              Warn Message
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                showSimpleErrorMessage('Error Message');
              }}
            >
              Error Message
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                showSimpleRuntimeError('Runtime Error Message');
              }}
            >
              Runtime Error Message
            </Button>
          </Space>
        </SimpleBox>
      </Space>
    );
  };
}
