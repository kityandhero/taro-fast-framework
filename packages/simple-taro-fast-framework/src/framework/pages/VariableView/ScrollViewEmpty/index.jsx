import { connect } from 'react-redux';
import {
  Card,
  Space,
  DataGrid,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../../customConfig/constants';
import ContentPageBase from '../../../../customComponents/ContentPageBase';
import Header from '../../../../customComponents/Header';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const descriptionList = [
  {
    label: '启用空数据占位',
    value: 'this.setState({enableEmptyPlaceholder: true})',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '自定义占位内容',
    value: '重载覆写函数 buildEmptyPlaceholder = () => { return null; }',
    ellipsis: false,
    canCopy: true,
  },
];

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends ContentPageBase {
  loadRemoteRequestAfterMount = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        scrollView: true,
        enableEmptyPlaceholder: true,
        loadApiPath: 'news/singleListEmpty',
      },
    };
  }

  getApiData = (props) => {
    const {
      news: { data },
    } = props;

    return data;
  };

  buildUpperBox = () => {
    const { id, name } = {
      ...{
        id: 'EmptyPlaceholder',
        name: '空数据占位',
      },
      ...this.headerData,
    };

    return <Header title={`${id} ${name}`}></Header>;
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
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
                text: '空数据占位会趁现在容器渲染子组件 children 的上方位置',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
