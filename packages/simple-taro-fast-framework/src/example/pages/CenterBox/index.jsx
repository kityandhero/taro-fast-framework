import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { CenterBox, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
};

const containorStyle = {
  height: transformSize(400),
  backgroundColor: '#ccc',
};

const config1 = {
  style: containorStyle,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '居中容器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'CenterBox',
    name: '居中容器',
    description: '居中容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '布局展示',
        currentConfig: config1,
        inner: <View style={boxStyle}></View>,
        wrapBuilder: (o) => {
          return <View style={containorStyle}>{o}</View>;
        },
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '布局展示',
        config: config1,
        inner: <View style={boxStyle}></View>,
        wrapBuilder: (o) => {
          return <View style={containorStyle}>{o}</View>;
        },
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <CenterBox key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </CenterBox>
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
          componentName="CenterBox"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={CenterBox.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
