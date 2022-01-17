import { View } from '@tarojs/components';

import { formatTarget } from 'taro-fast-common/es/utils/tools';
import { formatCollection } from 'taro-fast-common/es/utils/constants';
import { Card, DataGrid } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const list = [
  {
    label: '姓名',
    value: '张恒豫',
  },
  {
    label: '性别',
    value: '男',
  },
  {
    label: '性别',
    value: '男',
  },
  {
    label: '生日',
    value: formatTarget('1988-09-14', formatCollection.datetime),
  },
  {
    span: 2,
    label: '籍贯',
    value: '北京',
  },
  {
    span: 2,
    label: '邮箱',
    value: '452346363@abc.com',
  },
  {
    span: 2,
    label: '地址',
    value: '北京市西城区西四胡同',
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
