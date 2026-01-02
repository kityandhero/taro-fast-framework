import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

// import { convertCollection, getValueByKey } from 'easy-soft-utility';
import { transformSize } from 'taro-fast-common';
import {
  Button,
  CenterBox,
  // CenterBox,
  ColorText,
  FlexBox,
  ImageBox,
  InputItem,
  Line,
  // Space,
} from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import {
  signInInputPassword,
  signInInputUser,
  signInLogo,
} from '../../../customConfig';

// import { signInAction, signInWithPhoneAction } from '../assist/action';
import './index.less';

export const classPrefix = `customer-sign-in`;

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
class SignIn extends PageWrapper {
  showCallProcess = true;

  viewStyle = {
    backgroundColor: '#fff',
  };

  phone = '';

  password = '';

  triggerPhoneChanged = (v) => {
    this.phone = v;
  };

  triggerPasswordChanged = (v) => {
    this.password = v;
  };

  signInWithPhone = () => {
    this.signIn({
      data: {
        phone: this.phone,
        password: this.password,
      },
    });

    // signInWithPhoneAction({
    //   target: this,
    //   handleData: {
    //     phone: this.phone,
    //     password: this.password,
    //   },
    //   successCallback: ({ target, remoteData }) => {
    //     const openId = target.parseOpenIdFromSignInApiData(remoteData);

    //     const token = target.parseTokenFromSignInApiData(remoteData);
    //   },
    //   failCallback: ({ target }) => {
    //     // target.setState({ processing: false });
    //   },
    // });
  };

  renderFurther() {
    const { registering } = this.state;

    return (
      <View>
        <Line transparent height={120} />

        <CenterBox>
          <View style={{ width: transformSize(140) }}>
            <ImageBox src={signInLogo} />
          </View>
        </CenterBox>

        <Line transparent height={50} />

        <CenterBox>
          <View style={{ fontSize: transformSize(32) }}>
            欢迎来到产投OA系统
          </View>
        </CenterBox>

        <Line transparent height={60} />

        <View
          style={{
            paddingLeft: transformSize(60),
            paddingRight: transformSize(60),
          }}
        >
          <View
            style={{
              // fontWeight: 'bold',
              fontSize: transformSize(44),
            }}
          >
            登录
          </View>

          <Line transparent height={80} />

          <View
            style={{
              paddingBottom: transformSize(16),
              borderBottom: `${transformSize(2)} solid #eee`,
            }}
          >
            <FlexBox
              flexAuto="right"
              left={
                <View
                  style={{
                    width: transformSize(40),
                  }}
                >
                  <ImageBox src={signInInputUser} />
                </View>
              }
              leftStyle={{
                marginRight: transformSize(16),
              }}
              right={
                <InputItem
                  placeholder="请输入您的手机号"
                  border={false}
                  clearable
                  afterChange={this.triggerPhoneChanged}
                />
              }
            />
          </View>

          <Line transparent height={40} />

          <View
            style={{
              paddingBottom: transformSize(16),
              borderBottom: `${transformSize(2)} solid #eee`,
            }}
          >
            <FlexBox
              flexAuto="right"
              left={
                <View
                  style={{
                    width: transformSize(40),
                  }}
                >
                  <ImageBox src={signInInputPassword} />
                </View>
              }
              leftStyle={{
                marginRight: transformSize(16),
              }}
              right={
                <InputItem
                  placeholder="请输入密码"
                  password
                  border={false}
                  clearable
                  afterChange={this.triggerPasswordChanged}
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
            text="登录"
            backgroundColor="#0075ff"
            fontColor="#fff"
            fontSize={32}
            loading={registering || false}
            block
            circle
            size="middle"
            // shape="rounded"
            onGetPhoneNumber={this.triggerPhoneNumber}
            onClick={this.signInWithPhone}
          />

          <Line transparent height={40} />

          {/* <CenterBox>
            <Space size={20}>
              <ColorText fontSize={28} color="#518bc0" text="账户登录" />

              <ColorText fontSize={28} color="#ccc" text="验证码登录" />
            </Space>
          </CenterBox> */}
        </View>
      </View>
    );
  }
}

export default SignIn;
