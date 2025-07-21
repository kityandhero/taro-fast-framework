import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { showSimpleSuccessNotification } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Line, Space, SwitchItem } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import {
  flowApproveMobileViewModeCollection,
  viewStyle,
} from '../../../../customConfig';
import { HeadNavigationBox } from '../../../../utils';
import { GenderActionSheet } from '../../../customComponents';
import { setMobileApproveViewModeAction } from '../assist/action';

export const classPrefix = `root-user`;

const fontColor = '#080808';

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
class Setting extends PageNeedSignInWrapper {
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

  setMobileApproveViewMode = (v) => {
    console.log(v);

    setMobileApproveViewModeAction({
      target: this,
      handleData: {
        mobileApproveViewMode: v
          ? flowApproveMobileViewModeCollection.document
          : flowApproveMobileViewModeCollection.form,
      },
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

    const { mobileApproveViewMode } = {
      mobileApproveViewMode: flowApproveMobileViewModeCollection.form,
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
            <SwitchItem
              label="审批表单呈现模式"
              contentStyle={menuTitleStyle}
              checkedText="文档"
              uncheckedText="表单"
              border={false}
              checked={
                mobileApproveViewMode ===
                flowApproveMobileViewModeCollection.document
              }
              onChange={(o) => {
                this.setMobileApproveViewMode(o);
              }}
            />
          </Space>
        </View>
      </>
    );
  }
}

export default Setting;
