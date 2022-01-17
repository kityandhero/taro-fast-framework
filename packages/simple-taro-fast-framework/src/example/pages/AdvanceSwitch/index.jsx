import { View } from '@tarojs/components';

import { Card, AdvanceSwitch } from 'taro-fast-component/es/customComponents';

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
    this.setState({
      checked: value,
    });
  };

  renderFurther() {
    const { checked } = this.state;

    return (
      <View className="index">
        <Card header="基础用法">
          <AdvanceSwitch />
        </Card>

        <Card header="颜色">
          <AdvanceSwitch color="blue" />
        </Card>

        <Card header="不可用">
          <AdvanceSwitch disabled />
        </Card>

        <Card header="受控组件">
          <AdvanceSwitch
            checked={checked}
            onChange={(value) => {
              this.setChecked(value);
            }}
          />
        </Card>

        <Card header="有默认值">
          <AdvanceSwitch checked />
        </Card>

        <Card header="Label">
          <AdvanceSwitch label="二次校验开关" />
        </Card>

        <Card header="Required">
          <AdvanceSwitch label="二次校验开关" required />
        </Card>

        <Card header="labelStyle">
          <AdvanceSwitch label="二次校验开关" labelStyle={{ color: 'red' }} />
        </Card>
      </View>
    );
  }
}
