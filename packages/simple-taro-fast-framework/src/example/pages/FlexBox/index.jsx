import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  FlexBox,
  Space,
  ImageBox,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import { colStyle } from '../../..//customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'FlexBox',
    name: '自动布局',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="仅左侧布局"
          config={config1}
          componentName="FlexBox"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['left']}
        >
          <FlexBox {...config1} />
        </SimpleBox>

        <SimpleBox
          header="左侧自动布局"
          config={config2}
          componentName="FlexBox"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['left', 'right']}
        >
          <FlexBox {...config2} />
        </SimpleBox>

        <SimpleBox
          header="右侧自自动布局"
          config={config3}
          componentName="FlexBox"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['left', 'right']}
        >
          <FlexBox {...config3} />
        </SimpleBox>

        <SimpleBox
          header="上下自动布局 , 下部固定高度"
          config={config4}
          componentName="FlexBox"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['top', 'bottom']}
        >
          <FlexBox {...config4} />
        </SimpleBox>

        <SimpleBox
          header="上下自动布局 , 上部固定高度"
          config={config5}
          componentName="FlexBox"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['top', 'bottom']}
        >
          <FlexBox {...config5} />
        </SimpleBox>

        <PropertyBox config={FlexBox.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
