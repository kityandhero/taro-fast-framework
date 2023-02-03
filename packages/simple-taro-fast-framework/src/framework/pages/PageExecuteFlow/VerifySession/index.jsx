import { connect } from 'easy-soft-dva';

import { Space } from 'taro-fast-component';

import { CodePageBox, ContentPageBase } from '../../../../customComponents';

const configList = [
  {
    label: 'verifySession',
    value: '开启 session 检测校验',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'verify session',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'verifySession',
    name: '校验session',
    description: '控制是否校验session',
  };

  verifySession = true;

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <CodePageBox
          list={configList}
          config={{
            verifySession: true,
          }}
        />
      </Space>
    );
  };
}
