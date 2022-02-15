import { connect } from 'react-redux';

import {
  Card,
  Space,
  DataGrid,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

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
    value: 'this.setState({pullDownRefresh: true})',
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

  loadRemoteRequestAfterMount = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        scrollView: true,
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

  onReload = () => {
    console.log('onReload');
  };

  onScrollLoad = () => {
    console.log('onScrollLoad');
  };

  renderContent = () => {
    const { metaListData } = this.state;

    console.log({ metaListData });

    return (
      <Space direction="vertical" fillWidth>
        <Card header="使用说明" style={style} headerStyle={cardHeaderStyle}>
          <DataGrid
            list={descriptionList}
            bordered
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
