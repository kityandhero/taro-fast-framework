import { View } from '@tarojs/components';

import { Card, Switch, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

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
    console.log(value);

    this.setState({
      checked: value,
    });
  };

  renderFurther() {
    const { checked } = this.state;

    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="基础用法" headerStyle={cardHeaderStyle}>
            <Switch
              checked={checked}
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card header="颜色" headerStyle={cardHeaderStyle}>
            <Switch
              color="green"
              checked={checked}
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card header="隐藏" headerStyle={cardHeaderStyle}>
            <Switch
              hidden
              checked={checked}
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card header="不可用" headerStyle={cardHeaderStyle}>
            <Space>
              <Switch
                disabled
                onChange={(value) => {
                  this.setChecked(value);
                }}
              />
              <Switch
                disabled
                checked
                onChange={(value) => {
                  this.setChecked(value);
                }}
              />
            </Space>
          </Card>

          <Card header="加载中/处理中" headerStyle={cardHeaderStyle}>
            <Space>
              <Switch
                loading
                onChange={(value) => {
                  this.setChecked(value);
                }}
              />
              <Switch
                loading
                checked
                onChange={(value) => {
                  this.setChecked(value);
                }}
              />
            </Space>
          </Card>

          <Card header="大小" headerStyle={cardHeaderStyle}>
            <Switch
              size={1.5}
              checked={checked}
              onChange={(value) => {
                this.setChecked(value);
              }}
            />
          </Card>

          <Card header="内嵌文字" headerStyle={cardHeaderStyle}>
            <Space>
              <Switch
                checked={checked}
                checkedText="开"
                uncheckedText="关"
                onChange={(value) => {
                  this.setChecked(value);
                }}
              />
              <Switch
                checked={checked}
                checkedText="1"
                uncheckedText="0"
                onChange={(value) => {
                  this.setChecked(value);
                }}
              />
              <Switch
                checked={checked}
                checkedText="✔"
                uncheckedText="✘"
                onChange={(value) => {
                  this.setChecked(value);
                }}
              />
            </Space>
          </Card>
        </Space>
      </View>
    );
  }
}
