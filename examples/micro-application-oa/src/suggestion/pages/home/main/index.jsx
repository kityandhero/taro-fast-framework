import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
} from 'easy-soft-utility';

import {
  emptyImage,
  flexDirectionCollection,
  flexJustifyCollection,
  transformSize,
} from 'taro-fast-common';
import {
  CenterBox,
  Col,
  ColorText,
  FlexBox,
  ImageBox,
  Line,
  Row,
  Space,
  Tabbar,
} from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents/general';
import {
  customerMessageListItemArrow,
  homeBanner,
  homeComplaint,
  homeMessage,
  homeReport,
  pageBackgroundColor,
} from '../../../customConfig';
import { HeadNavigationBox } from '../../../utils';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '投诉建议',
  navigationStyle: 'custom',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
class PageMain extends PageWrapper {
  viewStyle = {
    backgroundColor: pageBackgroundColor,
    paddingLeft: transformSize(18),
    paddingRight: transformSize(18),
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      customer: null,
    };
  }

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
    return <HeadNavigationBox title="投诉建议" />;
  };

  buildOptionBox = ({ image, title, description, onClick }) => {
    const descriptions = isArray(description) ? description : [description];

    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: transformSize(32),
          overflow: 'hidden',
          paddingTop: transformSize(30),
          paddingLeft: transformSize(24),
          paddingRight: transformSize(24),
          paddingBottom: transformSize(30),
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
                width: transformSize(200),
                borderRadius: '50%',
                backgroundColor: '#fff',
              }}
              onClick={() => {
                if (!isFunction(onClick)) {
                  return;
                }

                onClick();
              }}
            >
              <ImageBox
                src={image || emptyImage}
                circle
                imageBoxStyle={{
                  backgroundColor: '#fff',
                }}
                errorImage={emptyImage}
              />
            </View>
          }
          right={
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
                  color="#4f4f4f"
                  fontSize={34}
                  style={{
                    fontWeight: 'bold',
                  }}
                  text={checkStringIsNullOrWhiteSpace(title) ? `标题` : title}
                />
              </Col>

              {descriptions.map((o, index) => {
                return (
                  <Col key={`description-${index}`}>
                    <FlexBox
                      flexAuto="right"
                      left={
                        <View
                          style={{
                            // backgroundColor: '#ecf4ff',
                            paddingLeft: transformSize(10),
                            paddingRight: transformSize(16),
                            paddingTop: transformSize(5),
                            paddingBottom: transformSize(5),
                            marginTop: transformSize(4),
                            marginBottom: transformSize(4),
                          }}
                        >
                          <ColorText
                            color="#a3a3a3"
                            fontSize={28}
                            text={checkStringIsNullOrWhiteSpace(o) ? `描述` : o}
                          />
                        </View>
                      }
                      right={<View />}
                    />
                  </Col>
                );
              })}

              <Col
                style={{
                  paddingLeft: transformSize(10),
                  paddingRight: transformSize(10),
                  paddingTop: transformSize(5),
                  paddingBottom: transformSize(5),
                }}
              >
                <FlexBox
                  style={{ width: '100%' }}
                  flexAuto="left"
                  left={<View></View>}
                  right={
                    <View
                      style={{
                        backgroundColor: '#3c83c1',
                        borderRadius: transformSize(24),
                        overflow: 'hidden',
                      }}
                    >
                      <FlexBox
                        style={{ width: '100%' }}
                        flexAuto="left"
                        left={
                          <View
                            style={{
                              width: transformSize(144),
                              paddingTop: transformSize(10),
                              paddingBottom: transformSize(10),
                            }}
                            onClick={() => {
                              if (!isFunction(onClick)) {
                                return;
                              }

                              onClick();
                            }}
                          >
                            <CenterBox>
                              <ColorText
                                color="#fff"
                                fontSize={28}
                                text="查看详情"
                              />
                            </CenterBox>
                          </View>
                        }
                        rightStyle={{
                          marginRight: transformSize(4),
                        }}
                        right={
                          <View
                            style={{
                              width: transformSize(38),
                              borderRadius: '50%',
                            }}
                          >
                            <ImageBox
                              src={customerMessageListItemArrow}
                              circle
                              errorImage={emptyImage}
                            />
                          </View>
                        }
                      />
                    </View>
                  }
                />
              </Col>
            </Row>
          }
        />
      </View>
    );
  };

  renderFurther() {
    const that = this;

    return (
      <>
        <Line transparent height={26} />

        <View>
          <ImageBox
            src={homeBanner}
            aspectRatio={0.461}
            imageBoxStyle={{
              backgroundColor: '#fff',
            }}
          />
        </View>

        <Line transparent height={26} />

        <Space
          direction="vertical"
          fillWidth
          size={0}
          split={<Line transparent height={26} />}
        >
          {that.buildOptionBox({
            image: homeComplaint,
            title: '我要投诉',
            description: [
              '1: 您的建议是我们前进的动力.',
              '2: 一起监督, 共同发展.',
            ],
            onClick: () => {
              that.goToSuggestionSubmitComplaint();
            },
          })}

          {that.buildOptionBox({
            image: homeReport,
            title: '我要举报',
            description: [
              '1: 您的建议是我们前进的动力.',
              '2: 一起监督, 共同发展.',
            ],
            onClick: () => {
              that.goToSuggestionSubmitReport();
            },
          })}

          {that.buildOptionBox({
            image: homeMessage,
            title: '我要留言',
            description: [
              '1: 您的建议是我们前进的动力.',
              '2: 一起监督, 共同发展.',
            ],
            onClick: () => {
              that.goToSuggestionSubmitFeedback();
            },
          })}
        </Space>

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
