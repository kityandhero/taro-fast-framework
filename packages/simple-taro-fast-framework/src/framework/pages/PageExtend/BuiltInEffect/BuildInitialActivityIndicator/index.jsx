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
    value: 'this.buildInitialActivityIndicator({ description: "提示文字" })',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '支持自定义重载',
    value:
      '重载覆写函数 buildInitialActivityIndicator = () => { return null; }',
    ellipsis: false,
    canCopy: true,
  },
];

export default class Index extends ContentPageBase {
  headerData = {
    id: 'buildInitialActivityIndicator',
    name: '',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="构建加载提示" style={style} headerStyle={cardHeaderStyle}>
          {this.buildInitialActivityIndicator({})}

          <Divider />

          {this.buildInitialActivityIndicator({
            description: '正在努力加载哦',
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
