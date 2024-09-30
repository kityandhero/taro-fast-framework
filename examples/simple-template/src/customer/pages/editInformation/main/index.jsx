import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { emptyAvatar, transformSize } from 'taro-fast-common';
import { ImageBox, Item, Line, Space, VerticalBox } from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import { viewStyle } from '../../../../customConfig';

export const classPrefix = `root-customer`;

const fontColor = '#080808';

const headerTopBottomPadding = 10;
const headerRightPadding = 0;

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
class customer extends PageWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    backgroundColor: '#fcfbfc',
    paddingLeft: transformSize(34),
    paddingRight: transformSize(34),
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: '',
      currentCustomer: null,
    };
  }

  doWorkAdjustDidMount = () => {
    this.buildCustomerData();
  };

  buildCustomerData = () => {
    const { currentCustomer } = this.state;

    if ((currentCustomer || null) == null) {
      const signInSuccess = this.checkSignInSuccess();

      if (signInSuccess) {
        const that = this;

        that.getCustomer({
          successCallback: (data) => {
            that.setState({
              currentCustomer: data,
            });
          },
        });
      }
    }
  };

  buildMenuItem = ({ icon, title, onClick }) => {
    return (
      <Item
        label={title}
        contentStyle={menuTitleStyle}
        headerTopBottomPadding={headerTopBottomPadding}
        headerRightPadding={headerRightPadding}
        prefix={
          <VerticalBox>
            <View
              style={{
                width: transformSize(48),
              }}
            >
              <ImageBox src={icon} circle={false} />
            </View>
          </VerticalBox>
        }
        border={false}
        arrow
        onClick={onClick ?? null}
      />
    );
  };

  renderFurther() {
    const { currentCustomer } = this.state;

    // const signInSuccess = this.checkSignInSuccess();

    const { name, avatar } = {
      nickname: '',
      userId: '',
      avatar: emptyAvatar,
      ...currentCustomer,
    };

    return (
      <>
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
            // onClick={onClick ?? null}
          />

          <Item
            label="名称"
            contentStyle={menuTitleStyle}
            headerTopBottomPadding={headerTopBottomPadding}
            headerRightPadding={headerRightPadding}
            border={false}
            arrow
            extra={name}
            // onClick={onClick ?? null}
          />
        </Space>
      </>
    );
  }
}

export default customer;
