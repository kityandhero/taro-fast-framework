import { Space, Loading } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {};

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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Loading',
    name: '加载提示',
    description: '加载提示组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '基础使用',
        currentConfig: {},
      },
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
        {inner}
      </Loading>
    );
  };

  renderContent = () => {
    const { header, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
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
