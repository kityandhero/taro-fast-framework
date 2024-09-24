import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { connect } from 'easy-soft-dva';
import { logConfig } from 'easy-soft-utility';

import { ActionSheet, Button, Card, Space } from 'taro-fast-component';

import { ContentPageBase } from '../../../customComponents';
import { cardHeaderStyle, cardStyle } from '../../../customConfig';

import { ActionSheetExtraSimple } from './ActionSheetExtraSimple';

const style = {
  backgroundColor: '#f5f7fa',
  ...cardStyle,
};

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'ActionSheet',
    name: '动作面板',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      visible1: false,
      visible2: false,
      visible3: false,
    };
  }

  handleClick = (type) => {
    this.setState({
      [`visible${type}`]: true,
    });
  };

  handleClose = (name) => {
    this.setState({
      [`visible${name}`]: false,
    });

    Taro.showToast({
      title: `第 ${name} 个Action Sheet已经关闭`,
      icon: 'none',
    });
  };

  handleCancel = () => {
    this.showToast('点击了取消按钮');
  };

  showToast = (name) => {
    Taro.showToast({
      icon: 'none',
      title: name,
    });
  };

  renderContent = () => {
    const { visible1, visible2, visible3 } = this.state;

    return (
      <View className="index">
        <Card header="打开面板" style={style} headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <Button
              block
              size="large"
              onClick={() => {
                this.handleClick(1);
              }}
            >
              打开 ActionSheet
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                this.handleClick(2);
              }}
            >
              打开 ActionSheet 含标题
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                this.handleClick(3);
              }}
            >
              打开 ActionSheet 自定义选项
            </Button>

            <Button
              block
              size="large"
              onClick={() => {
                ActionSheetExtraSimple.open();
              }}
            >
              打开 ActionSheetExtraSimple
            </Button>
          </Space>
        </Card>

        <ActionSheet
          cancelText="取消"
          visible={visible1}
          options={[
            {
              content: '按钮一',
              onClick: (v) => {
                logConfig(v, '按钮一');

                this.showToast('点击了按钮一');
              },
            },
            {
              content: '按钮二',
              onClick: (v) => {
                logConfig(v, '按钮二');

                this.showToast('点击了按钮二');
              },
            },
          ]}
          onClose={() => {
            this.handleClose(1);
          }}
        />

        <ActionSheet
          cancelText="取消"
          visible={visible2}
          onClose={() => {
            this.handleClose(2);
          }}
          title="清除位置信息后， 别人将不能查看到你"
          options={[
            {
              content: '按钮一',
              onClick: (v) => {
                logConfig(v, '按钮一');

                this.showToast('点击了按钮一');
              },
            },
            {
              content: '按钮二',
              onClick: (v) => {
                logConfig(v, '按钮二');

                this.showToast('点击了按钮二');
              },
            },
            {
              content: '按钮三',
              onClick: (v) => {
                logConfig(v, '按钮三');

                this.showToast('点击了按钮三');
              },
            },
          ]}
        />

        <ActionSheet
          cancelText="取消"
          visible={visible3}
          onCancel={this.handleCancel}
          onClose={() => {
            this.handleClose(3);
          }}
          title="清除位置信息后， 别人将不能查看到你"
          options={[
            {
              value: 'one',
              content: '按钮一',
            },
            {
              value: 'two',
              content: '按钮二',
            },
            {
              value: 'three',
              content: (
                <Text className="danger" userSelect>
                  清除位置信息并退出
                </Text>
              ),
            },
          ]}
        />

        <ActionSheetExtraSimple
          options={[
            {
              value: 'one',
              content: '按钮一',
            },
            {
              value: 'two',
              content: '按钮二',
            },
            {
              value: 'three',
              content: (
                <Text className="danger" userSelect>
                  清除位置信息并退出
                </Text>
              ),
            },
          ]}
          // eslint-disable-next-line no-unused-vars
          afterOption={(v, o, event) => {
            console.log(v);
          }}
        />
      </View>
    );
  };
}
