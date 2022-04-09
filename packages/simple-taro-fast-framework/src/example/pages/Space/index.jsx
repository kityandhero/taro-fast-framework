import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { Space, Button, Line } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

import './index.less';

function buildButtonList(size, props) {
  return new Array(size).fill(null).map((_, index) => (
    <Button key={index} {...props}>
      Button
    </Button>
  ));
}

const config1 = {
  size: 24,
};

const config2 = {
  size: [8, 26],
  wrap: true,
};

const config3 = {
  direction: 'vertical',
};

const config4 = {
  wrap: true,
};

const config5 = {
  direction: 'vertical',
  fillWidth: true,
};

const config6 = {
  split: <Line direction="vertical" width={2} height={40} />,
};

const config7 = {
  align: 'center',
};

const config8 = {
  align: 'start',
};

const config9 = {
  align: 'end',
};

const config10 = {
  align: 'baseline',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '间隔布局',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Space',
    name: '间隔布局',
    description: '间隔布局组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '默认',
        currentConfig: {},
        inner: buildButtonList(4),
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '基本用法',
        config: {},
        inner: buildButtonList(4),
      },
      {
        header: '设定间隔',
        config: config1,
        inner: buildButtonList(3),
      },
      {
        header: '自动换行',
        config: config4,
        inner: buildButtonList(8),
      },
      {
        header: '设定双向间隔',
        config: config2,
        inner: buildButtonList(10),
      },
      {
        header: '设定方向',
        config: config3,
        inner: buildButtonList(4),
      },
      {
        header: '设定方向 center',
        config: config7,
        inner: [
          'text',
          <Button key="start-2" type="primary">
            Primary
          </Button>,
          <View key="start-3" className="mock-block">
            Block
          </View>,
        ],
        wrapBuilder: (one) => {
          return <View className="space-align-block">{one}</View>;
        },
      },
      {
        header: '设定方向 start',
        config: config8,
        inner: [
          'text',
          <Button key="start-2" type="primary">
            Primary
          </Button>,
          <View key="start-3" className="mock-block">
            Block
          </View>,
        ],
        wrapBuilder: (one) => {
          return <View className="space-align-block">{one}</View>;
        },
      },
      {
        header: '设定方向 end',
        config: config9,
        inner: [
          'text',
          <Button key="start-2" type="primary">
            Primary
          </Button>,
          <View key="start-3" className="mock-block">
            Block
          </View>,
        ],
        wrapBuilder: (one) => {
          return <View className="space-align-block">{one}</View>;
        },
      },
      {
        header: '设定方向 baseline',
        config: config10,
        inner: [
          'text',
          <Button key="start-2" type="primary">
            Primary
          </Button>,
          <View key="start-3" className="mock-block">
            Block
          </View>,
        ],
        wrapBuilder: (one) => {
          return <View className="space-align-block">{one}</View>;
        },
      },
      {
        header: '占满父级宽度',
        config: config5,
        inner: buildButtonList(3, {
          block: true,
          color: 'primary',
          size: 'large',
        }),
      },
      {
        header: '自定义间隔',
        config: config6,
        inner: buildButtonList(3),
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Space key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Space>
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
          componentName="Space"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon', 'split']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Space.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
