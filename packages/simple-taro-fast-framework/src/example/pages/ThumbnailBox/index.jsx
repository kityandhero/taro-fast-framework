import { View } from '@tarojs/components';

import { Space, ThumbnailBox } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const boxStyle = {
  backgroundColor: '',
};

const contentText =
  '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字';

const config1 = {
  expandText: '展开',
  shrinkText: '收缩',
};

const config2 = {
  repeatShrink: true,
};

const config3 = {
  height: 400,
  repeatShrink: true,
};

const config4 = {
  backgroundColor: 'blue',
  repeatShrink: true,
};

const config5 = {
  actionBackgroundColor: 'blue',
  repeatShrink: true,
};

const config6 = {
  actionColor: 'green',
  repeatShrink: true,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '缩略容器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ThumbnailBox',
    name: '缩略容器',
    description: '缩略容器组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="简单使用"
          componentName="ThumbnailBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={boxStyle}>
            <ThumbnailBox>{contentText}</ThumbnailBox>
          </View>
        </SimpleBox>

        <SimpleBox
          header="设置文字"
          config={config1}
          componentName="ThumbnailBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={boxStyle}>
            <ThumbnailBox {...config1}>{contentText}</ThumbnailBox>
          </View>
        </SimpleBox>

        <SimpleBox
          header="可收缩"
          config={config2}
          componentName="ThumbnailBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={boxStyle}>
            <ThumbnailBox {...config2}>{contentText}</ThumbnailBox>
          </View>
        </SimpleBox>

        <SimpleBox
          header="设置收缩高度"
          config={config3}
          componentName="ThumbnailBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={boxStyle}>
            <ThumbnailBox {...config3}>{contentText}</ThumbnailBox>
          </View>
        </SimpleBox>

        <SimpleBox
          header="背景"
          config={config4}
          componentName="ThumbnailBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={boxStyle}>
            <ThumbnailBox {...config4}>{contentText}</ThumbnailBox>
          </View>
        </SimpleBox>

        <SimpleBox
          header="操作栏背景"
          config={config5}
          componentName="ThumbnailBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={boxStyle}>
            <ThumbnailBox {...config5}>{contentText}</ThumbnailBox>
          </View>
        </SimpleBox>

        <SimpleBox
          header="操作栏颜色"
          config={config6}
          componentName="ThumbnailBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={boxStyle}>
            <ThumbnailBox {...config6}>{contentText}</ThumbnailBox>
          </View>
        </SimpleBox>

        <PropertyBox config={ThumbnailBox.defaultProps} labelWidth={310} />
      </Space>
    );
  };
}
