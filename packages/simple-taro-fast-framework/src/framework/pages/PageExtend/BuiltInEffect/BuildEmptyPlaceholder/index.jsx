import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  DataGrid,
  Divider,
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

const paramList = [
  {
    label: 'icon',
    value: '以内置图标显示提示, string, 默认值 "alert-circle"',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'iconSize',
    value: '图标大小, number, 默认值 180',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'iconStyle',
    value: '图标样式, style, 默认值 {}',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'image',
    value: '以图片链接显示提示, string, 默认值 ""',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'imageStyle',
    value: '图标样式, style, 默认值 {}',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'description',
    value: '下方描述, string, 默认值 "暂无数据"',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'onImageClick',
    value: '图片/图标点击回调',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'onDescriptionClick',
    value: '描述点击回调',
    ellipsis: false,
    canCopy: true,
  },
];

const descriptionList = [
  {
    label: '调用方法',
    value: 'this.buildEmptyPlaceholder({ description: "提示文字" })',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '支持自定义重载',
    value: '重载覆写函数 buildEmptyPlaceholder = () => { return null; }',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'buildEmptyPlaceholder',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'buildEmptyPlaceholder',
    name: '',
    description: '构建空数据占位',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="样式展示" style={style} headerStyle={cardHeaderStyle}>
          {this.buildEmptyPlaceholder({})}

          <Divider />

          {this.buildEmptyPlaceholder({
            description: '还没有数据哦',
          })}
        </Card>

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

        <Card header="可用参数" style={style} headerStyle={cardHeaderStyle}>
          <DataGrid
            list={paramList}
            border
            size="small"
            column={1}
            emptyValue="暂无"
            labelStyle={{ width: transformSize(240) }}
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>
      </Space>
    );
  };
}
