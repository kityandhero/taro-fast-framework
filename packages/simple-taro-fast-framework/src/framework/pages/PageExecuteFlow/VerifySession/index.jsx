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
    divider: true,
    dividerText: 'Config',
  },
  {
    label: 'verifySession',
    value: '开启 session 检测校验',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '内置视图配置',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'config',
    name: '内置视图配置',
    description: '可配置的页面视图属性',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="配置说明" style={style} headerStyle={cardHeaderStyle}>
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
