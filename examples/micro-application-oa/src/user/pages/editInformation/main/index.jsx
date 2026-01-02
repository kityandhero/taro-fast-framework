import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { showSimpleSuccessNotification } from 'easy-soft-utility';

import { emptyAvatar, transformSize } from 'taro-fast-common';
import {
  ColorText,
  ImageBox,
  Item,
  Line,
  Space,
  VerticalBox,
} from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { viewStyle } from '../../../../customConfig';
import { HeadNavigationBox } from '../../../../utils';
import {
  EditNicknamePopup,
  GenderActionSheet,
} from '../../../customComponents';
import { setGenderAction } from '../assist/action';

export const classPrefix = `root-user`;

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

@connect(({ user, session, entrance, global, schedulingControl }) => ({
  user,
  session,
  entrance,
  global,
  schedulingControl,
}))
class EditInformation extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    backgroundColor: '#fcfbfc',
    paddingLeft: transformSize(0),
    paddingRight: transformSize(0),
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: '',
    };
  }

  doWorkWhenRepeatedShow = () => {
    this.refreshCustomerData(false);
  };

  showGenderActionSheet = () => {
    GenderActionSheet.open();
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

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="我的信息" />;
  };

  renderInteractiveArea = () => {
    return (
      <>
        <EditNicknamePopup
          header="文件预览"
          mode="through"
          position="bottom"
          showClose
          closeWhenOverlayClick
          arcTop
        >
          <View
            style={{
              height: transformSize(640),
              overflowY: 'auto',
            }}
          >
            11
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

    const { friendlyName, avatar, genderNote } = {
      friendlyName: '',
      userId: '',
      avatar: emptyAvatar,
      genderNote: '未设置',
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
              label="名称"
              contentStyle={menuTitleStyle}
              headerTopBottomPadding={headerTopBottomPadding}
              headerRightPadding={headerRightPadding}
              border={false}
              arrow
              arrowTransparent
              extra={
                <ColorText
                  textStyle={{ fontSize: transformSize(32) }}
                  text={friendlyName}
                />
              }
              // onClick={() => {
              //   this.showEditNicknamePopup();
              // }}
            />

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
                this.goToSetAvatar();
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
