import { View } from '@tarojs/components';

import {
  AdvanceInput,
  BlockArea,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="基础">
          <AdvanceInput />
        </BlockArea>

        <BlockArea title="Label">
          <AdvanceInput label="用户名" />
        </BlockArea>

        <BlockArea title="Extra">
          <AdvanceInput label="用户名" extra="扩展部分" />
        </BlockArea>

        <BlockArea title="Password">
          <AdvanceInput password label="密码" />
        </BlockArea>

        <BlockArea title="placeholder">
          <AdvanceInput label="用户名" placeholder="请输入用户名" />
        </BlockArea>

        <BlockArea title="placeholderStyle">
          <AdvanceInput
            placeholder="请输入用户名"
            placeholderStyle={{ color: '#45e325' }}
            label="用户名"
          />
        </BlockArea>

        <BlockArea title="disabled">
          <AdvanceInput label="用户名" placeholder="请输入用户名" disabled />
        </BlockArea>

        <BlockArea title="maxlength">
          <AdvanceInput label="用户名" maxlength={5} />
        </BlockArea>

        <BlockArea title="confirmType">
          <AdvanceInput label="用户名" confirmType="go" />
        </BlockArea>

        <BlockArea title="confirmHold">
          <AdvanceInput label="用户名" confirmHold />
        </BlockArea>

        <BlockArea title="adjustPosition">
          <AdvanceInput label="用户名" adjustPosition={false} />
        </BlockArea>

        <BlockArea title="holdKeyboard">
          <AdvanceInput label="用户名" holdKeyboard />
        </BlockArea>

        <BlockArea title="onInput">
          <AdvanceInput
            label="用户名"
            onInput={(e) => {
              console.log(e);
            }}
          />
        </BlockArea>

        <BlockArea title="onFocus">
          <AdvanceInput
            label="用户名"
            onFocus={(e) => {
              console.log(e);
            }}
          />
        </BlockArea>

        <BlockArea title="onBlur">
          <AdvanceInput
            label="用户名"
            onBlur={(e) => {
              console.log(e);
            }}
          />
        </BlockArea>

        <BlockArea title="onConfirm">
          <AdvanceInput
            label="用户名"
            onConfirm={(e) => {
              console.log(e);
            }}
          />
        </BlockArea>

        <BlockArea title="onKeyboardHeightChange">
          <AdvanceInput
            label="用户名"
            onKeyboardHeightChange={(e) => {
              console.log(e);
            }}
          />
        </BlockArea>
      </View>
    );
  }
}
