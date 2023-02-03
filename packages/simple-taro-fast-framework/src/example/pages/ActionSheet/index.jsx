import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { connect } from 'easy-soft-dva';

import { ActionSheet, Button, Card, Space } from 'taro-fast-component';

import { ContentPageBase } from '../../../customComponents';
import { cardHeaderStyle, cardStyle } from '../../../customConfig';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
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

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        visible1: false,
        visible2: false,
        visible3: false,
      },
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
          </Space>
        </Card>

        <ActionSheet
          cancelText="取消"
          visible={visible1}
          options={[
            {
              content: '按钮一',
              onClick: (v) => {
                console.log(v);
                this.showToast('点击了按钮一');
              },
            },
            {
              content: '按钮二',
              onClick: (v) => {
                console.log(v);
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
                console.log(v);
                this.showToast('点击了按钮一');
              },
            },
            {
              content: '按钮二',
              onClick: (v) => {
                console.log(v);
                this.showToast('点击了按钮二');
              },
            },
            {
              content: '按钮三',
              onClick: (v) => {
                console.log(v);
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
              content: '按钮一',
              onClick: (v) => {
                console.log(v);
                this.showToast('点击了按钮一');
              },
            },
            {
              content: '按钮二',
              onClick: (v) => {
                console.log(v);
                this.showToast('点击了按钮二');
              },
            },
            {
              content: (
                <Text className="danger" userSelect>
                  清除位置信息并退出
                </Text>
              ),
              onClick: (v, e) => {
                console.log({
                  value: v,
                  e,
                });
                this.showToast('成功清除位置');
              },
            },
          ]}
        />
      </View>
    );
  };
}
