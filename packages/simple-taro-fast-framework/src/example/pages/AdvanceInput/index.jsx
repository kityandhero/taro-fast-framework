import { View } from '@tarojs/components';

import {
  AdvanceInput,
  BlockArea,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

export default class Index extends PageWrapper {
  afterChange = (v) => {
    console.log(`input changed: ${v}`);
  };

  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="基础">
          <AdvanceInput onChange={this.afterChange} />
        </BlockArea>

        <BlockArea title="Required">
          <AdvanceInput label="用户名" required onChange={this.afterChange} />
        </BlockArea>

        <BlockArea title="labelStyle">
          <AdvanceInput
            label="用户名"
            labelStyle={{ color: 'red' }}
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="Label">
          <AdvanceInput label="用户名" onChange={this.afterChange} />
        </BlockArea>

        <BlockArea title="Clearable">
          <AdvanceInput label="用户名" clearable onChange={this.afterChange} />
        </BlockArea>

        <BlockArea title="Hidden">
          <AdvanceInput label="用户名" hidden onChange={this.afterChange} />
        </BlockArea>

        <BlockArea title="Extra">
          <AdvanceInput
            label="用户名"
            extra="扩展部分"
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="Password">
          <AdvanceInput password label="密码" onChange={this.afterChange} />
        </BlockArea>

        <BlockArea title="placeholder">
          <AdvanceInput
            label="用户名"
            placeholder="请输入用户名"
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="placeholderStyle">
          <AdvanceInput
            placeholder="请输入用户名"
            placeholderStyle={{ color: '#45e325' }}
            label="用户名"
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="disabled">
          <AdvanceInput
            label="用户名"
            placeholder="请输入用户名"
            disabled
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="maxlength">
          <AdvanceInput
            label="用户名"
            maxlength={5}
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="confirmType">
          <AdvanceInput
            label="用户名"
            confirmType="go"
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="confirmHold">
          <AdvanceInput
            label="用户名"
            confirmHold
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="adjustPosition">
          <AdvanceInput
            label="用户名"
            adjustPosition={false}
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="holdKeyboard">
          <AdvanceInput
            label="用户名"
            holdKeyboard
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="onChange">
          <AdvanceInput label="用户名" onChange={this.afterChange} />
        </BlockArea>

        <BlockArea title="onFocus">
          <AdvanceInput
            label="用户名"
            onFocus={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="onBlur">
          <AdvanceInput
            label="用户名"
            onBlur={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="onConfirm">
          <AdvanceInput
            label="用户名"
            onConfirm={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </BlockArea>

        <BlockArea title="onKeyboardHeightChange">
          <AdvanceInput
            label="用户名"
            onKeyboardHeightChange={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </BlockArea>
      </View>
    );
  }
}
