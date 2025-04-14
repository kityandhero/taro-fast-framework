import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { showSuccessMessage } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Button, Item, Line, Space } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { viewStyle } from '../../../../customConfig';
import { HeadNavigationBox } from '../../../../utils';
import { SignOutActionSheet } from '../../../customComponents';
import { signOutAction } from '../assist/action';

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
  navigationBarTitleText: '安全中心',
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

  signOut = () => {
    signOutAction({
      target: this,
      handleData: {},
      successCallback: () => {
        showSuccessMessage('退出成功');

        this.goToSignIn();
      },
    });
  };

  showGenderActionSheet = () => {
    SignOutActionSheet.open();
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="安全中心" />;
  };

  renderInteractiveArea = () => {
    return (
      <>
        <SignOutActionSheet
          options={[
            {
              value: '1',
              content: '确定',
            },
          ]}
          // eslint-disable-next-line no-unused-vars
          afterOption={(v, o, event) => {
            this.signOut(v);
          }}
        />
      </>
    );
  };

  renderFurther() {
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
              label="修改登录密码"
              contentStyle={menuTitleStyle}
              headerTopBottomPadding={headerTopBottomPadding}
              headerRightPadding={headerRightPadding}
              border={false}
              arrow
              onClick={() => {
                this.goToChangePassword();
              }}
            />
          </Space>
        </View>

        <Line transparent height={30} />

        <View
          style={{
            paddingLeft: transformSize(20),
            paddingRight: transformSize(20),
          }}
        >
          <Button
            text="退出登陆"
            backgroundColor="#fff"
            fontColor="#666"
            fontSize={32}
            block
            // circle
            size="middle"
            // shape="rounded"
            onClick={() => {
              this.showGenderActionSheet();
            }}
          />
        </View>
      </>
    );
  }
}

export default EditInformation;
