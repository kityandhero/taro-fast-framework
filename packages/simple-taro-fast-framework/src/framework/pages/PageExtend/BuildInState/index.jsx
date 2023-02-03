import { connect } from 'easy-soft-dva';

import { Card, DataGrid, Space } from 'taro-fast-component';

import ContentPageBase from '../../../../customComponents/ContentPageBase';
import { cardHeaderStyle, cardStyle } from '../../../../customConfig/constants';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const configList = [];

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'config',
    name: '内置配置属性',
    description: '',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="可配置属性说明"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <DataGrid
            list={configList}
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
