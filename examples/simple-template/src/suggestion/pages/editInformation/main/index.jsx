import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  showSimpleErrorMessage,
  showSimpleSuccessNotification,
  toString,
  whetherNumber,
} from 'easy-soft-utility';

import { emptyAvatar, transformSize } from 'taro-fast-common';
import {
  Button,
  ColorText,
  ImageBox,
  InputItem,
  Item,
  Line,
  Space,
  VerticalBox,
} from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { HeadNavigationBox } from '../../../../utils';
import {
  EditNicknamePopup,
  GenderActionSheet,
} from '../../../customComponents';
import { viewStyle } from '../../../customConfig';
import { setGenderAction, setNicknameAction } from '../assist/action';

export const classPrefix = `root-customer`;

const fontColor = '#080808';

const headerTopBottomPadding = 10;
const headerRightPadding = 0;

const groupBoxStyle = {
  backgroundColor: '#fff',
  paddingLeft: transformSize(20),
  paddingRight: transformSize(20),
  paddingTop: transformSize(14),
  paddingBottom: transformSize(14),
};

const menuTitleStyle = {
  fontSize: transformSize(34),
  color: fontColor,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '个人信息',
  navigationStyle: 'custom',
});

@connect(({ customer, session, entrance, global, schedulingControl }) => ({
  customer,
  session,
  entrance,
  global,
  schedulingControl,
}))
class EditInformation extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  currentNicknameTemporaryStorage = '';

  viewStyle = {
    ...viewStyle,
    paddingLeft: transformSize(0),
    paddingRight: transformSize(0),
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: '',
      currentNickName: '',
    };
  }

  doWorkWhenRepeatedShow = () => {
    this.refreshCustomerData(false);
  };

  buildExtraStateDataWhenCustomerUpdate = (o) => {
    const { nickname } = {
      nickname: '',
      ...o,
    };

    this.currentNicknameTemporaryStorage = nickname;

    return {
      currentNickName: nickname,
    };
  };

  showEditNicknamePopup = () => {
    EditNicknamePopup.open();
  };

  showGenderActionSheet = () => {
    GenderActionSheet.open();
  };

  setNickname = () => {
    EditNicknamePopup.close();

    setNicknameAction({
      target: this,
      handleData: { nickname: this.currentNicknameTemporaryStorage ?? '' },
      successCallback: ({ target }) => {
        showSimpleSuccessNotification('昵称设置成功');

        target.refreshCustomerData(true);
      },
    });
  };

  setGender = (v) => {
    setGenderAction({
      target: this,
      handleData: { gender: v },
      successCallback: ({ target }) => {
        showSimpleSuccessNotification('性别设置成功');

        target.refreshCustomerData(true);
      },
    });
  };

  triggerNicknameChanged = (v) => {
    this.currentNicknameTemporaryStorage = v;
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="我的信息" />;
  };

  renderInteractiveArea = () => {
    const { currentNickName } = this.state;

    return (
      <>
        <EditNicknamePopup
          header="设置昵称"
          mode="through"
          position="bottom"
          showClose
          closeWhenOverlayClick
          arcTop
        >
          <View
            style={{
              height: transformSize(340),
              overflowY: 'auto',
            }}
          >
            <View style={{ paddingBottom: transformSize(26) }}>
              <Line transparent height={26} />

              <InputItem
                label="昵称："
                placeholder="请输入昵称"
                value={currentNickName}
                description="填写您像是用的昵称, 例如 生如夏花"
                labelWidth={116}
                labelAlign="right"
                border={false}
                clearable={false}
                afterChange={this.triggerNicknameChanged}
              />

              <Line transparent height={26} />

              <Button
                text="保存"
                backgroundColor="#397bb5"
                fontColor="#fff"
                fontSize={32}
                block
                circle
                size="middle"
                shape="rounded"
                onClick={this.setNickname}
              />
            </View>
          </View>
        </EditNicknamePopup>

        <GenderActionSheet
          options={[
            {
              value: '1',
              content: '男',
            },
            {
              value: '2',
              content: '女',
            },
          ]}
          // eslint-disable-next-line no-unused-vars
          afterOption={(v, o, event) => {
            this.setGender(v);
          }}
        />
      </>
    );
  };

  renderFurther() {
    const { currentCustomer } = this.state;

    const {
      nickname,
      friendlyName,
      avatar,
      phone,
      genderNote,
      whetherPhoneVerify,
      phoneVerifyMode,
    } = {
      nickname: '',
      friendlyName: '',
      userId: '',
      avatar: emptyAvatar,
      phone: '',
      genderNote: '未设置',
      whetherPhoneVerify: whetherNumber.no,
      ...currentCustomer,
    };

    return (
      <>
        <Line transparent height={16} />

        <View style={groupBoxStyle}>
          <Space
            direction="vertical"
            fillWidth
            size={18}
            split={<Line height={2} />}
          >
            <Item
              label="头像"
              contentStyle={menuTitleStyle}
              headerTopBottomPadding={headerTopBottomPadding}
              headerRightPadding={headerRightPadding}
              border={false}
              arrow
              extra={
                <VerticalBox>
                  <View
                    style={{
                      width: transformSize(64),
                    }}
                  >
                    <ImageBox
                      src={avatar || emptyAvatar}
                      circle
                      imageBoxStyle={{
                        backgroundColor: '#fff',
                      }}
                      errorImage={emptyAvatar}
                    />
                  </View>
                </VerticalBox>
              }
              onClick={() => {
                this.goToSuggestionSetAvatar();
              }}
            />

            <Item
              label="名称"
              contentStyle={menuTitleStyle}
              headerTopBottomPadding={headerTopBottomPadding}
              headerRightPadding={headerRightPadding}
              border={false}
              arrow
              // arrowTransparent
              extra={
                <ColorText
                  textStyle={{ fontSize: transformSize(32) }}
                  text={nickname || friendlyName || '尚未设置'}
                />
              }
              onClick={() => {
                this.showEditNicknamePopup();
              }}
            />

            <Item
              label="电话"
              contentStyle={menuTitleStyle}
              headerTopBottomPadding={headerTopBottomPadding}
              headerRightPadding={headerRightPadding}
              border={false}
              arrow
              // arrowTransparent
              extra={
                <ColorText
                  textStyle={{ fontSize: transformSize(32) }}
                  text={phone || '尚未设置'}
                />
              }
              onClick={() => {
                if (whetherPhoneVerify === whetherNumber.yes) {
                  return;
                }

                if (toString(phoneVerifyMode) === '0') {
                  this.redirectToSuggestionVerifyPhone();

                  return;
                }

                if (toString(phoneVerifyMode) === '100') {
                  this.redirectToSuggestionVerifyPhoneWithWeChat();

                  return;
                } else {
                  showSimpleErrorMessage('未配置手机号验证方式');
                }
              }}
            />
          </Space>
        </View>

        <Line transparent height={16} />

        <View style={groupBoxStyle}>
          <Space
            direction="vertical"
            fillWidth
            size={18}
            split={<Line height={2} />}
          >
            <Item
              label="性别"
              contentStyle={menuTitleStyle}
              headerTopBottomPadding={headerTopBottomPadding}
              headerRightPadding={headerRightPadding}
              border={false}
              arrow
              extra={
                <ColorText
                  textStyle={{ fontSize: transformSize(32) }}
                  text={genderNote}
                />
              }
              onClick={() => {
                this.showGenderActionSheet();
              }}
            />
          </Space>
        </View>
      </>
    );
  }
}

export default EditInformation;
