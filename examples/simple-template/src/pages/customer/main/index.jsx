import { CustomWrapper, View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { checkStringIsNullOrWhiteSpace, logConsole } from 'easy-soft-utility';

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
  VerticalBox,
} from 'taro-fast-component';

import { PageWrapper } from '../../../customComponents';
import {
  addGreenImage,
  boardOrangeImage,
  editGreyImage,
  hexagonBlueImage,
  listCheckBlueImage,
  lockRedImage,
  viewStyle,
  warnOrangeImage,
} from '../../../customConfig';
import { HeadNavigationBox } from '../../../utils';

export const classPrefix = `root-customer`;

const fontColor = '#080808';

const headerTopBottomPadding = 20;

const menuTitleStyle = {
  fontSize: transformSize(36),
  color: fontColor,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '用户中心',
  navigationStyle: 'custom',
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
    backgroundColor: '#fff',
    // paddingLeft: transformSize(28),
    // paddingRight: transformSize(28),
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

  doWorkWhenRepeatedShow = () => {
    this.buildCustomerData();
  };

  doAfterGetCustomerOnSignInSilent = (data) => {
    logConsole(data);

    this.setState({
      currentCustomer: data,
    });
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

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="个人中心" />;
  };

  buildTopInfoBox = () => {
    const { currentCustomer } = this.state;

    const signInSuccess = this.checkSignInSuccess();

    const { name, avatar, subsidiaryName, departmentName, positionName } = {
      nickname: '',
      userId: '',
      avatar: emptyAvatar,
      subsidiaryName: '',
      departmentName: '',
      positionName: '',
      ...currentCustomer,
    };

    const departmentPosition = [];

    if (!checkStringIsNullOrWhiteSpace(departmentName)) {
      departmentPosition.push(departmentName);
    }

    if (!checkStringIsNullOrWhiteSpace(positionName)) {
      departmentPosition.push(positionName);
    }

    return (
      <CustomWrapper>
        <Line transparent height={10} />
        <View
          style={{
            paddingLeft: transformSize(28),
            paddingRight: transformSize(28),
          }}
        >
          <FlexBox
            style={{ width: '100%' }}
            flexAuto="right"
            leftStyle={{
              marginRight: transformSize(24),
            }}
            left={
              <View
                style={{
                  width: transformSize(140),
                  borderRadius: transformSize(10),
                  backgroundColor: '#fff',
                }}
                onClick={() => {
                  if (!signInSuccess) {
                    this.goToSignIn();
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
                          paddingTop: transformSize(5),
                          paddingBottom: transformSize(5),
                        }}
                      >
                        <ColorText
                          color="#080808"
                          fontSize={32}
                          style={{
                            fontWeight: 'bold',
                          }}
                          text={signInSuccess ? name : `点击登录`}
                        />
                      </Col>

                      <Col>
                        <FlexBox
                          flexAuto="right"
                          left={
                            <View
                              style={{
                                backgroundColor: '#ecf4ff',
                                paddingLeft: transformSize(16),
                                paddingRight: transformSize(16),
                                paddingTop: transformSize(5),
                                paddingBottom: transformSize(5),
                                marginTop: transformSize(4),
                                marginBottom: transformSize(4),
                              }}
                            >
                              <ColorText
                                color="#3a6292"
                                fontSize={28}
                                text={
                                  signInSuccess
                                    ? departmentPosition.join(' - ')
                                    : `登录后显示`
                                }
                              />
                            </View>
                          }
                          right={<View />}
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
                          color="#080808"
                          fontSize={32}
                          text={signInSuccess ? subsidiaryName : `登录后显示`}
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
                        this.goToEditInformation();
                      }}
                    >
                      <ImageBox src={editGreyImage} circle={false} />
                    </View>
                  </VerticalBox>
                }
              />
            }
          />
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
        <Space
          direction="vertical"
          fillWidth
          size={0}
          split={<Line height={2} />}
        >
          {this.buildTopInfoBox()}

          <View>
            <View
              style={{
                paddingTop: transformSize(30),
                paddingBottom: transformSize(30),
                paddingLeft: transformSize(28),
              }}
            >
              <ColorText
                fontSize={34}
                color="#828282"
                text="美好一天从现在开始!"
              />
            </View>

            {this.buildMenuItem({
              title: '我发起的',
              icon: addGreenImage,
              onClick: () => {
                this.goToPageListCreateApprove();
              },
            })}

            {this.buildMenuItem({
              title: '待审批',
              icon: warnOrangeImage,
              onClick: () => {
                this.goToPageListWaitApprove();
              },
            })}

            {this.buildMenuItem({
              title: '已结束',
              icon: listCheckBlueImage,
              onClick: () => {
                this.goToPageListLatestApprove();
              },
            })}

            <Line transparent height={20} />
          </View>

          <View>
            <Line transparent height={20} />

            {this.buildMenuItem({
              title: '安全中心',
              icon: lockRedImage,
              onClick: () => {
                this.goToChangePassword();
              },
            })}

            {this.buildMenuItem({
              title: '设置与隐私',
              icon: hexagonBlueImage,
            })}

            {this.buildMenuItem({
              title: '问题反馈',
              icon: boardOrangeImage,
            })}
          </View>
        </Space>
      </>
    );
  }
}

export default customer;
