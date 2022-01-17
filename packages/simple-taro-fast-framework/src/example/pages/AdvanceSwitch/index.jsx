import { View } from '@tarojs/components';

import { Card, AdvanceSwitch } from 'taro-fast-component/es/customComponents';

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
    this.setState({
      checked: value,
    });
  };

  renderFurther() {
    const { checked } = this.state;

    return (
      <View className="index">
        <Card header="基础用法" headerStyle={cardHeaderStyle}>
          <AdvanceSwitch />
        </Card>

        <Card header="颜色" headerStyle={cardHeaderStyle}>
          <AdvanceSwitch color="blue" />
        </Card>

        <Card header="不可用" headerStyle={cardHeaderStyle}>
          <AdvanceSwitch disabled />
        </Card>

        <Card header="受控组件" headerStyle={cardHeaderStyle}>
          <AdvanceSwitch
            checked={checked}
            onChange={(value) => {
              this.setChecked(value);
            }}
          />
        </Card>

        <Card header="有默认值" headerStyle={cardHeaderStyle}>
          <AdvanceSwitch checked />
        </Card>

        <Card header="Label" headerStyle={cardHeaderStyle}>
          <AdvanceSwitch label="二次校验开关" />
        </Card>

        <Card header="Required" headerStyle={cardHeaderStyle}>
          <AdvanceSwitch label="二次校验开关" required />
        </Card>

        <Card header="labelStyle" headerStyle={cardHeaderStyle}>
          <AdvanceSwitch label="二次校验开关" labelStyle={{ color: 'red' }} />
        </Card>
      </View>
    );
  }
}
