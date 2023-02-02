import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import {
  Card,
  CenterBox,
  DataGrid,
  HelpBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../../../customComponents/ContentPageBase';
import {
  cardHeaderStyle,
  cardStyle,
} from '../../../../../customConfig/constants';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const descriptionList = [
  {
    label: '配置UpperBox区域渲染',
    value: '重载渲染函数 buildUpperBox = () => { return <View></View> }',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '上部区域',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'UpperBox',
    name: '使用上部区域',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{},
    };
  }

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

        <Card header="备注" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            useBackground={false}
            list={[
              {
                text: 'UpperBox区域参与页面滚动, 与scroll模式下有区别',
              },
              {
                text: '在默认容器模式下用途不大',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
