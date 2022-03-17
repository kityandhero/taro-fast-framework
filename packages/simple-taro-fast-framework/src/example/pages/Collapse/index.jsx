import { Space, Collapse } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const list = [
  {
    label: '标题1',
    body: '面板1',
  },
  {
    label: '标题2',
    body: '面板2',
  },
  {
    label: '标题3',
    body: '面板3',
  },
];

const config1 = {
  list,
};

const config2 = {
  single: true,
  list: [
    {
      label: '标题1',
      body: '面板1',
    },
    {
      label: '标题2',
      body: '面板2',
    },
    {
      label: '标题3',
      body: '面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3',
    },
  ],
};

const config3 = {
  single: true,
  list,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '折叠面板',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Collapse',
    name: '折叠面板',
    description: '折叠面板组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="基本展示" space={false}>
          <Collapse {...config1} />
        </SimpleBox>

        <SimpleBox header="唯一展开" space={false}>
          <Collapse {...config2} />
        </SimpleBox>

        <SimpleBox header="禁用" space={false}>
          <Collapse {...config3} />
        </SimpleBox>

        <PropertyBox config={Collapse.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
