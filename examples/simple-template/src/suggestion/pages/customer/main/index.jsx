import { CustomWrapper, View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { buildLinearGradient } from 'easy-soft-utility';

import {
  emptyAvatar,
  flexDirectionCollection,
  flexJustifyCollection,
  transformSize,
} from 'taro-fast-common';
import {
  Col,
  ColorText,
  FlexBox,
  ImageBox,
  Item,
  Line,
  Row,
  Space,
  Tabbar,
  VerticalBox,
} from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import {
  customerBanner,
  customerComplaintMenu,
  customerEditHeader,
  customerIllustrateMenu,
  customerMessageMenu,
  // customerQuestionMenu,
  customerReportMenu,
  // customerSettingMenu,
  pageBackgroundColor,
} from '../../../customConfig';
import { HeadNavigationBox } from '../../../utils';

import './index.less';

export const classPrefix = `root-customer`;

const fontColor = '#080808';
const headerTopBottomPadding = 20;

const menuTitleStyle = {
  fontSize: transformSize(36),
  color: fontColor,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '个人中心',
  navigationStyle: 'custom',
});

@connect(({ customer, session, entrance, global, schedulingControl }) => ({
  customer,
  session,
  entrance,
  global,
  schedulingControl,
}))
class PageMain extends PageWrapper {
  viewStyle = {
    backgroundColor: pageBackgroundColor,
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: '',
      customer: null,
    };
  }

  doWorkAdjustDidMount = () => {
    this.buildCurrentOperatorData();
  };

  doWorkWhenRepeatedShow = () => {
    this.buildCurrentOperatorData();
  };

  doAfterGetCurrentOperatorOnSignInSilent = (data) => {
    this.setState({
      currentCustomer: data,
    });
  };

  buildCurrentOperatorData = () => {
    const { currentCustomer } = this.state;

    if ((currentCustomer || null) == null) {
      const signInSuccess = this.checkSignInSuccess();

      if (signInSuccess) {
        const that = this;

        that.getCurrentOperator({
          successCallback: (data) => {
            that.setState({
              currentCustomer: data,
            });
          },
        });
      }
    }
  };

  changeTab = (o) => {
    const { name } = o;

    switch (name) {
      case 'home': {
        this.redirectToSuggestionHome();
        break;
      }

      case 'customer': {
        this.redirectToSuggestionCustomer();
        break;
      }
    }
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="个人中心" />;
  };

  buildTopInfoBox = () => {
    const { currentCustomer } = this.state;

    const signInSuccess = this.checkSignInSuccess();

    const { id, friendlyName, avatar } = {
      id: '',
      friendlyName: '',
      userId: '',
      avatar: emptyAvatar,
      ...currentCustomer,
    };

    return (
      <CustomWrapper>
        <View
          style={{
            paddingLeft: transformSize(28),
            paddingRight: transformSize(28),
            backgroundImage: buildLinearGradient({
              direct: 45,
              list: ['#3173aa', '#3e81bc'],
            }),
          }}
        >
          <Line transparent height={10} />

          <FlexBox
            style={{ width: '100%' }}
            flexAuto="right"
            leftStyle={{
              marginRight: transformSize(24),
            }}
            left={
              <View
                style={{
                  width: transformSize(120),
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                }}
                onClick={() => {
                  if (!signInSuccess) {
                    this.goToSuggestionSignIn();
                  }
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
            }
            right={
              <FlexBox
                style={{ width: '100%', height: '100%' }}
                flexAuto="left"
                left={
                  <>
                    <Row
                      direction={flexDirectionCollection.column}
                      justify={flexJustifyCollection.between}
                    >
                      <Col
                        style={{
                          paddingLeft: transformSize(10),
                          paddingRight: transformSize(10),
                          // paddingTop: transformSize(5),
                          paddingBottom: transformSize(5),
                        }}
                      >
                        <ColorText
                          color="#fff"
                          fontSize={40}
                          style={{
                            fontWeight: 'bold',
                          }}
                          text={signInSuccess ? friendlyName : `立即登录`}
                        />
                      </Col>

                      <Col
                        style={{
                          paddingLeft: transformSize(10),
                          paddingRight: transformSize(10),
                          paddingTop: transformSize(5),
                          paddingBottom: transformSize(5),
                        }}
                      >
                        <ColorText
                          color="#fff"
                          fontSize={34}
                          text={
                            signInSuccess ? `ID: ${id}` : `获取更多优质服务`
                          }
                        />
                      </Col>
                    </Row>
                  </>
                }
                right={
                  <VerticalBox>
                    <View
                      style={{
                        width: transformSize(48),
                      }}
                      onClick={() => {
                        this.goToSuggestionEditInformation();
                      }}
                    >
                      <ImageBox src={customerEditHeader} circle={false} />
                    </View>
                  </VerticalBox>
                }
              />
            }
          />

          <Line transparent height={20} />
        </View>

        <Line transparent height={30} />
      </CustomWrapper>
    );
  };

  buildMenuItem = ({ icon, title, onClick }) => {
    return (
      <View
        style={{
          paddingLeft: transformSize(28),
          paddingTop: transformSize(10),
          paddingBottom: transformSize(10),
        }}
      >
        <Item
          label={title}
          contentStyle={menuTitleStyle}
          headerTopBottomPadding={headerTopBottomPadding}
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
      </View>
    );
  };

  renderFurther() {
    return (
      <>
        {this.buildTopInfoBox()}

        <View
          style={{
            paddingLeft: transformSize(28),
            paddingRight: transformSize(28),
          }}
        >
          <ImageBox
            src={customerBanner}
            aspectRatio={0.461}
            imageBoxStyle={
              {
                // backgroundColor: '#fff',
              }
            }
          />
        </View>

        <Line transparent height={30} />

        <View
          style={{
            backgroundColor: '#fff',
          }}
        >
          <Space
            direction="vertical"
            fillWidth
            size={0}
            split={<Line height={2} />}
          >
            {this.buildMenuItem({
              title: '我的投诉',
              icon: customerComplaintMenu,
              onClick: () => {
                this.goToSuggestionPageListComplaint();
              },
            })}

            {this.buildMenuItem({
              title: '我的举报',
              icon: customerReportMenu,
              onClick: () => {
                this.goToSuggestionPageListReport();
              },
            })}

            {this.buildMenuItem({
              title: '我的留言',
              icon: customerMessageMenu,
              onClick: () => {
                this.goToSuggestionPageListFeedback();
              },
            })}

            {this.buildMenuItem({
              title: '留言须知',
              icon: customerIllustrateMenu,
              onClick: () => {
                this.goToSuggestionIllustrate();
              },
            })}
          </Space>
        </View>

        <Tabbar
          fixed
          items={[
            {
              name: 'home',
              icon: 'home',
              text: '首页',
            },
            {
              name: 'customer',
              icon: 'user',
              text: '我的',
            },
          ]}
          onClick={this.changeTab}
        />
      </>
    );
  }
}

export default PageMain;
