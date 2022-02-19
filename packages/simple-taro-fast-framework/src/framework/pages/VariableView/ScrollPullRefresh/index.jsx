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
    label: '开启下拉刷新式',
    value: 'this.setState({enablePullDownRefresh: true})',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '可进行配置颜色',
    value:
      'this.setState({refreshColor: "red",refreshBackgroundColor: "green"})',
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

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        scrollView: true,
        enablePullDownRefresh: true,
        refreshColor: 'red',
        refreshBackgroundColor: 'green',
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

  renderContent = () => {
    const { metaListData } = this.state;

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
