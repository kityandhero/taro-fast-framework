import { Card, Space, DataGrid } from 'taro-fast-component/es/customComponents';

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
];

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ScrollViewEmpty',
    name: '滚动视图',
  };

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

  renderContent = () => {
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
      </Space>
    );
  };
}
