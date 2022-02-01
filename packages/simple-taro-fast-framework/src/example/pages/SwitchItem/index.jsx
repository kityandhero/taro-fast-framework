import { View } from '@tarojs/components';

import { connect } from 'react-redux';

import {
  Card,
  SwitchItem,
  Icon,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSketch } = Icon;

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends PageWrapper {
  getApiData = (props) => {
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
    const { checked } = this.state;

    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="基础用法" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem label="开关" />
          </Card>

          <Card header="异步调用" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem label="开关" onChange={this.changeStatus} />
          </Card>

          <Card
            header="异步调用前确认"
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <SwitchItem
              label="开关"
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

          <Card header="颜色" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem label="开关" color="green" />
          </Card>

          <Card header="隐藏状态" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem label="开关" hidden />
          </Card>

          <Card header="不可用" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem label="开关" disabled />
            <SwitchItem label="开关" checked disabled />
          </Card>

          <Card header="大小" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem label="开关" size={1.5} />
          </Card>

          <Card header="内嵌文字" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem
              label="二次校验开关"
              checkedText="开"
              uncheckedText="关"
            />
            <SwitchItem
              label="二次校验开关"
              checkedText="1"
              uncheckedText="0"
            />
            <SwitchItem
              label="二次校验开关"
              labelStyle={{ color: 'red' }}
              checkedText="✔"
              uncheckedText="✘"
            />
          </Card>

          <Card header="复杂配置" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem
              prefix={<IconSketch size={36} />}
              title="这里是标题"
              label="开关"
              description="管理已授权的产品和设备"
              confirm
              checked={checked}
              onChange={this.changeStatus}
              afterChange={(value) => {
                this.bannerNotify({
                  message: `状态已更改为:${value}`,
                });
              }}
            />
          </Card>
        </Space>
      </View>
    );
  }
}
