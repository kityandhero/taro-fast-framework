import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  navigateTo,
  toString,
} from 'easy-soft-utility';

import { navigateToMiniProgram, transformSize } from 'taro-fast-common';
import {
  Col,
  ColorText,
  FlexBox,
  ImageBox,
  Line,
  Row,
  VerticalBox,
} from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../customComponents/general';
import {
  homeArrowBlueImage,
  homeClockOrangeImage,
  pathCollection,
  viewStyle,
} from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { HeadNavigationBox } from '../../../utils';
import {
  boxBorderRadiusStyle,
  GridBox,
  NoticeBox,
  NotificationBox,
  SearchBox,
  spiteHeight,
  SwiperBox,
  TitleBox,
  WaitApproveBox,
} from '../assist';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '工作台',
  navigationStyle: 'custom',
});

@connect(({ workbench, entrance, session, global, schedulingControl }) => ({
  workbench,
  entrance,
  session,
  global,
  schedulingControl,
}))
class Home extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  // repeatDoWorkWhenShow = true;

  viewStyle = {
    ...viewStyle,
    // backgroundColor: '#fff',
    paddingLeft: transformSize(12),
    paddingRight: transformSize(12),
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workbenchTypeCollection.getIntegration,
      carouselList: [],
      navigationList: [],
      waitApproveFlowCaseList: [],
      notificationList: [],
    };
  }

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const {
      navigationList,
      carouselList,
      waitApproveFlowCaseList,
      notificationList,
      latestMessageList,
      caseSubmitCount,
      caseWaitApproveCount,
    } = {
      navigationList: [],
      carouselList: [],
      waitApproveFlowCaseList: [],
      notificationList: [],
      latestMessageList: [],
      caseSubmitCount: 0,
      caseWaitApproveCount: 0,
      ...metaData,
    };

    let latestMessage = null;

    latestMessage = isEmptyArray(latestMessageList)
      ? {
          message: '暂无最新消息',
          type: 'none',
          id: '',
          key: '',
        }
      : latestMessageList[0];

    this.setState({
      navigationList: isArray(navigationList) ? navigationList : [],
      carouselList: isArray(carouselList) ? carouselList : [],
      waitApproveFlowCaseList: isArray(waitApproveFlowCaseList)
        ? waitApproveFlowCaseList
        : [],
      notificationList: isArray(notificationList) ? notificationList : [],
      latestMessage: latestMessage,
      caseSubmitCount,
      caseWaitApproveCount,
    });
  };

  doWorkWhenRepeatedShow = () => {
    this.reloadData({});
  };

  onShareAppMessage() {
    const o = {
      path: pathCollection.root.home.path,
    };

    return o;
  }

  onGridItemClick = (item) => {
    const { value, type, path, exteriorMicroAppId } = item;

    if (type === 'html' && !checkStringIsNullOrWhiteSpace(path)) {
      this.goToGeneralWebPage({
        path: pathCollection.webpage.general.path,
        title: value || '',
        url: path,
      });
    }

    if (type === 'page' && !checkStringIsNullOrWhiteSpace(path)) {
      navigateTo({
        url: path,
      });
    }

    if (
      type === 'exteriorMicroApp' &&
      !checkStringIsNullOrWhiteSpace(exteriorMicroAppId)
    ) {
      navigateToMiniProgram({ appId: exteriorMicroAppId });
    }
  };

  onNoticeClick = (item) => {
    const { type, id } = {
      type: 'none',
      id: '',
      ...item,
    };

    if (type === 'none') {
      return;
    }

    if (type === 'notification' && !checkStringIsNullOrWhiteSpace(id)) {
      this.goToNoticeDetail(id);
    }

    if (type === 'approve' && !checkStringIsNullOrWhiteSpace(id)) {
      this.goToApprove(id);
    }
  };

  buildHeadNavigation = () => {
    const { currentCustomer } = this.state;

    const { subsidiaryName } = {
      subsidiaryName: '',
      ...currentCustomer,
    };

    return <HeadNavigationBox title={subsidiaryName} titleBold arrow />;
  };

  renderFurther() {
    const {
      navigationList,
      carouselList,
      waitApproveFlowCaseList,
      notificationList,
      latestMessage,
      caseSubmitCount,
      caseWaitApproveCount,
    } = this.state;

    console.log({
      caseSubmitCount,
      caseWaitApproveCount,
    });

    return (
      <View className="page page-index">
        <Line transparent height={spiteHeight} />

        <SearchBox
          afterScanCode={(o) => {
            this.goToDetailFlowCase(o);
          }}
        />

        <Line transparent height={spiteHeight} />

        <GridBox list={navigationList} onItemClick={this.onGridItemClick} />

        <Line transparent height={spiteHeight} />

        <Row>
          <Col auto>
            <View
              style={{
                ...boxBorderRadiusStyle,
                backgroundColor: '#fff',
                paddingTop: transformSize(28),
                paddingBottom: transformSize(28),
                paddingLeft: transformSize(32),
                paddingRight: transformSize(32),
                boxShadow: `0px ${transformSize(12)} ${transformSize(32)} 0px rgba(17, 17, 26, 0.1)`,
              }}
            >
              <FlexBox
                flexAuto="right"
                left={
                  <View
                    style={{
                      ...boxBorderRadiusStyle,
                      width: transformSize(48),
                      backgroundColor: '#e8f2fe',
                      padding: transformSize(18),
                    }}
                  >
                    <ImageBox src={homeArrowBlueImage} />
                  </View>
                }
                rightStyle={{
                  paddingLeft: transformSize(28),
                  paddingRight: transformSize(28),
                }}
                right={
                  <VerticalBox>
                    <FlexBox
                      style={{ width: '100%', height: '100%' }}
                      flexAuto="top"
                      verticalHeight={300}
                      top={
                        <View style={{}}>
                          <ColorText
                            textStyle={{ fontSize: transformSize(26) }}
                            textPrefixStyle={{
                              color: '#1f8ff0',
                              fontSize: transformSize(40),
                              fontWeight: 'bold',
                            }}
                            color="#9aa4b2"
                            textPrefix={toString(caseSubmitCount)}
                            separatorStyle={{
                              margin: '0 var(--tfc-4)',
                            }}
                            separator=" "
                            text="件"
                          />
                        </View>
                      }
                      bottom={
                        <View>
                          <ColorText
                            textStyle={{ fontSize: transformSize(26) }}
                            text="我发起的"
                          />
                        </View>
                      }
                    />
                  </VerticalBox>
                }
              />
            </View>
          </Col>
          <Col>
            <View style={{ width: transformSize(16) }}></View>
          </Col>
          <Col auto>
            <View
              style={{
                ...boxBorderRadiusStyle,
                backgroundColor: '#fff',
                paddingTop: transformSize(28),
                paddingBottom: transformSize(28),
                paddingLeft: transformSize(32),
                paddingRight: transformSize(32),
                boxShadow: `0px ${transformSize(12)} ${transformSize(32)} 0px rgba(17, 17, 26, 0.1)`,
              }}
            >
              <FlexBox
                flexAuto="right"
                left={
                  <View
                    style={{
                      ...boxBorderRadiusStyle,
                      width: transformSize(48),
                      backgroundColor: '#fff3e6',
                      padding: transformSize(18),
                    }}
                  >
                    <ImageBox src={homeClockOrangeImage} />
                  </View>
                }
                rightStyle={{
                  paddingLeft: transformSize(28),
                  paddingRight: transformSize(28),
                }}
                right={
                  <VerticalBox>
                    <FlexBox
                      style={{ width: '100%', height: '100%' }}
                      flexAuto="top"
                      verticalHeight={300}
                      top={
                        <View style={{}}>
                          <ColorText
                            textStyle={{ fontSize: transformSize(26) }}
                            textPrefixStyle={{
                              color: '#f59b3f',
                              fontSize: transformSize(40),
                              fontWeight: 'bold',
                            }}
                            color="#9aa4b2"
                            textPrefix={toString(caseWaitApproveCount)}
                            separatorStyle={{
                              margin: '0 var(--tfc-4)',
                            }}
                            separator=" "
                            text="件"
                          />
                        </View>
                      }
                      bottom={
                        <View>
                          <ColorText
                            textStyle={{ fontSize: transformSize(26) }}
                            text="总代办量"
                          />
                        </View>
                      }
                    />
                  </VerticalBox>
                }
              />
            </View>
          </Col>
        </Row>

        <Line transparent height={spiteHeight} />

        <NoticeBox data={latestMessage} onClick={this.onNoticeClick} />

        <Line transparent height={spiteHeight} />

        <SwiperBox list={carouselList} />

        <TitleBox
          title="最近待审批事项"
          onClick={() => {
            this.goToPageListWaitApprove();
          }}
        />

        <WaitApproveBox
          list={waitApproveFlowCaseList}
          onItemClick={this.goToApprove}
        />

        <TitleBox
          title="通知公告"
          onClick={() => {
            this.goToPageListNotice();
          }}
        />

        <NotificationBox
          list={notificationList}
          onItemClick={this.goToNoticeDetail}
        />
      </View>
    );
  }
}

export default Home;
