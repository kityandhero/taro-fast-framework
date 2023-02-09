import { connect } from 'easy-soft-dva';
import { getGuid } from 'easy-soft-utility';

import { Card, DataGrid, Space } from 'taro-fast-component';

import { ContentPageBase } from '../../../../../customComponents';
import { cardHeaderStyle, cardStyle } from '../../../../../customConfig';

const style = {
  backgroundColor: '#f5f7fa',
  ...cardStyle,
};

const descriptionList = [
  {
    label: '开启滚动视图',
    value: 'scrollViewMode = true',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '滚动视图基本示例',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  scrollViewMode = true;

  headerData = {
    id: 'Scroll',
    name: '滚动视图',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      counter: 0,
    };

    this.targetId = getGuid();
  }

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
      </Space>
    );
  };
}
