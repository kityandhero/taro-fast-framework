import { View } from '@tarojs/components';

import { AdvanceInput, Card } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        value: '',
      },
    };
  }

  afterChange = (v) => {
    this.setState({
      value: v,
    });
  };

  renderFurther() {
    const { value } = this.state;

    return (
      <View className="index" headerStyle={cardHeaderStyle}>
        <Card header="基础" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput value={value} onChange={this.afterChange} />
        </Card>

        <Card header="Label" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            value={value}
            label="用户名"
            onChange={this.afterChange}
          />
          <AdvanceInput
            value={value}
            label="密码"
            onChange={this.afterChange}
          />
          <AdvanceInput
            value={value}
            label="手机号"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Required" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            value={value}
            label="用户名"
            required
            onChange={this.afterChange}
          />
        </Card>

        <Card header="labelStyle" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            label="用户名"
            value={value}
            labelStyle={{ color: 'red' }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Align Right" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            label="用户名"
            value={value}
            align="right"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Clearable" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            value={value}
            label="用户名"
            clearable
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Hidden" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            value={value}
            label="用户名"
            hidden
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Extra" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            label="用户名"
            value={value}
            extra="扩展部分"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Password" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            value={value}
            password
            label="密码"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="placeholder" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            label="用户名"
            value={value}
            placeholder="请输入用户名"
            onChange={this.afterChange}
          />
        </Card>

        <Card
          header="placeholderStyle"
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <AdvanceInput
            placeholder="请输入用户名"
            value={value}
            placeholderStyle={{ color: '#45e325' }}
            label="用户名"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="disabled" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            label="用户名"
            value={value}
            placeholder="请输入用户名"
            disabled
            onChange={this.afterChange}
          />
        </Card>

        <Card header="maxlength" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            label="用户名"
            value={value}
            maxlength={5}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="confirmType" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            label="用户名"
            value={value}
            confirmType="go"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onChange" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            value={value}
            label="用户名"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onFocus" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            label="用户名"
            value={value}
            onFocus={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onBlur" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            label="用户名"
            value={value}
            onBlur={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onConfirm" headerStyle={cardHeaderStyle} space={false}>
          <AdvanceInput
            label="用户名"
            value={value}
            onConfirm={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>

        <Card
          header="onKeyboardHeightChange"
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <AdvanceInput
            label="用户名"
            value={value}
            onKeyboardHeightChange={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>
      </View>
    );
  }
}
