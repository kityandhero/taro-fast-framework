import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import {
  Space,
  Popover,
  Button,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {
  style: {},
  position: 'top',
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
  panelPaddingLeft: 50,
  panelPaddingRight: 50,
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
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['panel']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Popover.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
