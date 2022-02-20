import {
  Card,
  Space,
  DataGrid,
  Divider,
} from 'taro-fast-component/es/customComponents';

import {
  cardHeaderStyle,
  cardStyle,
} from '../../../../../customConfig/constants';
import ContentPageBase from '../../../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const descriptionList = [
  {
    label: '支持自定义重载',
    value: '重载覆写函数 buildEmptyPlaceholder = () => { return null; }',
    ellipsis: false,
    canCopy: true,
  },
];

export default class Index extends ContentPageBase {
  headerData = {
    id: 'buildEmptyPlaceholder',
    name: '',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        {this.buildEmptyPlaceholder({})}

        <Divider />

        {this.buildEmptyPlaceholder({
          description: '还没有数据哦',
        })}

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
      </Space>
    );
  };
}
