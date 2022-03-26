import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  DataGrid,
  CenterBox,
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
