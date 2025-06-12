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

import {
  buildBase64Image,
  navigateBack,
  transformSize,
} from 'taro-fast-common';
import {
  Button,
  CenterBox,
  Countdown,
  FlexBox,
  ImageBox,
  InputItem,
  Line,
} from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import {
  verifyPhoneImage,
  verifyPhoneShieldBlue,
} from '../../../../customConfig';
import { HeadNavigationBox } from '../../../../utils';
import { viewStyle } from '../../../customConfig';
import {
  refreshVerifyPhoneCaptchaAction,
  sendVerifyPhoneMessageAction,
  verifyPhoneAction,
} from '../assist/action';

export const classPrefix = `user-sign-in`;

const inputBoxStyle = {
  paddingBottom: transformSize(16),
  borderBottom: `${transformSize(2)} solid #eee`,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '校验手机号吗',
  navigationStyle: 'custom',
});

@connect(({ user, entrance, session, global, schedulingControl }) => ({
  user,
  entrance,
  session,
  global,
  schedulingControl,
}))
class VerifyPhoneWithWeChat extends PageWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    paddingLeft: transformSize(0),
    paddingRight: transformSize(0),
  };

  phone = '';

  captchaCode = '';

  smsCode = '';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      captchaKey: '',
      captchaImage: '',
      canSendSms: true,
      smsEndTime: null,
    };
  }

  doOtherRemoteRequest = () => {
    this.refreshVerifyPhoneCaptcha();
  };

  refreshVerifyPhoneCaptcha = () => {
    refreshVerifyPhoneCaptchaAction({
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

  sendVerifyPhoneMessage = () => {
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

    sendVerifyPhoneMessageAction({
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

  verifyPhone = () => {
    const phone = this.phone;
    const smsCode = this.smsCode;

    if (checkStringIsNullOrWhiteSpace(phone)) {
      showSimpleErrorMessage('手机号码不能为空');

      return;
    }

    if (checkStringIsNullOrWhiteSpace(smsCode)) {
      showSimpleErrorMessage('短信证码不能为空');

      return;
    }

    const that = this;

    verifyPhoneAction({
      target: that,
      handleData: {
        phone,
        smsCode,
      },
      successCallback: () => {
        showSimpleSuccessMessage('校验成功');

        that.getCustomer({
          force: true,
          successCallback: () => {
            navigateBack();
          },
        });
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

  onCountdownEnd = () => {
    this.setState({
      canSendSms: true,
    });
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="校验手机号吗" />;
  };

  buildVerifyView = () => {
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
                <ImageBox src={verifyPhoneImage} />
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
                <ImageBox src={verifyPhoneShieldBlue} />
              </View>
            }
            leftStyle={{
              marginRight: transformSize(16),
            }}
            right={
              <InputItem
                placeholder="请输入图形验证码"
                border={false}
                clearable={false}
                extra={
                  <View onClick={this.refreshVerifyPhoneCaptcha}>
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
                <ImageBox src={verifyPhoneShieldBlue} />
              </View>
            }
            leftStyle={{
              marginRight: transformSize(16),
            }}
            right={
              <InputItem
                placeholder=""
                border={false}
                clearable={false}
                extra={
                  canSendSms ? (
                    <View
                      style={{ color: '#555' }}
                      onClick={this.sendVerifyPhoneMessage}
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

        <Line transparent height={80} />

        <Button
          weappButton
          text="立即校验"
          backgroundColor="#397bb5"
          fontColor="#fff"
          fontSize={32}
          block
          circle
          size="middle"
          shape="rounded"
          onClick={this.verifyPhone}
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
              backgroundColor: '#397bb5',
            }}
          ></View>
        </CenterBox>

        <Line transparent height={40} />

        <CenterBox>
          <View style={{ fontSize: transformSize(38), fontWeight: 'bold' }}>
            校验手机号码
          </View>
        </CenterBox>

        <Line transparent height={14} />

        <CenterBox>
          <View style={{ fontSize: transformSize(28), color: '#333' }}>
            为了便于联系，需要校验您的手机号码
          </View>
        </CenterBox>

        <Line transparent height={180} />

        <View
          style={{
            paddingLeft: transformSize(60),
            paddingRight: transformSize(60),
          }}
        >
          {this.buildVerifyView()}

          <Line transparent height={40} />
        </View>
      </View>
    );
  }
}

export default VerifyPhoneWithWeChat;
