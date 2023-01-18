import { connect } from 'easy-soft-dva';

import { Divider, Space } from 'taro-fast-component/es/customComponents';

import CodePageBox from '../../../../../customComponents/CodePageBox';
import ContentPageBase from '../../../../../customComponents/ContentPageBase';

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

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'buildEmptyPlaceholder',
    name: '',
    description: '构建空数据占位',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <CodePageBox
          list={paramList}
          usageList={descriptionList}
          renderCodeList={[
            'this.buildEmptyPlaceholder({})',
            `this.buildEmptyPlaceholder({description: '还没有数据哦'})`,
          ]}
        >
          {this.buildEmptyPlaceholder({})}

          <Divider />

          {this.buildEmptyPlaceholder({
            description: '还没有数据哦',
          })}
        </CodePageBox>
      </Space>
    );
  };
}
