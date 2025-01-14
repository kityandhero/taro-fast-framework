import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  showSimpleErrorMessage,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import { navigateBack, transformSize } from 'taro-fast-common';
import {
  Button,
  CenterBox,
  FlexBox,
  ImageBox,
  InputItem,
  Line,
  Space,
  // Space,
} from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { logoBlueImage, resetPasswordKeyBlue } from '../../../../customConfig';
import { changePasswordAction } from '../assist/action';

const inputBoxStyle = {
  paddingBottom: transformSize(12),
  borderBottom: `${transformSize(2)} solid #eee`,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '更改密码',
  // navigationStyle: 'custom',
});

@connect(({ customer, entrance, session, global, schedulingControl }) => ({
  customer,
  entrance,
  session,
  global,
  schedulingControl,
}))
class ChangePassword extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    backgroundColor: '#fff',
  };

  originalPassword = '';

  password = '';

  passwordVerify = '';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  changePassword = () => {
    const originalPassword = this.originalPassword;
    const password = this.password;
    const passwordVerify = this.passwordVerify;

    if (checkStringIsNullOrWhiteSpace(originalPassword)) {
      showSimpleErrorMessage('请输入原密码');

      return;
    }

    if (checkStringIsNullOrWhiteSpace(password)) {
      showSimpleErrorMessage('请输入密码');

      return;
    }

    if (checkStringIsNullOrWhiteSpace(passwordVerify)) {
      showSimpleErrorMessage('请输入确认密码');

      return;
    }

    if (password !== passwordVerify) {
      showSimpleErrorMessage('密码与确认密码不一致');

      return;
    }

    changePasswordAction({
      target: this,
      handleData: {
        originalPassword,
        password,
        passwordVerify,
      },
      successCallback: () => {
        showSimpleSuccessMessage('更改密码成功');
      },
    });
  };

  triggerOriginalPasswordChanged = (v) => {
    this.originalPassword = v;
  };

  triggerPasswordChanged = (v) => {
    this.password = v;
  };

  triggerPasswordVerifyChanged = (v) => {
    this.passwordVerify = v;
  };

  buildForm = () => {
    return (
      <>
        <Space direction="vertical" size={40} fillWidth>
          <View style={inputBoxStyle}>
            <FlexBox
              flexAuto="right"
              left={
                <View
                  style={{
                    width: transformSize(40),
                  }}
                >
                  <ImageBox src={resetPasswordKeyBlue} />
                </View>
              }
              leftStyle={{
                marginRight: transformSize(16),
              }}
              right={
                <InputItem
                  fontSize={34}
                  placeholder="请输入您的原密码"
                  password
                  border={false}
                  clearable={false}
                  afterChange={this.triggerOriginalPasswordChanged}
                />
              }
            />
          </View>

          <View style={inputBoxStyle}>
            <FlexBox
              flexAuto="right"
              left={
                <View
                  style={{
                    width: transformSize(40),
                  }}
                >
                  <ImageBox src={resetPasswordKeyBlue} />
                </View>
              }
              leftStyle={{
                marginRight: transformSize(16),
              }}
              right={
                <InputItem
                  fontSize={34}
                  placeholder="请输入您的新密码"
                  password
                  border={false}
                  clearable={false}
                  afterChange={this.triggerPasswordChanged}
                />
              }
            />
          </View>

          <View style={inputBoxStyle}>
            <FlexBox
              flexAuto="right"
              left={
                <View
                  style={{
                    width: transformSize(40),
                  }}
                >
                  <ImageBox src={resetPasswordKeyBlue} />
                </View>
              }
              leftStyle={{
                marginRight: transformSize(16),
              }}
              right={
                <InputItem
                  fontSize={34}
                  placeholder="请再次输入您的新密码"
                  password
                  border={false}
                  clearable={false}
                  afterChange={this.triggerPasswordVerifyChanged}
                />
              }
            />
          </View>
        </Space>

        <Line transparent height={12} />

        <View
          style={{
            color: '#ccc',
            fontSize: transformSize(28),
            paddingLeft: transformSize(54),
          }}
        >
          密码包含大写、小写字母、数字
        </View>

        <Line transparent height={80} />

        <Button
          weappButton
          text="立即修改"
          backgroundColor="#0075ff"
          fontColor="#fff"
          fontSize={32}
          // loading={ false}
          openType="getPhoneNumber"
          block
          circle
          size="middle"
          shape="rounded"
          onClick={this.changePassword}
        />

        <Line transparent height={30} />

        <Button
          text="返回"
          backgroundColor="#eee"
          fontColor="#666"
          fontSize={32}
          block
          circle
          size="middle"
          shape="rounded"
          onClick={() => {
            navigateBack();
          }}
        />
      </>
    );
  };

  renderFurther() {
    return (
      <View>
        <Line transparent height={70} />

        <CenterBox>
          <View
            style={{
              width: transformSize(90),
              height: transformSize(90),
              borderRadius: '50%',
              backgroundColor: '#0e72ff',
            }}
          >
            <ImageBox src={logoBlueImage} />
          </View>
        </CenterBox>

        <Line transparent height={40} />

        <CenterBox>
          <View style={{ fontSize: transformSize(42), fontWeight: 'bold' }}>
            密码修改
          </View>
        </CenterBox>

        <Line transparent height={14} />

        <Line transparent height={180} />

        <View
          style={{
            paddingLeft: transformSize(60),
            paddingRight: transformSize(60),
          }}
        >
          {this.buildForm()}

          <Line transparent height={40} />
        </View>
      </View>
    );
  }
}

export default ChangePassword;
