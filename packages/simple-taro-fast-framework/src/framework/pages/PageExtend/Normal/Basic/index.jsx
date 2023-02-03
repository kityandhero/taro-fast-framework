import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { Card, CenterBox, DataGrid, Space } from 'taro-fast-component';

import { ContentPageBase } from '../../../../../customComponents';
import { cardHeaderStyle, cardStyle } from '../../../../../customConfig';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const descriptionList = [
  {
    label: '使用普通视图 [普通视图为默认视图]',
    value: 'scrollViewMode = false',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '默认视图基本示例',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Normal',
    name: '普通视图',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <View style={{ height: transformSize(800), backgroundColor: '#ccc' }}>
          <CenterBox>占位区域</CenterBox>
        </View>

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
