import { transformSize } from 'taro-fast-common/es/utils/tools';
import { DataGrid, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

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

const config1 = {
  list,
  border: true,
  column: 2,
  size: 'small',
  labelStyle: { width: transformSize(80) },
  emptyValue: '暂无',
  emptyStyle: { color: '#ccc' },
};

const config2 = {
  list,
  border: false,
  column: 3,
  size: 'small',
  labelStyle: { width: transformSize(80) },
  emptyValue: '暂无',
  emptyStyle: { color: '#ccc' },
};

const config3 = {
  list: longTextListData,
  column: 3,
  size: 'small',
  labelStyle: { width: transformSize(140) },
  emptyValue: '暂无',
  emptyStyle: { color: '#ccc' },
};

const config4 = {
  list: alignTopListData,
  column: 3,
  size: 'small',
  labelStyle: { width: transformSize(140) },
  emptyValue: '暂无',
  emptyStyle: { color: '#ccc' },
  columnVerticalAlign: 'flex-start',
};

const config5 = {
  list,
  border: true,
  layout: 'row',
  size: 'small',
  emptyValue: '暂无',
  emptyStyle: { color: '#ccc' },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '数据表格',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'DataGrid',
    name: '数据表格',
    description: '数据表格组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="列布局"
          extra="2列"
          config={config1}
          componentName="DataGrid"
          mockChildren={false}
          useInnerBox={false}
        >
          <DataGrid {...config1} />
        </SimpleBox>

        <SimpleBox
          header="无边框列"
          extra="3列"
          config={config2}
          componentName="DataGrid"
          mockChildren={false}
          useInnerBox={false}
        >
          <DataGrid {...config2} />
        </SimpleBox>

        <SimpleBox
          header="长文本展示"
          extra="3列"
          config={config3}
          componentName="DataGrid"
          mockChildren={false}
          useInnerBox={false}
        >
          <DataGrid {...config3} />
        </SimpleBox>

        <SimpleBox
          header="顶部对齐"
          extra="3列"
          config={config4}
          componentName="DataGrid"
          mockChildren={false}
          useInnerBox={false}
        >
          <DataGrid {...config4} />
        </SimpleBox>

        <SimpleBox
          header="行布局"
          extra="3列"
          config={config5}
          componentName="DataGrid"
          mockChildren={false}
          useInnerBox={false}
        >
          <DataGrid {...config5} />
        </SimpleBox>

        <PropertyBox config={DataGrid.defaultProps} labelWidth={280} />
      </Space>
    );
  };
}
