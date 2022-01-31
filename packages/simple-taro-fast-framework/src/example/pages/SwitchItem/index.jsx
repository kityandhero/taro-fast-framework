import { View } from '@tarojs/components';

import {
  Card,
  SwitchItem,
  Icon,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSketch } = Icon;

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        checked: false,
      },
    };
  }

  setChecked = (value) => {
    this.setState({
      checked: value,
    });
  };

  renderFurther() {
    const { checked } = this.state;

    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="基础用法" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem
              label="开关"
              checked={checked}
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card header="颜色" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem
              label="开关"
              color="green"
              checked={checked}
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card header="隐藏" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem
              label="开关"
              hidden
              checked={checked}
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card header="不可用" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem
              label="开关"
              disabled
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
            <SwitchItem
              label="开关"
              checked
              disabled
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card
            header="加载中/处理中"
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <SwitchItem
              label="开关"
              loading
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
            <SwitchItem
              label="开关"
              loading
              checked
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card header="大小" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem
              label="开关"
              size={1.5}
              checked={checked}
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card header="内嵌文字" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem
              label="二次校验开关"
              checked={checked}
              checkedText="开"
              uncheckedText="关"
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
            <SwitchItem
              label="二次校验开关"
              checked={checked}
              checkedText="1"
              uncheckedText="0"
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
            <SwitchItem
              label="二次校验开关"
              labelStyle={{ color: 'red' }}
              checked={checked}
              checkedText="✔"
              uncheckedText="✘"
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card header="复杂配置" headerStyle={cardHeaderStyle} space={false}>
            <SwitchItem
              prefix={<IconSketch size={36} />}
              title="这里是标题"
              label="开关"
              description="管理已授权的产品和设备"
              checked={checked}
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>
        </Space>
      </View>
    );
  }
}
