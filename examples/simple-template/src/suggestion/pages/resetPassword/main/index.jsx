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
  resetPasswordCaptcha,
  resetPasswordPhone,
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
  };

  renderFurther() {
    const { registering } = this.state;

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
          <View style={{ fontSize: transformSize(36), fontWeight: 'bold' }}>
            密码重置
          </View>
        </CenterBox>

        <Line transparent height={10} />

        <CenterBox>
          <View style={{ fontSize: transformSize(28) }}>
            欢迎来到产投OA系统
          </View>
        </CenterBox>

        <Line transparent height={180} />

        <View
          style={{
            paddingLeft: transformSize(60),
            paddingRight: transformSize(60),
          }}
        >
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
                  <ImageBox src={resetPasswordCaptcha} />
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
                  extra={<View>获取验证码</View>}
                  afterChange={this.triggerPasswordChanged}
                />
              }
            />
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
                  <ImageBox src={resetPasswordCaptcha} />
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
                  extra={<View>获取验证码</View>}
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
