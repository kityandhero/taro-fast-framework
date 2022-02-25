import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  Ellipsis,
  FadeInBox,
} from 'taro-fast-component/es/customComponents';

import { cardStyle } from '../../../../../customConfig/constants';
import ContentPageBase from '../../../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '复杂示例',
});

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends ContentPageBase {
  viewScrollMode = true;

  enablePullDownRefresh = true;

  enablePullDownRefresh = true;

  enableAutoInitialLoadingIndicator = false;

  enablePullDownRefreshSuccessNotification = true;

  enableLowerLoad = true;

  lowerLoadingPosition = 'fixed';

  pagingLoadMode = true;

  headerData = {
    id: 'ComplexSample',
    name: '复杂示例',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'news/pageList',
      },
    };
  }

  getApiData = (props) => {
    const {
      news: { data },
    } = props;

    return data;
  };

  renderContent = () => {
    const { metaListData } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        {this.judgeInitialActivityIndicatorVisible() ? (
          this.buildInitialActivityIndicator({})
        ) : (
          <View>
            <Space direction="vertical" fillWidth>
              {metaListData.map((o, index) => {
                const { title, description } = o;

                return (
                  <FadeInBox key={`item_${index}`}>
                    <Card
                      header={title}
                      border
                      cardBorderRadiusMode={false}
                      style={style}
                    >
                      <Ellipsis
                        line={2}
                        style={{
                          height: transformSize(88),
                          fontSize: transformSize(28),
                          lineHeight: transformSize(44),
                        }}
                      >
                        {description}
                      </Ellipsis>
                    </Card>
                  </FadeInBox>
                );
              })}
            </Space>
          </View>
        )}
      </Space>
    );
  };
}
