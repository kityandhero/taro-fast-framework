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

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'PullRefresh',
    name: '下拉刷新',
  };

  pagingLoadMode = true;

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

  onRefresh = () => {
    this.reloadData({});
  };

  onLowerLoad = () => {
    this.loadNextPage({});
  };

  renderContent = () => {
    const { metaListData } = this.state;

    return (
      <Space direction="vertical" fillWidth>
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
      </Space>
    );
  };
}
