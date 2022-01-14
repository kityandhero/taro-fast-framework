import { View } from '@tarojs/components';

import {
  BlockArea,
  AdvanceSwitch,
} from 'taro-fast-component/es/customComponents';

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
        <BlockArea title="基础用法">
          <AdvanceSwitch />
        </BlockArea>

        <BlockArea title="颜色">
          <AdvanceSwitch color="blue" />
        </BlockArea>

        <BlockArea title="不可用">
          <AdvanceSwitch disabled />
        </BlockArea>

        <BlockArea title="受控组件">
          <AdvanceSwitch
            checked={checked}
            onChange={(value) => {
              this.setChecked(value);
            }}
          />
        </BlockArea>

        <BlockArea title="有默认值">
          <AdvanceSwitch checked />
        </BlockArea>

        <BlockArea title="Label">
          <AdvanceSwitch label="二次校验开关" />
        </BlockArea>

        <BlockArea title="Required">
          <AdvanceSwitch label="二次校验开关" required />
        </BlockArea>

        <BlockArea title="labelStyle">
          <AdvanceSwitch label="二次校验开关" labelStyle={{ color: 'red' }} />
        </BlockArea>
      </View>
    );
  }
}
