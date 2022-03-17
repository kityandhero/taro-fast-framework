import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Icon,
  ImageBox,
  ColorText,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';
import logoImg from '../../../assets/images/logo.png';

const { IconEdit } = Icon;

const config1 = {
  textPrefix: '前缀',
  text: '文本文字',
};

const config2 = {
  textPrefix: '前缀',
  separator: '@',
  text: '文本文字',
};

const config3 = {
  textPrefix: '前缀',
  separator: '@',
  text: '文本文字',
  canCopy: true,
};

const config4 = {
  textPrefix: '前缀',
  separator: '@',
  text: '文本文字',
  canCopy: true,
  copySuccessCallback: (v) => {
    console.log(`copySuccessCallback: ${v}`);
  },
};

const config5 = {
  textPrefix: '前缀',
  text: '文本文字',
  color: '#e54321',
};

const config6 = {
  textPrefix: '前缀',
  text: '文本文字',
  randomColor: true,
  randomSeed: 43,
  seedOffset: 23,
};

const config7 = {
  textPrefix: '前缀',
  text: '文本文字',
  textPrefixStyle: { color: '#67ca31' },
};

const config8 = {
  icon: <IconEdit size={32} color="#ff3ce7" />,
  text: '文本文字',
};

const config9 = {
  icon: (
    <View style={{ width: transformSize(40) }}>
      <ImageBox circle src={logoImg} />
    </View>
  ),
  text: '文本文字',
};

const config10 = {
  textPrefix: '前缀',
  text: '文本文字',
  separatorStyle: {
    color: '#67ca31',
    margin: `0 ${transformSize(24)}`,
  },
};

const config11 = {
  icon: <IconEdit size={30} color="#ff3ce7" />,
  textPrefix: '前缀',
  text: '文本文字',
  separatorStyle: {
    color: '#67ca31',
    margin: `0 ${transformSize(24)}`,
  },
};

const config12 = {
  icon: <Icon size={40} color="#ff3ce7" value={logoImg} imageMode />,
  text: '文本文字',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '文字渲染',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ColorText',
    name: '文字渲染',
    description: '文字渲染',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="一般用法"
          config={config1}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config1} />
        </SimpleBox>

        <SimpleBox
          header="自定义分隔符"
          config={config2}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config2} />
        </SimpleBox>

        <SimpleBox
          header="点击复制"
          config={config3}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config3} />
        </SimpleBox>

        <SimpleBox
          header="点击复制并进行回调 [查看控制台]"
          config={config4}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config4} />
        </SimpleBox>

        <SimpleBox
          header="颜色"
          config={config5}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config5} />
        </SimpleBox>

        <SimpleBox
          header="随机颜色"
          config={config6}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config6} />
        </SimpleBox>

        <SimpleBox
          header="前缀样式"
          config={config7}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config7} />
        </SimpleBox>

        <SimpleBox
          header="附带内置图标"
          config={config8}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config8} />
        </SimpleBox>

        <SimpleBox
          header="附带图片图标"
          config={config8}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config12} />
        </SimpleBox>

        <SimpleBox
          header="附带图片"
          config={config9}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config9} />
        </SimpleBox>

        <SimpleBox
          header="分隔符样式"
          config={config10}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config10} />
        </SimpleBox>

        <SimpleBox
          header="复杂样例"
          config={config11}
          componentName="ColorText"
          mockChildren={false}
          useInnerBox
        >
          <ColorText {...config11} />
        </SimpleBox>

        <PropertyBox config={ColorText.defaultProps} labelWidth={270} />
      </Space>
    );
  };
}
