import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  DataGrid,
  HelpBox,
  Ellipsis,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../../customConfig/constants';
import ContentPageBase from '../../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const descriptionList = [
  {
    label: '开启滚动视图',
    value: 'this.setState({scrollView: true})',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '配置处理加载',
    value: 'this.setState({enablePullDownRefresh: true})',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '可配置加载提示组件显示模式',
    value: 'this.setState({ lowerLoadingPosition: "footer/absolute/fixed" })',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '自定义外部提示加载组件',
    value: '重载覆写函数 buildLowerLoadingSuspendBox = () => { return null; }',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '自定义底部提示加载组件',
    value: '重载覆写函数 buildLowerLoadingFooterBox = () => { return null; }',
    ellipsis: false,
    canCopy: true,
  },
];

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Scroll',
    name: '滚动视图 - 下拉刷新',
  };

  /**
   * 使用分页加载模式，该模式下自动附加页码等参数以及使用相关交互效果
   */
  pagingLoadMode = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        scrollView: true,
        enableScrollLowerLoad: true,
        lowerLoadingPosition: 'fixed',
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

  onScrollLowerLoad = () => {
    this.loadNextPage({});
  };

  renderContent = () => {
    const { firstLoadSuccess, dataLoading, metaListData } = this.state;

    console.log({ firstLoadSuccess, dataLoading });

    return (
      <Space direction="vertical" fillWidth>
        <View>
          <Space direction="vertical" fillWidth>
            {metaListData.map((o, index) => {
              const { title, description } = o;

              return (
                <Card
                  key={`item_${index}`}
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
              );
            })}
          </Space>
        </View>

        <Card header="使用说明" style={style} headerStyle={cardHeaderStyle}>
          <DataGrid
            list={descriptionList}
            border
            layout="row"
            size="small"
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>

        <Card header="备注" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            useBackground={false}
            list={[
              {
                text: '使用下拉刷新需要前置开启滚动视图',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
