import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  showErrorMessage,
  showSimpleErrorMessage,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import { navigateBack, transformSize } from 'taro-fast-common';
import { Button, CenterBox, Line } from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import { HeadNavigationBox } from '../../../../utils';
import { viewStyle } from '../../../customConfig';
import { verifyPhoneWithWeChatAction } from '../assist/action';

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
    };
  }

  verifyPhone = ({ key }) => {
    if (checkStringIsNullOrWhiteSpace(key)) {
      showSimpleErrorMessage('手机号码存储值不能为空');

      return;
    }

    const that = this;

    verifyPhoneWithWeChatAction({
      target: that,
      handleData: {
        key,
      },
      successCallback: () => {
        showSimpleSuccessMessage('校验成功');

        that.getCurrentOperator({
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

        that.verifyPhone({ key });
      },
    });
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="校验手机号吗" />;
  };

  buildVerifyView = () => {
    return (
      <>
        <Line transparent height={80} />

        <Button
          weappButton
          openType="getPhoneNumber"
          text="校验本机号码"
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
