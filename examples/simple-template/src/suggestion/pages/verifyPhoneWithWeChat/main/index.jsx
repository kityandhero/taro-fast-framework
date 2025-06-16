import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  showErrorMessage,
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
  FlexBox,
  ImageBox,
  InputItem,
  Line,
} from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import { verifyPhoneImage } from '../../../../customConfig';
import { HeadNavigationBox } from '../../../../utils';
import { viewStyle } from '../../../customConfig';
import {
  refreshVerifyPhoneCaptchaAction,
  verifyPhoneAction,
} from '../assist/action';

const inputBoxStyle = {
  paddingBottom: transformSize(16),
  borderBottom: `${transformSize(2)} solid #eee`,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '校验本机手机号吗',
  navigationStyle: 'custom',
});

@connect(({ customer, entrance, session, global, schedulingControl }) => ({
  customer,
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

  verifyPhone = () => {
    const phone = this.phone;

    if (checkStringIsNullOrWhiteSpace(phone)) {
      showSimpleErrorMessage('手机号码不能为空');

      return;
    }

    const that = this;

    verifyPhoneAction({
      target: that,
      handleData: {
        phone,
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

  triggerPhoneNumber = (event) => {
    const {
      detail: { encryptedData, iv, errMsg },
    } = event;

    const that = this;

    if (
      checkStringIsNullOrWhiteSpace(encryptedData) ||
      checkStringIsNullOrWhiteSpace(iv)
    ) {
      showErrorMessage({
        text: errMsg,
      });

      return;
    }

    that.exchangePhone({
      data: {
        encryptedData,
        iv,
      },
      callback: (o) => {
        const { key } = o;

        that.setState({
          keyPhone: key,
        });
      },
    });
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="校验手机号吗" />;
  };

  buildVerifyView = () => {
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

        <Line transparent height={80} />

        <Button
          weappButton
          openType="getPhoneNumber"
          text="点击获取本机号码"
          backgroundColor="#397bb5"
          fontColor="#fff"
          fontSize={32}
          block
          circle
          size="middle"
          shape="rounded"
          onGetPhoneNumber={this.triggerPhoneNumber}
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
