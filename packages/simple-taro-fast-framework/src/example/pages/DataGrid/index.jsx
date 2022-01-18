import { View } from '@tarojs/components';

import { Card, DataGrid } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const list = [
  {
    label: '品名',
    value: '酸奶',
  },
  {
    label: '产地',
    value: '杭州',
  },
  {
    label: '酸度',
    value: '普通',
  },
  {
    label: '保质期',
    value: '21天',
  },
  {
    span: 2,
    label: '奶源',
    value: '新疆',
  },
  {
    span: 2,
    label: '生产厂家',
    value: 'XXXX食品有限公司',
  },
  {
    span: 2,
    label: '供应地区',
    value: '浙江省杭州市',
  },
];

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="布局展示 column : 2" headerStyle={cardHeaderStyle}>
          <DataGrid
            list={list}
            bordered
            column={2}
            size="small"
            labelStyle={{ width: '80rpx' }}
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>

        <Card header="布局展示 column : 3" headerStyle={cardHeaderStyle}>
          <DataGrid
            list={list}
            bordered={false}
            column={3}
            size="small"
            labelStyle={{ width: '80rpx' }}
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>
      </View>
    );
  }
}
