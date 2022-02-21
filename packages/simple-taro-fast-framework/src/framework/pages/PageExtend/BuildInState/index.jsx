import { Card, Space, DataGrid } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../../customConfig/constants';
import ContentPageBase from '../../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const configList = [
  {
    label: 'scrollView',
    value: '是否使用ScrollView模式, 默认关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'enablePullDownRefresh',
    value:
      '启用下拉刷新,针对 scrollView 模式, 使用前需开启scrollView模式, 默认关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'enableCustomPullDown',
    value:
      '启用自定义下拉刷新动效,针对 scrollView 模式, 使用前需开启scrollView模式, 默认关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'enableLowerLoad',
    value:
      '启用触底部加载, 针对 scrollView 模式, 使用前需开启scrollView模式, 默认关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'enableAutoInitialLoadingIndicator',
    value:
      '启用初始化加载提示器自动显示, 默认开启, 需要自定义初始加载效果时候请关闭',
    ellipsis: false,
    canCopy: true,
  },
];

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
