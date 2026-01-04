import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  showSimpleErrorMessage,
  showSimpleSuccessMessage,
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
import { uploadImageDataApiAddress } from '../../../../services/maintainer';
import { setAvatarAction } from '../assist/action';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '设置头像',
  // navigationStyle: 'custom',
});

@connect(({ maintainer, entrance, session, global, schedulingControl }) => ({
  maintainer,
  entrance,
  session,
  global,
  schedulingControl,
}))
class SetAvatar extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

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

  doAfterUploadSingleImageSuccess = (data) => {
    const { imageUrl } = data;

    const that = this;

    setAvatarAction({
      target: this,
      handleData: {
        avatar: imageUrl,
      },
      successCallback: () => {
        showSimpleSuccessMessage('设置头像成功');

        that.getCurrentOperator({ force: true });
      },
    });
  };

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
      uploadUrl: uploadImageDataApiAddress,
      filePath: localUrl,
    });
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
          <ColorText color="#ccc" fontSize={26} text="点击头像更换图片" />
        </CenterBox>

        <Line transparent height={80} />

        <Button
          text="保存头像"
          backgroundColor="#0075ff"
          fontColor="#fff"
          fontSize={32}
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

export default SetAvatar;
