import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  addMinute,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getNow,
  getValueByKey,
  showSimpleErrorMessage,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import { buildBase64Image, transformSize } from 'taro-fast-common';
import {
  Button,
  CenterBox,
  // CenterBox,
  ColorText,
  Countdown,
  FlexBox,
  ImageBox,
  InputItem,
  Line,
  // Space,
} from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import {
  resetPasswordKeyBlue,
  resetPasswordPhone,
  resetPasswordShieldBlue,
} from '../../../../customConfig';
import {
  refreshCaptchaAction,
  retrievePasswordAction,
  sendRetrievePasswordMessageAction,
} from '../assist/action';

// import { signInAction, signInWithPhoneAction } from '../assist/action';
import './index.less';

export const classPrefix = `customer-sign-in`;

const inputBoxStyle = {
  paddingBottom: transformSize(16),
  borderBottom: `${transformSize(2)} solid #eee`,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '用户登录',
  // navigationStyle: 'custom',
});

@connect(({ customer, entrance, session, global, schedulingControl }) => ({
  customer,
  entrance,
  session,
  global,
  schedulingControl,
}))
class ResetPassword extends PageWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    backgroundColor: '#fff',
  };

  phone = '';

  captchaCode = '';

  smsCode = '';

  password = '';

  passwordVerify = '';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      captchaKey: '',
      captchaImage: '',
      canSendSms: true,
      smsEndTime: null,
      step: 1,
    };
  }

  doOtherRemoteRequest = () => {
    this.refreshCaptcha();
  };

  refreshCaptcha = () => {
    refreshCaptchaAction({
      target: this,
      handleData: {},
      successCallback: ({ target, remoteData }) => {
        const captchaKey = getValueByKey({
          data: remoteData,
          key: 'captchaKey',
          convert: convertCollection.string,
          defaultValue: '',
        });

        const image = getValueByKey({
          data: remoteData,
          key: 'image',
          convert: convertCollection.string,
          defaultValue: '',
        });

        target.setState({
          captchaKey,
          captchaImage: buildBase64Image(image),
        });
      },
    });
  };

  sendRetrievePasswordMessage = () => {
    const { captchaKey } = this.state;

    const phone = this.phone;
    const captchaCode = this.captchaCode;

    if (checkStringIsNullOrWhiteSpace(phone)) {
      showSimpleErrorMessage('请输入手机号码');

      return;
    }

    if (checkStringIsNullOrWhiteSpace(captchaCode)) {
      showSimpleErrorMessage('请输入图形验证码');

      return;
    }

    sendRetrievePasswordMessageAction({
      target: this,
      handleData: {
        phone,
        captchaKey,
        captchaCode,
      },
      successCallback: ({ target }) => {
        target.setState({
          canSendSms: false,
          smsEndTime: addMinute(getNow(), 1),
        });
      },
    });
  };

  retrievePassword = () => {
    const phone = this.phone;
    const smsCode = this.smsCode;
    const password = this.password;
    const passwordVerify = this.passwordVerify;

    if (checkStringIsNullOrWhiteSpace(phone)) {
      showSimpleErrorMessage('手机号码不能为空');

      return;
    }

    if (checkStringIsNullOrWhiteSpace(smsCode)) {
      showSimpleErrorMessage('短信证码不能为空');

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

    retrievePasswordAction({
      target: this,
      handleData: {
        phone,
        smsCode,
        password,
        passwordVerify,
      },
      successCallback: ({ target }) => {
        showSimpleSuccessMessage('重置密码成功');

        setTimeout(() => {
          target.goToSignIn();
        }, 800);
      },
    });
  };

  triggerPhoneChanged = (v) => {
    this.phone = v;
  };

  triggerCaptchaCodeChanged = (v) => {
    this.captchaCode = v;
  };

  triggerSmsCodeChanged = (v) => {
    this.smsCode = v;
  };

  triggerPasswordChanged = (v) => {
    this.password = v;
  };

  triggerPasswordVerifyChanged = (v) => {
    this.passwordVerify = v;
  };

  onCountdownEnd = () => {
    this.setState({
      canSendSms: true,
    });
  };

  showFirstStep = () => {
    if (checkStringIsNullOrWhiteSpace(this.smsCode)) {
      showSimpleErrorMessage('请输入短信验证码');

      return;
    }

    this.setState({ step: 1 });
  };

  showSecondStep = () => {
    this.setState({ step: 2 });
  };

  buildFirstStep = () => {
    const { captchaImage, canSendSms, smsEndTime } = this.state;

    return (
      <>
        <View style={inputBoxStyle}>
          <FlexBox
            flexAuto="right"
            left={
              <View
                style={{
                  width: transformSize(40),
                }}
              >
                <ImageBox src={resetPasswordPhone} />
              </View>
            }
            leftStyle={{
              marginRight: transformSize(16),
            }}
            right={
              <InputItem
                placeholder="请输入您的手机号"
                border={false}
                clearable={false}
                afterChange={this.triggerPhoneChanged}
              />
            }
          />
        </View>

        <Line transparent height={40} />

        <View style={inputBoxStyle}>
          <FlexBox
            flexAuto="right"
            left={
              <View
                style={{
                  width: transformSize(40),
                }}
              >
                <ImageBox src={resetPasswordShieldBlue} />
              </View>
            }
            leftStyle={{
              marginRight: transformSize(16),
            }}
            right={
              <InputItem
                placeholder="请输入图形验证码"
                password
                border={false}
                clearable={false}
                extra={
                  <View onClick={this.refreshCaptcha}>
                    <CenterBox>
                      <ImageBox
                        imageBoxStyle={{
                          width: transformSize(110),
                          height: transformSize(55),
                        }}
                        src={captchaImage}
                        aspectRatio={0.5}
                      />
                    </CenterBox>
                  </View>
                }
                afterChange={this.triggerCaptchaCodeChanged}
              />
            }
          />
        </View>

        <Line transparent height={80} />

        <View style={inputBoxStyle}>
          <FlexBox
            flexAuto="right"
            left={
              <View
                style={{
                  width: transformSize(40),
                }}
              >
                <ImageBox src={resetPasswordShieldBlue} />
              </View>
            }
            leftStyle={{
              marginRight: transformSize(16),
            }}
            right={
              <InputItem
                placeholder=""
                password
                border={false}
                clearable={false}
                extra={
                  canSendSms ? (
                    <View
                      style={{ color: '#555' }}
                      onClick={this.sendRetrievePasswordMessage}
                    >
                      获取验证码
                    </View>
                  ) : (
                    <Countdown
                      showHour={false}
                      showMinute={false}
                      // format={{ minutes: ':', seconds: '' }}
                      endTime={smsEndTime}
                      afterEnd={this.onCountdownEnd}
                    />
                  )
                }
                afterChange={this.triggerSmsCodeChanged}
              />
            }
          />
        </View>

        <Line transparent height={20} />

        <FlexBox
          flexAuto="left"
          left={<View></View>}
          leftStyle={{
            marginRight: transformSize(16),
          }}
          right={<ColorText fontSize={28} color="#ccc" text="忘记密码?" />}
        />

        <Line transparent height={80} />

        <Button
          weappButton
          text="下一步"
          backgroundColor="#0075ff"
          fontSize={32}
          // loading={ false}
          openType="getPhoneNumber"
          block
          circle
          size="middle"
          shape="rounded"
          onClick={this.showSecondStep}
        />
      </>
    );
  };

  buildSecondStep = () => {
    return (
      <>
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
                placeholder="请输入您的新密码"
                border={false}
                clearable={false}
                afterChange={this.triggerPasswordChanged}
              />
            }
          />
        </View>

        <Line transparent height={70} />

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
                placeholder="请再次输入您的新密码"
                password
                border={false}
                clearable={false}
                afterChange={this.triggerPasswordVerifyChanged}
              />
            }
          />
        </View>

        <Line transparent height={12} />

        <View
          style={{
            color: '#ccc',
            fontSize: transformSize(24),
            paddingLeft: transformSize(54),
          }}
        >
          密码包含大写、小写字母、数字
        </View>

        <Line transparent height={80} />

        <Button
          weappButton
          text="立即重置"
          backgroundColor="#0075ff"
          fontSize={32}
          // loading={ false}
          openType="getPhoneNumber"
          block
          circle
          size="middle"
          shape="rounded"
          onClick={this.retrievePassword}
        />
      </>
    );
  };

  renderFurther() {
    const { step } = this.state;

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
          ></View>
        </CenterBox>

        <Line transparent height={40} />

        <CenterBox>
          <View style={{ fontSize: transformSize(38), fontWeight: 'bold' }}>
            密码重置
          </View>
        </CenterBox>

        <Line transparent height={14} />

        <CenterBox>
          <View style={{ fontSize: transformSize(28), color: '#333' }}>
            欢迎来到产投OA系统
          </View>
        </CenterBox>

        <Line transparent height={180} />

        {step === 1 ? <></> : null}

        <View
          style={{
            paddingLeft: transformSize(60),
            paddingRight: transformSize(60),
          }}
        >
          {step === 1 ? this.buildFirstStep() : null}

          {step === 2 ? this.buildSecondStep() : null}

          <Line transparent height={40} />
        </View>
      </View>
    );
  }
}

export default ResetPassword;
