import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  DataGrid,
  CenterBox,
  HelpBox,
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
    label: '开启滚动视图',
    value: 'viewScrollMode = true',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '配置UpperBox区域渲染',
    value: '重载渲染函数 buildUpperBox = () => { return <View></View> }',
    ellipsis: false,
    canCopy: true,
  },
];

export default class Index extends ContentPageBase {
  viewScrollMode = true;

  headerData = {
    id: 'UpperBox',
    name: '使用上部固定区域',
  };

  buildUpperBox = () => {
    return (
      <View style={{ height: transformSize(120), backgroundColor: 'green' }}>
        <CenterBox>UpperBox</CenterBox>
      </View>
    );
  };

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

        <Card header="备注" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            useBackground={false}
            list={[
              {
                text: 'UpperBox区域不参与页面滚动',
              },
            ]}
          />
        </Card>

        <View style={{ height: transformSize(800), backgroundColor: '#ccc' }}>
          <CenterBox>占位区域</CenterBox>
        </View>
      </Space>
    );
  };
}
