import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Card, DataGrid, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

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
    label: '质保',
    value: '21天',
  },
  {
    span: 2,
    label: '奶源',
    value: '新疆',
  },
  {
    span: 2,
    label: '厂家',
    value: 'XXXX食品有限公司',
  },
  {
    span: 2,
    label: '供应',
    value: '浙江省XX市',
  },
];

const longText =
  '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本';

const longTextListData = [
  {
    span: 'fill',
    label: '仅一行',
    value: longText,
  },
  {
    span: 'fill',
    label: '仅两行',
    value: longText,
    ellipsisLine: 2,
  },
  {
    span: 'fill',
    label: '设置行高',
    value: longText,
    ellipsisLine: 2,
    ellipsisLineHeight: transformSize(60),
    ellipsisHeight: transformSize(120),
  },
  {
    span: 'fill',
    label: '全展示',
    value: longText,
    ellipsis: false,
  },
];

const alignTopListData = [
  {
    span: 'fill',
    label: '长文本',
    value: longText,
    ellipsis: false,
  },
];

export default class Index extends ContentPageBase {
  headerData = {
    id: 'DataGrid',
    name: '数据表格',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="列布局"
          style={style}
          headerStyle={cardHeaderStyle}
          extra="2列"
        >
          <DataGrid
            list={list}
            border
            column={2}
            size="small"
            labelStyle={{ width: transformSize(80) }}
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>

        <Card
          header="无边框列"
          style={style}
          headerStyle={cardHeaderStyle}
          extra="3列"
        >
          <DataGrid
            list={list}
            border={false}
            column={3}
            size="small"
            labelStyle={{ width: transformSize(80) }}
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>

        <Card
          header="长文本展示"
          style={style}
          headerStyle={cardHeaderStyle}
          extra="3列"
        >
          <DataGrid
            list={longTextListData}
            column={3}
            size="small"
            labelStyle={{ width: transformSize(140) }}
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>

        <Card
          header="顶部对齐"
          style={style}
          headerStyle={cardHeaderStyle}
          extra="3列"
        >
          <DataGrid
            list={alignTopListData}
            column={3}
            size="small"
            labelStyle={{ width: transformSize(140) }}
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
            columnVerticalAlign="flex-start"
          />
        </Card>

        <Card header="行布局" style={style} headerStyle={cardHeaderStyle}>
          <DataGrid
            list={list}
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
