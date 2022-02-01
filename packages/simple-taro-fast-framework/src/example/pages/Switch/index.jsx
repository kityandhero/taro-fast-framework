import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { Card, Switch, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends PageWrapper {
  getApiData = (props) => {
    console.log(props);

    const {
      news: { data },
    } = props;

    return data;
  };

  changeStatus = (value) => {
    return this.remoteRequest({
      type: 'news/switchStatus',
      payload: { status: value },
    }).then(
      (
        {
          // data
        },
      ) => {
        // console.log(data);

        return true;
      },
    );
  };

  simulationChangeStatus = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(true);
        } catch (e) {
          reject(true);
        }
      }, 2000);
    });
  };

  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="基础用法" headerStyle={cardHeaderStyle}>
            <Switch />
          </Card>

          <Card header="异步调用" headerStyle={cardHeaderStyle}>
            <Switch onChange={this.changeStatus} />
          </Card>

          <Card header="异步调用前确认" headerStyle={cardHeaderStyle}>
            <Switch
              confirm={{
                title: '状态变更',
                content: '状态即将发生改变,确定吗?',
                confirmText: '确定',
                confirmColor: '',
                cancelText: '取消',
                cancelColor: '',
              }}
              onChange={this.simulationChangeStatus}
            />
          </Card>

          <Card header="自定义颜色" headerStyle={cardHeaderStyle}>
            <Switch color="green" />
          </Card>

          <Card header="隐藏模式" headerStyle={cardHeaderStyle}>
            <Switch hidden />
          </Card>

          <Card header="禁用模式" headerStyle={cardHeaderStyle}>
            <Space>
              <Switch disabled />

              <Switch disabled checked />
            </Space>
          </Card>

          <Card header="加载中/处理中" headerStyle={cardHeaderStyle}>
            <Space>
              <Switch loading />
              <Switch loading checked />
            </Space>
          </Card>

          <Card header="大小" headerStyle={cardHeaderStyle}>
            <Switch size={1.5} />
          </Card>

          <Card header="内嵌文字" headerStyle={cardHeaderStyle}>
            <Space>
              <Switch checkedText="开" uncheckedText="关" />
              <Switch checkedText="1" uncheckedText="0" />
              <Switch
                checkedText="✔"
                uncheckedText="✘"
                onChange={(value) => {
                  console.log(value);
                }}
              />
            </Space>
          </Card>

          <Card header="操作后回调" headerStyle={cardHeaderStyle}>
            <Space>
              <Switch checkedText="开" uncheckedText="关" />
              <Switch checkedText="1" uncheckedText="0" />
              <Switch
                afterChange={(value) => {
                  this.bannerNotify({
                    message: `状态已更改为:${value}`,
                  });
                }}
              />
            </Space>
          </Card>
        </Space>
      </View>
    );
  }
}
