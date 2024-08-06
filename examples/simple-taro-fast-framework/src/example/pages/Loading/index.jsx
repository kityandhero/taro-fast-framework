import { connect } from 'easy-soft-dva';

import { Loading, Space } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const config1 = {
  type: 'comet',
};

const config2 = {
  color: '#4589e1',
};

const config3 = {
  size: 48,
};

const config4 = {
  borderWidth: 8,
  size: 60,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '加载提示',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Loading',
    name: '加载提示',
    description: '加载提示组件',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      header: '基础使用',
      currentConfig: {},
    };
  }

  establishControlList = () => {
    return [
      {
        header: '基础使用',
        config: {},
      },
      {
        header: '设置图标',
        config: config1,
      },
      {
        header: '设置颜色',
        config: config2,
      },
      {
        header: '设置大小',
        config: config3,
      },
      {
        header: '设置线条宽度',
        config: config4,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Loading key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Loading>
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
          componentName="Loading"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox
          header="Loading 可配置项以及默认值"
          config={Loading.defaultProps}
          labelWidth={270}
        />
      </Space>
    );
  };
}
