import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  datetimeFormat,
  formatDatetime,
  getValueByKey,
} from 'easy-soft-utility';

import { navigateBack, transformSize } from 'taro-fast-common';
import { CenterBox, ColorText, FadeInBox, Line } from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import { fieldDataNotice, viewStyle } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { ContentStructureBox, HeadNavigationBox } from '../../../../utils';

// const { IconChevronRight } = Icon;

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '通知详情',
  navigationStyle: 'custom',
});

@connect(({ notice, share, session, entrance, global, schedulingControl }) => ({
  notice,
  share,
  session,
  entrance,
  global,
  schedulingControl,
}))
class NoticeDetail extends PageWrapper {
  enableAutoInitialLoadingIndicator = false;

  enableBackTop = true;

  viewStyle = {
    ...viewStyle,
    // backgroundColor: '#fff',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.noticeTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const urlParameters = this.externalParameter;

    const { noticeId } = {
      noticeId: '',
      ...urlParameters,
    };

    return { ...o, noticeId };
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="通告详情" />;
  };

  buildViewArea = () => {
    const { metaData } = this.state;

    const title = getValueByKey({
      data: metaData,
      key: fieldDataNotice.title.name,
    });

    const subtitle = getValueByKey({
      data: metaData,
      key: fieldDataNotice.subtitle.name,
    });

    const createTime = getValueByKey({
      data: metaData,
      key: fieldDataNotice.createTime.name,
    });

    const author = getValueByKey({
      data: metaData,
      key: fieldDataNotice.author.name,
    });

    const contentJsonList = getValueByKey({
      data: metaData,
      key: fieldDataNotice.contentJsonList.name,
      convert: convertCollection.array,
    });

    // const accessCount = getValueByKey({
    //   data: metaData,
    //   key: fieldDataNotice.accessCount.name,
    // });

    return (
      <FadeInBox>
        <View
          style={{
            paddingRight: transformSize(28),
            paddingLeft: transformSize(28),
            backgroundColor: '#fff',
          }}
        >
          <View
            style={{
              fontSize: transformSize(40),
              lineHeight: transformSize(50),
              fontWeight: 'bold',
              paddingTop: transformSize(6),
              paddingBottom: transformSize(6),
              color: '#333',
              textAlign: 'center',
            }}
          >
            {title}
          </View>

          {checkStringIsNullOrWhiteSpace(subtitle) ? null : (
            <View
              style={{
                fontSize: transformSize(34),
                lineHeight: transformSize(48),
                paddingTop: transformSize(12),
                paddingBottom: transformSize(12),
                color: '#8d8d8d',
                textAlign: 'center',
              }}
            >
              {subtitle}
            </View>
          )}

          <View
            style={{
              fontSize: transformSize(30),
              lineHeight: transformSize(44),
              paddingTop: transformSize(6),
              paddingBottom: transformSize(6),
              color: '#333',
              textAlign: 'center',
            }}
          >
            {formatDatetime({
              data: createTime,
              fmt: datetimeFormat.monthDayHourMinute,
            })}
          </View>

          <View
            style={{
              fontSize: transformSize(30),
              lineHeight: transformSize(44),
              paddingTop: transformSize(6),
              paddingBottom: transformSize(6),
              color: '#333',
              textAlign: 'center',
            }}
          >
            {author}
          </View>

          <View
            style={{
              fontSize: transformSize(30),
              lineHeight: transformSize(46),
              color: '#333',
            }}
          >
            <ContentStructureBox list={contentJsonList} />
          </View>

          {/* <View>
            <VerticalBox align="center" alignJustify="between">
              <View>
                <View>
                  <ColorText
                    textPrefix="阅读"
                    textPrefixStyle={{
                      marginRight: transformSize(20),
                    }}
                    separator=""
                    text={accessCount}
                  />
                </View>
              </View>
            </VerticalBox>
          </View> */}

          <Line transparent height={20} />

          <CenterBox>
            <ColorText
              style={{
                fontWeight: 'bold',
                fontSize: transformSize(30),
              }}
              text="点击返回"
              color="#f5060e"
              onClick={() => {
                navigateBack();
              }}
            />
          </CenterBox>

          <Line transparent height={20} />
        </View>

        {/* <Line height={30} color="#f5f5f5" /> */}
      </FadeInBox>
    );
  };

  renderFurther() {
    return (
      <View>
        <Line height={14} color="#f5f5f5" />

        {this.judgeInitialActivityIndicatorVisible()
          ? this.buildInitialActivityIndicator({})
          : this.buildViewArea()}
      </View>
    );
  }
}

export default NoticeDetail;
