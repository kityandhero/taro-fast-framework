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
    label: '调用方法',
    value: 'this.buildEmptyPlaceholder({ description: "提示文字" })',
    ellipsis: false,
    canCopy: true,
  },
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
    description: '构建空数据占位',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="构建空数据占位"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          {this.buildEmptyPlaceholder({})}

          <Divider />

          {this.buildEmptyPlaceholder({
            description: '还没有数据哦',
          })}
        </Card>

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
