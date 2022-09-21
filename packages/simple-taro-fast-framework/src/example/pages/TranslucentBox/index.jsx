import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  CenterBox,
  Space,
  TranslucentBox,
} from 'taro-fast-component/es/customComponents';
import { connect } from 'taro-fast-framework/es/utils/dva';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const boxStyle = {
  height: transformSize(220),
  backgroundImage: 'var(--tfc-color-gradual-red)',
};

const textBoxStyle = {
  padding: `${transformSize(10)} ${transformSize(20)}`,
  color: '#fff',
};

const config1 = {
  style: {
    width: transformSize(200),
  },
  backgroundColor: '#000',
  alpha: 0.1,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '半透明容器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'TranslucentBox',
    name: '半透明容器',
    description: '半透明容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '默认',
        currentConfig: config1,
        inner: <CenterBox style={textBoxStyle}>内容</CenterBox>,
        wrapBuilder: (o) => {
          return (
            <View style={boxStyle}>
              <CenterBox>{o}</CenterBox>
            </View>
          );
        },
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '默认',
        config: config1,
        inner: <CenterBox style={textBoxStyle}>内容</CenterBox>,
        wrapBuilder: (o) => {
          return (
            <View style={boxStyle}>
              <CenterBox>{o}</CenterBox>
            </View>
          );
        },
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <TranslucentBox key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </TranslucentBox>
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
          componentName="TranslucentBox"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon', 'top', 'bottom', 'left', 'right']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={TranslucentBox.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
