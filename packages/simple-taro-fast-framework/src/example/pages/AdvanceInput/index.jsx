import { View } from '@tarojs/components';

import { AdvanceInput, Card } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  afterChange = (v) => {
    console.log(`input changed: ${v}`);
  };

  renderFurther() {
    return (
      <View className="index">
        <Card header="基础">
          <AdvanceInput onChange={this.afterChange} />
        </Card>

        <Card header="Label">
          <AdvanceInput label="用户名" onChange={this.afterChange} />
        </Card>

        <Card header="Required">
          <AdvanceInput label="用户名" required onChange={this.afterChange} />
        </Card>

        <Card header="labelStyle">
          <AdvanceInput
            label="用户名"
            labelStyle={{ color: 'red' }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Align Right">
          <AdvanceInput
            label="用户名"
            align="right"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Clearable">
          <AdvanceInput label="用户名" clearable onChange={this.afterChange} />
        </Card>

        <Card header="Hidden">
          <AdvanceInput label="用户名" hidden onChange={this.afterChange} />
        </Card>

        <Card header="Extra">
          <AdvanceInput
            label="用户名"
            extra="扩展部分"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Password">
          <AdvanceInput password label="密码" onChange={this.afterChange} />
        </Card>

        <Card header="placeholder">
          <AdvanceInput
            label="用户名"
            placeholder="请输入用户名"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="placeholderStyle">
          <AdvanceInput
            placeholder="请输入用户名"
            placeholderStyle={{ color: '#45e325' }}
            label="用户名"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="disabled">
          <AdvanceInput
            label="用户名"
            placeholder="请输入用户名"
            disabled
            onChange={this.afterChange}
          />
        </Card>

        <Card header="maxlength">
          <AdvanceInput
            label="用户名"
            maxlength={5}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="confirmType">
          <AdvanceInput
            label="用户名"
            confirmType="go"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="confirmHold">
          <AdvanceInput
            label="用户名"
            confirmHold
            onChange={this.afterChange}
          />
        </Card>

        <Card header="adjustPosition">
          <AdvanceInput
            label="用户名"
            adjustPosition={false}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="holdKeyboard">
          <AdvanceInput
            label="用户名"
            holdKeyboard
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onChange">
          <AdvanceInput label="用户名" onChange={this.afterChange} />
        </Card>

        <Card header="onFocus">
          <AdvanceInput
            label="用户名"
            onFocus={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onBlur">
          <AdvanceInput
            label="用户名"
            onBlur={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onConfirm">
          <AdvanceInput
            label="用户名"
            onConfirm={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onKeyboardHeightChange">
          <AdvanceInput
            label="用户名"
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
