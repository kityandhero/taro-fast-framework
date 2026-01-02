import { CustomWrapper, View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { getValueByKey, isFunction } from 'easy-soft-utility';

import { emptyImage, navigateBack, transformSize } from 'taro-fast-common';
import {
  Button,
  CenterBox,
  ColorText,
  FixedBox,
  FlexBox,
  ImageBox,
  MultiLineText,
  Space,
} from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import {
  customerApplicationFeedbackListItemArrow,
  customerApplicationFeedbackListItemTitlePrefix,
  viewStyle,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { HeadNavigationBox } from '../../../../utils';
import { fieldDataApplicationUserFeedback } from '../../../fieldDataCollection';

const currentPageTitle = '问题反馈';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: currentPageTitle,
  navigationStyle: 'custom',
});

@connect(
  ({
    applicationUserFeedback,
    session,
    entrance,
    global,
    schedulingControl,
  }) => ({
    applicationUserFeedback,
    session,
    entrance,
    global,
    schedulingControl,
  }),
)
class PageListApplicationUserFeedback extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  enableLowerLoad = true;

  pagingLoadMode = true;

  enableBackTop = true;

  messagePageTitle = currentPageTitle;

  viewStyle = {
    ...viewStyle,
    backgroundColor: '#f6f6f6',
    paddingBottom: transformSize(28),
    paddingTop: transformSize(28),
    // paddingLeft: transformSize(28),
    // paddingRight: transformSize(28),
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.applicationUserFeedbackTypeCollection.pageList,
    };
  }

  doWorkWhenRepeatedShow = () => {
    this.reloadData({
      otherState: { metaListData: [] },
      delay: 800,
    });
  };

  getItemId = (data) => {
    return getValueByKey({
      data,
      key: fieldDataApplicationUserFeedback.applicationUserFeedbackId.name,
      defaultValue: '',
    });
  };

  goToDetailMessage = (id) => {
    this.goToDetailApplicationUserFeedback(id);
  };

  buildHeadNavigation = () => {
    return (
      <HeadNavigationBox title={this.messagePageTitle || '缺少页面标题'} />
    );
  };

  buildListItemView = ({
    key,
    title = '',
    description = '',
    createTime = '',
    onClick = null,
  }) => {
    return (
      <View
        key={key}
        style={{
          borderRadius: transformSize(30),
          overflow: 'hidden',
          backgroundColor: '#fff',
          paddingTop: transformSize(24),
          paddingLeft: transformSize(24),
          paddingRight: transformSize(24),
          paddingBottom: transformSize(24),
        }}
      >
        <View>
          <MultiLineText
            style={{ color: '#333' }}
            fontSize={40}
            lineHeight={52}
            text={title}
            prefixStyle={{
              marginRight: transformSize(14),
            }}
            prefix={
              <View
                style={{
                  width: transformSize(52),
                }}
              >
                <ImageBox
                  src={customerApplicationFeedbackListItemTitlePrefix}
                />
              </View>
            }
          />
        </View>

        <View
          style={{
            fontSize: transformSize(28),
            lineHeight: transformSize(48),
            color: '#949494',
            marginTop: transformSize(10),
          }}
        >
          {description}
        </View>

        <View
          style={{
            marginTop: transformSize(10),
          }}
        >
          <FlexBox
            style={{ width: '100%' }}
            flexAuto="left"
            left={
              <CenterBox>
                <ColorText
                  color="#688f6b"
                  fontSize={30}
                  separator=""
                  text={`【 ${createTime} 】`}
                />
              </CenterBox>
            }
            right={
              <View
                style={{
                  backgroundColor: '#409fe7',
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
                        <ColorText color="#fff" fontSize={28} text="查看详情" />
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
                        src={customerApplicationFeedbackListItemArrow}
                        circle
                        errorImage={emptyImage}
                      />
                    </View>
                  }
                />
              </View>
            }
          />
        </View>
      </View>
    );
  };

  buildListView = () => {
    const { metaListData } = this.state;

    return (
      <CustomWrapper>
        <View
          style={{
            paddingLeft: transformSize(28),
            paddingRight: transformSize(28),
          }}
        >
          <Space direction="vertical" fillWidth size={30}>
            {metaListData.map((item) => {
              const { title, description, createTime } = {
                title: '',
                description: '',
                createTime: '',
                ...item,
              };

              const id = this.getItemId(item);

              return this.buildListItemView({
                key: `applicationUserFeedback_${id}`,
                title,
                description,
                createTime,
                onClick: () => {
                  this.goToDetailMessage(id);
                },
              });
            })}
          </Space>
        </View>
      </CustomWrapper>
    );
  };

  renderFurther() {
    const { reloading, metaListData } = this.state;

    return (
      <View>
        {this.judgeInitialActivityIndicatorVisible() ? (
          <></>
        ) : metaListData.length === 0 && !reloading ? (
          <View
            style={{
              paddingTop: transformSize(100),
            }}
          >
            {this.buildEmptyPlaceholder({
              imageWidth: 200,
              description: '还没有数据哦',
              descriptionStyle: {
                marginTop: transformSize(60),
              },
            })}

            <Button
              text="返回"
              backgroundColor="#fff"
              fontColor="#999"
              fontSize={32}
              block
              circle
              size="middle"
              shape="rounded"
              onClick={() => {
                navigateBack();
              }}
            />
          </View>
        ) : (
          this.buildListView()
        )}

        <FixedBox bottom={70} width="100%">
          <View
            style={{
              paddingLeft: transformSize(28),
              paddingRight: transformSize(28),
            }}
          >
            <Button
              text="发布反馈"
              fontColor="#fff"
              backgroundColor="#0075ff"
              fontSize={32}
              block
              circle
              size="middle"
              shape="rounded"
              onClick={() => {
                this.goToSubmitApplicationUserFeedback();
              }}
            />
          </View>
        </FixedBox>
      </View>
    );
  }
}

export default PageListApplicationUserFeedback;
