import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  chooseImage,
  emptyAvatar,
  navigateBack,
  transformSize,
} from 'taro-fast-common';
import {
  Button,
  CenterBox,
  ColorText,
  ImageBox,
  Line,
} from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { modelTypeCollection } from '../../../../modelBuilders';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '设置头像',
  // navigationStyle: 'custom',
});

@connect(({ user, entrance, session, global, schedulingControl }) => ({
  user,
  entrance,
  session,
  global,
  schedulingControl,
}))
class SetAddress extends PageNeedSignInWrapper {
  viewStyle = {
    backgroundColor: '#fff',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      localUrl: '',
    };
  }

  selectAvatar = () => {
    const that = this;

    chooseImage({
      success: (o) => {
        const { tempFilePaths } = o;

        if (isArray(tempFilePaths) && !isEmptyArray(tempFilePaths)) {
          const url = tempFilePaths[0];

          that.setState({
            localUrl: url,
          });
        }
      },
    });
  };

  setAvatar = () => {
    const { localUrl } = this.state;

    if (checkStringIsNullOrWhiteSpace(localUrl)) {
      showSimpleErrorMessage('请选择头像');

      return;
    }

    this.uploadSingleImage({
      uploadUrl: modelTypeCollection.userTypeCollection.uploadImage,
      filePath: localUrl,
      name: 'avatar',
    });

    // setAvatarAction({
    //   target: this,
    //   handleData: {
    //     avatar,
    //   },
    //   successCallback: () => {
    //     showSimpleSuccessMessage('设置头像成功');
    //   },
    // });
  };

  buildForm = () => {
    const { currentCustomer, localUrl } = this.state;

    const { avatar } = {
      avatar: emptyAvatar,
      ...currentCustomer,
    };

    const avatarAdjust = checkStringIsNullOrWhiteSpace(localUrl)
      ? avatar || emptyAvatar
      : localUrl;

    return (
      <>
        <CenterBox>
          <View
            style={{
              width: transformSize(380),
              padding: transformSize(16),
              backgroundColor: '#eee',
              borderRadius: transformSize(14),
              overflow: 'hidden',
            }}
          >
            <View
              onClick={() => {
                this.selectAvatar();
              }}
            >
              <ImageBox src={avatarAdjust} />
            </View>
          </View>
        </CenterBox>

        <Line transparent height={22} />

        <CenterBox>
          <ColorText color="#ccc" fontSize={24} text="点击头像更换图片" />
        </CenterBox>

        <Line transparent height={80} />

        <Button
          weappButton
          text="保存头像"
          backgroundColor="#0075ff"
          fontColor="#fff"
          fontSize={32}
          // loading={ false}
          openType="getPhoneNumber"
          block
          circle
          size="middle"
          shape="rounded"
          onClick={this.setAvatar}
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

export default SetAddress;
