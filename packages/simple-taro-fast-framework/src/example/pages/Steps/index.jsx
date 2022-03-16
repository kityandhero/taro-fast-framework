import { Steps, Icon, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const { Step } = Steps;
const { IconVolumePlus } = Icon;

const config1 = {
  list: [
    {
      title: '标题1',
      description: '描述',
    },
    {
      title: '标题2',
      description: '描述',
    },
    {
      title: '标题3',
      description: '描述',
    },
  ],
  listStatus: ['finish', 'process', 'wait'],
};

const config2 = {
  list: [
    {
      title: '第一步',
    },
    {
      title: '第二步',
    },
    {
      title: '第三步',
    },
  ],
  listStatus: ['finish', 'error'],
};

const config3 = {
  direction: 'vertical',
  list: [
    {
      title: '填写机构信息',
    },
    {
      title: '签约机构',
    },
    {
      title: '关联服务区',
    },
  ],
  listStatus: ['finish', 'process', 'wait'],
};

const config4 = {
  direction: 'vertical',
  list: [
    {
      title: '填写机构信息',
      status: 'process',
      description: '完成时间: 2020-12-01 12:30',
    },
    {
      title: '签约机构',
      status: 'finish',
      description: '完成时间: 2020-12-01 12:30',
    },
    {
      title: '关联服务区',
      status: 'finish',
      description: '完成时间: 2020-12-01 12:30',
    },
    {
      title: '审批失败',
      status: 'error',
    },
  ],
  listStatus: ['finish', 'finish', 'finish', 'error'],
};

const config5 = {
  direction: 'vertical',
  current: 1,
  titleFontSize: 28,
  descriptionFontSize: 26,
  indicatorMarginRight: 12,
  iconSize: 20,
  list: [
    {
      title: '填写机构信息',
      description: '这里是一些描述',
      icon: <IconVolumePlus size={34} />,
    },
    {
      title: '签约机构',
      description: '这里是一些描述',
      icon: <IconVolumePlus size={34} />,
    },
    {
      title: '关联服务区',
      description: '这里是一些描述',
      icon: <IconVolumePlus size={34} />,
    },
  ],
  listStatus: ['finish', 'finish', 'process'],
};

const config6 = {
  dotColor: '#3ee63e',
  list: [
    {
      title: '标题1',
      description: '描述',
    },
    {
      title: '标题2',
      description: '描述',
    },
    {
      title: '标题3',
      description: '描述',
    },
  ],
  listStatus: ['finish', 'process', 'wait'],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '步骤条',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Steps',
    name: '步骤条',
    description: '步骤条组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="横向" config={config1}>
          <Steps {...config1} />
        </SimpleBox>

        <SimpleBox header="设置颜色" config={config6}>
          <Steps {...config6} />
        </SimpleBox>

        <SimpleBox header="横向（失败状态）" config={config2}>
          <Steps {...config2} />
        </SimpleBox>

        <SimpleBox header="纵向" config={config3}>
          <Steps {...config3} />
        </SimpleBox>

        <SimpleBox header="纵向（失败状态）" config={config4}>
          <Steps {...config4} />
        </SimpleBox>

        <SimpleBox header="自定义图标和大小" config={config5}>
          <Steps {...config5} />
        </SimpleBox>

        <PropertyBox
          header="Steps 可配置项以及默认值"
          config={Steps.defaultProps}
          labelWidth={280}
        />

        <PropertyBox
          header="Step 可配置项以及默认值"
          config={Step.defaultProps}
          labelWidth={150}
        />
      </Space>
    );
  };
}
