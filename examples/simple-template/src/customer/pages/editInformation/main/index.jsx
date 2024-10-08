import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { showSuccessNotification } from 'easy-soft-utility';

import { emptyAvatar, transformSize } from 'taro-fast-common';
import { ImageBox, Item, Line, Space, VerticalBox } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { viewStyle } from '../../../../customConfig';
import { GenderActionSheet } from '../../../customComponents';
import { setGenderAction } from '../assist/action';

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
  fontSize: transformSize(32),
  color: fontColor,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '个人信息',
  // navigationStyle: 'custom',
});

@connect(({ customer, session, entrance, global, schedulingControl }) => ({
  customer,
  session,
  entrance,
  global,
  schedulingControl,
}))
class customer extends PageNeedSignInWrapper {
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
        showSuccessNotification('性别设置成功');

        target.refreshCustomerData(true);
      },
    });
  };

  renderInteractiveArea = () => {
    return (
      <>
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

    const { name, avatar, genderNote } = {
      nickname: '',
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
              extra={name}
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
              extra={genderNote}
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

export default customer;
