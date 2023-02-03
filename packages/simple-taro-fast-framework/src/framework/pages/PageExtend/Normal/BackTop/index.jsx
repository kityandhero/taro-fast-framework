import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { Card, CenterBox, DataGrid, HelpBox, Space } from 'taro-fast-component';

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
    label: '开启返回头部',
    value: 'enableBackTop = true',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '可配置图标颜色',
    value: 'backTopIconColor = "red"',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '可配置背景颜色',
    value: 'backTopBackgroundColor = "#000"',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '可配置不透明度',
    value: 'backTopOpacity = 0.4',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '其他配置',
    value: '请参见页面配置项',
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
  enableBackTop = true;

  backTopIconColor = 'red';

  backTopBackgroundColor = '#000';

  backTopOpacity = 0.4;

  headerData = {
    id: 'Normal',
    name: '普通视图',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <View style={{ height: transformSize(1800), backgroundColor: '#ccc' }}>
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

        <Card header="备注" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            useBackground={false}
            list={[
              {
                text: '仅在默认容器模式下可以使用',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
