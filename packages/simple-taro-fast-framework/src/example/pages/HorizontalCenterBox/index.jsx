import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { HorizontalCenterBox, Space } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const containorStyle = {
  border: `${transformSize(2)} solid #ccc`,
  height: transformSize(200),
};

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
  margin: transformSize(20),
};

const horizontalCenterBoxStyle = {
  backgroundColor: '#ccc',
};

const config1 = {
  style: horizontalCenterBoxStyle,
};

const config2 = {
  style: horizontalCenterBoxStyle,
  fillHeight: false,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '水平居中',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'HorizontalCenterBox',
    name: '水平居中',
    description: '水平居中',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      header: '默认布局',
      currentConfig: config1,
      inner: <View style={boxStyle}></View>,
      wrapBuilder: (o) => {
        return <View style={containorStyle}>{o}</View>;
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '默认布局',
        config: config1,
        inner: <View style={boxStyle}></View>,
        wrapBuilder: (o) => {
          return <View style={containorStyle}>{o}</View>;
        },
      },
      {
        header: '不自动使用父级高度',
        config: config2,
        inner: <View style={boxStyle}></View>,
        wrapBuilder: (o) => {
          return <View style={containorStyle}>{o}</View>;
        },
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <HorizontalCenterBox key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </HorizontalCenterBox>
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
          componentName="HorizontalCenterBox"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox
          config={HorizontalCenterBox.defaultProps}
          labelWidth={240}
        />
      </Space>
    );
  };
}
