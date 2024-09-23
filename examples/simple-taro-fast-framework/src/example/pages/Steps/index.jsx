import { connect } from 'easy-soft-dva';

import { IconVolumePlus, Space, Steps } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const config1 = {
  list: [
    {
      title: '标题1',
      description: '描述',
      status: 'finish',
    },
    {
      title: '标题2',
      description: '描述',
      status: 'process',
    },
    {
      title: '标题3',
      description: '描述',
      status: 'wait',
    },
  ],
};

const config2 = {
  list: [
    {
      title: '第一步',
      status: 'finish',
    },
    {
      title: '第二步',
      status: 'error',
    },
    {
      title: '第三步',
    },
  ],
};

const config3 = {
  direction: 'vertical',
  list: [
    {
      title: '填写机构信息',
      status: 'finish',
    },
    {
      title: '签约机构',
      status: 'process',
    },
    {
      title: '关联服务区',
      status: 'wait',
    },
  ],
};

const config4 = {
  direction: 'vertical',
  list: [
    {
      title: '填写机构信息',
      status: 'finish',
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
      status: 'finish',
    },
    {
      title: '签约机构',
      description: '这里是一些描述',
      icon: <IconVolumePlus size={34} />,
      status: 'finish',
    },
    {
      title: '关联服务区',
      description: '这里是一些描述',
      icon: <IconVolumePlus size={34} />,
      status: 'process',
    },
  ],
};

const config6 = {
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
      status: 'finish',
    },
    {
      title: '签约机构',
      description: '这里是一些描述',
      icon: <IconVolumePlus size={34} />,
      status: 'finish',
    },
    {
      title: '关联服务区',
      description: '这里是一些描述',
      icon: <IconVolumePlus size={34} />,
      status: 'process',
    },
  ],
  titleBuilder: (o) => {
    const { title } = o;

    return `${title}-${title}`;
  },
  descriptionBuilder: (o) => {
    const { description } = o;

    return `${description}-${description}`;
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '步骤条',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Steps',
    name: '步骤条',
    description: '步骤条组件',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      header: '横向',
      currentConfig: config1,
    };
  }

  establishControlList = () => {
    return [
      {
        header: '横向',
        config: config1,
      },
      {
        header: '横向 (失败状态)',
        config: config2,
      },
      {
        header: '纵向',
        config: config3,
      },
      {
        header: '纵向 (失败状态)',
        config: config4,
      },
      {
        header: '自定义图标和大小',
        config: config5,
      },
      {
        header: '自定义构建',
        config: config6,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Steps key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Steps>
    );
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="Steps"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Steps.defaultProps} labelWidth={280} />
      </Space>
    );
  };
}
