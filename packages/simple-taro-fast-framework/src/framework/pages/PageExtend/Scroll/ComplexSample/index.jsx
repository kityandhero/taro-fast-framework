import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Ellipsis,
  FadeInBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../../../customComponents/ContentPageBase';
import { cardStyle } from '../../../../../customConfig/constants';

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

@connect(({ simulation, global }) => ({
  simulation,
  global,
}))
@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  scrollViewMode = true;

  enablePullDownRefresh = true;

  enablePullDownRefresh = true;

  enableAutoInitialLoadingIndicator = false;

  enablePullDownRefreshSuccessNotification = true;

  enableLowerLoad = true;

  lowerLoadingPosition = 'outer';

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
        loadApiPath: 'simulation/pageList',
      },
    };
  }

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
