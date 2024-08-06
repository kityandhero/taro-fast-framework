import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { CenterBox, ExtraBox, FixedBox, Space } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const configCore = {
  style: {
    backgroundColor: 'red',
    height: transformSize(80),
  },
  extraContainerStyle: {
    backgroundColor: 'blue',
    paddingLeft: transformSize(20),
    paddingRight: transformSize(20),
  },
  extraWidth: 'auto',
  extra: <View>extra</View>,
  onExtraClick: () => {
    console.log('click');
  },
};

const config1 = {
  ...configCore,
};

const config2 = {
  ...configCore,

  extraPosition: 'left',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'ExtraBox布局',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'ExtraBox',
    name: '附带额外区域的容器',
    description: '附带额外区域的容器',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      showTransition: true,
      header: '布局展示',
      currentConfig: config1,
      inner: <CenterBox>children</CenterBox>,
    };
  }

  establishControlList = () => {
    return [
      {
        header: 'Extra右侧展示',
        config: config1,
        inner: <CenterBox>children</CenterBox>,
      },
      {
        header: 'Extra左侧展示',
        config: config2,
        inner: <CenterBox>children</CenterBox>,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <ExtraBox
        key={key}
        {...{
          ...config,
        }}
      >
        {this.buildSimpleItemInner(inner || '内部内容')}
      </ExtraBox>
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
          componentName="FlexBox"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={FixedBox.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
