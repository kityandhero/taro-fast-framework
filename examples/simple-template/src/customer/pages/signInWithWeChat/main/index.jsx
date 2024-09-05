import classNames from 'classnames';
import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { navigateBack, transformSize } from 'taro-fast-common';
import {
  BackboardBox,
  Button,
  CenterBox,
  ColorText,
  FixedBox,
  HeadNavigation,
  IconChevronLeft,
  IconHome,
  ImageBox,
  Line,
  Space,
} from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import { signInBackground, signInLogo } from '../../../../customConfig';

import './index.less';

export const classPrefix = `customer-sign-in`;

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '用户登录/注册',
  navigationStyle: 'custom',
});

@connect(({ customer, entrance, session, global, schedulingControl }) => ({
  customer,
  entrance,
  session,
  global,
  schedulingControl,
}))
class SignIn extends PageWrapper {
  viewStyle = {
    backgroundColor: '#bc0509',
  };

  buildHeadNavigation = () => {
    return (
      <HeadNavigation
        fixed
        style={{
          overflow: 'hidden',
        }}
        backboardStyle={{
          width: '100%',
          // height: '100%',
        }}
        bottom={null}
      >
        <View
          style={{
            backgroundColor: '#fff',
            padding: `${transformSize(8)} ${transformSize(26)} ${transformSize(
              8,
            )} ${transformSize(16)}`,
            marginLeft: transformSize(20),
            borderRadius: transformSize(40),
          }}
        >
          <Space size={30}>
            <IconChevronLeft
              size={38}
              onClick={() => {
                navigateBack();
              }}
            />

            <IconHome size={38} onClick={this.goToHomeTab} />
          </Space>
        </View>
      </HeadNavigation>
    );
  };

  triggerPhoneNumber = (event) => {
    const {
      detail: { encryptedData, iv },
    } = event;

    const that = this;

    that.registerWithWeChat({
      data: {
        encryptedData,
        iv,
      },
      successCallback: (o) => {
        const { key } = o;

        that.setState({
          keyPhone: key,
        });
      },
    });
  };

  renderFurther() {
    const { registering } = this.state;

    return (
      <BackboardBox
        backboardStyle={{
          width: '100%',
        }}
        backboardChildren={
          <>
            <ImageBox
              src={signInBackground}
              aspectRatio={1.778_67}
              borderRadius={false}
            />
          </>
        }
      >
        <View className={classNames(classPrefix)}>
          <Line transparent height={360} />

          <View className={classNames(`${classPrefix}__logo`)}>
            <CenterBox>
              <View className={classNames(`${classPrefix}__logo__inner`)}>
                <View
                  className={classNames(
                    `${classPrefix}__logo__inner__image-box`,
                  )}
                >
                  <ImageBox src={signInLogo} />
                </View>
              </View>
            </CenterBox>
          </View>

          <View className={classNames(`${classPrefix}__button`)}>
            <Space direction="vertical" size={30} fillWidth>
              <Button
                weappButton
                text="使用微信进行注册/登录"
                backgroundColor="#f5050e"
                fontSize={32}
                loading={registering || false}
                openType="getPhoneNumber"
                block
                circle
                size="middle"
                shape="rounded"
                onGetPhoneNumber={this.triggerPhoneNumber}
              />

              <Button
                text="返回"
                backgroundColor="#fff"
                fontColor="#f5050e"
                fontSize={32}
                block
                circle
                size="middle"
                shape="rounded"
                onClick={() => {
                  navigateBack();
                }}
              />
            </Space>
          </View>

          <FixedBox bottom={70} width="100%">
            <CenterBox>
              <ColorText fontSize={32} color="#fff" text="OA 在线办公系统" />
            </CenterBox>
          </FixedBox>
        </View>
      </BackboardBox>
    );
  }
}

export default SignIn;
