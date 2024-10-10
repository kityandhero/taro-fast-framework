import { CustomWrapper, View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { Line, Space } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { viewStyle } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { NotificationItem } from '../assist/tools';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '通告列表',
  // navigationStyle: 'custom',
});

@connect(({ notice, session, entrance, global, schedulingControl }) => ({
  notice,
  session,
  entrance,
  global,
  schedulingControl,
}))
class PageListNotice extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    paddingBottom: transformSize(20),
  };

  enableBackTop = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.noticeTypeCollection.pageList,
    };
  }

  buildListView = () => {
    const { metaListData } = this.state;

    return (
      <CustomWrapper>
        <Line transparent height={16} />

        <View
          style={{
            paddingLeft: transformSize(20),
            paddingRight: transformSize(20),
          }}
        >
          <Space direction="vertical" fillWidth size={10}>
            {metaListData.map((item) => {
              const { noticeId } = item;

              return (
                <NotificationItem
                  key={`notice_${noticeId}`}
                  data={item}
                  onClick={() => {
                    this.goToNoticeDetail(noticeId);
                  }}
                />
              );
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
          </View>
        ) : (
          this.buildListView()
        )}
      </View>
    );
  }
}

export default PageListNotice;
