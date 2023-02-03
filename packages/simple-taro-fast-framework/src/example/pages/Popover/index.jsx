import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { Button, CenterBox, Popover, Space } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const config1 = {
  style: {},
  position: 'top',
  panel: (
    <View
      style={{
        height: '100%',
      }}
    >
      <CenterBox>111</CenterBox>
    </View>
  ),
  height: 60,
  fillWidth: false,
  panelWidth: 300,
  panelBorderRadius: 10,
};

const config11 = {
  style: {},
  position: 'top',
  panel: (
    <View
      style={{
        width: transformSize(100),
        height: '100%',
      }}
    >
      <CenterBox>111</CenterBox>
    </View>
  ),
  height: 80,
  fillWidth: true,
  panelBorderRadius: 20,
  panelPaddingLeft: 50,
  panelPaddingRight: 50,
};

const config12 = {
  style: {},
  position: 'top',
  panel: (
    <View
      style={{
        height: '100%',
      }}
    >
      <CenterBox>111</CenterBox>
    </View>
  ),
  height: 60,
  fillWidth: false,
  panelWidth: 300,
  panelBorderRadius: 10,
  backgroundColor: '#e34523',
};

const config13 = {
  style: {},
  position: 'top',
  panel: (
    <View
      style={{
        height: '100%',
      }}
    >
      <CenterBox>111</CenterBox>
    </View>
  ),
  height: 60,
  fillWidth: false,
  panelWidth: 300,
  panelBorderRadius: 10,
  backgroundColor: '#e34523',
  panelShadow: true,
  panelShadowColor: '#e34523',
};

const config14 = {
  style: {},
  position: 'top',
  panel: (
    <View
      style={{
        width: transformSize(100),
        height: '100%',
      }}
    >
      <CenterBox>111</CenterBox>
    </View>
  ),
  height: 60,
  fillWidth: false,
  panelWidth: 300,
  panelAlign: 'left',
  panelBorderRadius: 10,
};

const config15 = {
  style: {},
  position: 'top',
  panel: (
    <View
      style={{
        width: transformSize(100),
        height: '100%',
      }}
    >
      <CenterBox>111</CenterBox>
    </View>
  ),
  height: 60,
  fillWidth: false,
  panelWidth: 300,
  panelAlign: 'right',
  panelBorderRadius: 10,
};

const config2 = {
  style: {},
  position: 'bottom',
  panel: (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <CenterBox>111</CenterBox>
    </View>
  ),
  height: 400,
  backgroundColor: '#ccceee',
  panelShadowColor: '#ccceee',
  panelPaddingLeft: 50,
  panelPaddingRight: 50,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '徽记',
});

const innerComponent = <Button>按钮</Button>;

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Popover',
    name: '弹出面板',
    description: '弹出面板组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '文字',
        currentConfig: config1,
        inner: innerComponent,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '上部弹出',
        config: config1,
        inner: innerComponent,
      },
      {
        header: '上部弹出 [左对齐]',
        config: config14,
        inner: innerComponent,
      },
      {
        header: '上部弹出 [右对齐]',
        config: config15,
        inner: innerComponent,
      },
      {
        header: '上部弹出 [背景色]',
        config: config12,
        inner: innerComponent,
      },
      {
        header: '上部弹出 [阴影轮廓]',
        config: config13,
        inner: innerComponent,
      },
      {
        header: '上部弹出 [屏宽模式]',
        config: config11,
        inner: innerComponent,
      },
      {
        header: '下部弹出',
        config: config2,
        inner: innerComponent,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Popover key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Popover>
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
          componentName="Popover"
          mockChildren={!!inner}
          useInnerBox
          innerBoxMinHeight={300}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['panel']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Popover.defaultProps} labelWidth={290} />
      </Space>
    );
  };
}
