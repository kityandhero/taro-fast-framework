import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { CenterBox, FlexBox, ImageBox, Space } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';
import { colStyle } from '../../../customConfig';

const src =
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21052112102250D-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643989392&t=18546318aa0f8e3e126ab26965ca6f45';

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
};

const autoStyle = {
  height: transformSize(80),
  backgroundColor: '#ccc',
};

const config1 = {
  left: <View style={boxStyle}></View>,
};

const config2 = {
  flexAuto: 'left',
  leftStyle: colStyle,
  left: <CenterBox fillWidth>自动适应内容</CenterBox>,
  rightStyle: { paddingLeft: transformSize(10) },
  right: (
    <View style={{ width: transformSize(100) }}>
      <ImageBox circle src={src} />
    </View>
  ),
};

const config3 = {
  flexAuto: 'right',
  alignItem: 'stretch',
  leftStyle: { paddingRight: transformSize(10) },
  left: (
    <View style={{ width: transformSize(100) }}>
      <ImageBox src={src} />
    </View>
  ),
  rightStyle: colStyle,
  right: <CenterBox fillWidth>自动适应内容</CenterBox>,
};

const config4 = {
  flexAuto: 'top',
  verticalHeight: 300,
  top: <View style={{ ...autoStyle, ...{ width: '100%', height: '100%' } }} />,
  bottom: (
    <View
      style={{
        ...boxStyle,
        ...{ width: '100%', height: transformSize(80) },
      }}
    />
  ),
};

const config5 = {
  flexAuto: 'bottom',
  verticalHeight: 300,
  top: (
    <View
      style={{
        ...autoStyle,
        ...{ width: '100%', height: transformSize(80) },
      }}
    />
  ),
  bottom: (
    <View
      style={{
        ...boxStyle,
        ...{ width: '100%', height: '100%' },
      }}
    />
  ),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'Flex布局',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'FlexBox',
    name: '自动布局',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '仅左侧布局',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '仅左侧布局',
        config: config1,
      },
      {
        header: '左侧自动布局',
        config: config2,
      },
      {
        span: 2,
        header: '右侧自自动布局',
        config: config3,
      },
      {
        span: 2,
        header: '上下自动布局 , 下部固定高度',
        config: config4,
      },
      {
        span: 2,
        header: '上下自动布局 , 上部固定高度',
        config: config5,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <FlexBox key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </FlexBox>
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
          ignorePropertyList={['icon', 'top', 'bottom', 'left', 'right']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={FlexBox.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
