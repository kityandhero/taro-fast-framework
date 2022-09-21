import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  ColorText,
  Icon,
  ImageBox,
  Space,
} from 'taro-fast-component/es/customComponents';
import { connect } from 'taro-fast-framework/es/utils/dva';

import logoImg from '../../../assets/images/logo.png';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const { IconEdit } = Icon;

const config0 = {
  text: '文本文字',
};

const config1 = {
  textPrefix: '前缀',
  text: '文本文字',
};

const config2 = {
  textPrefix: '前缀',
  separator: '@',
  text: '文本文字',
};

const config21 = {
  textPrefix: '前缀',
  separator: '@',
  text: '文本文字',
  fontSize: 34,
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

const config71 = {
  textPrefix: '前缀',
  text: '文本文字',
  style: { backgroundColor: '#f45231' },
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

const config91 = {
  icon: <IconEdit size={32} color="#ff3ce7" />,
  text: '文本文字',
  iconContainerStyle: {
    backgroundColor: '#ccc',
  },
};

const config10 = {
  textPrefix: '前缀',
  text: '文本文字',
  separatorStyle: {
    color: '#67ca31',
    margin: `0 ${transformSize(24)}`,
  },
};

const config101 = {
  textPrefix: '前缀',
  text: '文本文字',
  textStyle: {
    color: '#971731',
  },
};

const config12 = {
  icon: <Icon size={40} color="#ff3ce7" value={logoImg} imageMode />,
  text: '文本文字',
};

const config13 = {
  text: '文本文字',
  extra: <Icon size={40} color="#ff3ce7" value={logoImg} imageMode />,
};

const config131 = {
  text: '文本文字',
  extraStyle: {
    backgroundColor: '#f45231',
  },
  extra: <Icon size={40} color="#ff3ce7" value={logoImg} imageMode />,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '文字渲染',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'ColorText',
    name: '文字渲染',
    description: '文字渲染',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '仅文字',
        currentConfig: config0,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '仅文字',
        config: config0,
      },
      {
        header: '使用前缀',
        config: config1,
      },
      {
        header: '自定义分隔符',
        config: config2,
      },
      {
        header: '字体大小',
        config: config21,
      },
      {
        header: '点击复制',
        config: config3,
      },
      {
        header: '点击复制并回调',
        config: config4,
      },
      {
        header: '颜色',
        config: config5,
      },
      {
        header: '随机颜色',
        config: config6,
      },
      {
        header: '全局样式',
        config: config71,
      },
      {
        header: '前缀样式',
        config: config7,
      },
      {
        header: '分隔符样式',
        config: config10,
      },
      {
        header: '内容样式',
        config: config101,
      },
      {
        header: '附带内置图标',
        config: config8,
      },
      {
        header: '附带图片图标',
        config: config12,
      },
      {
        header: '附带图片',
        config: config9,
      },
      {
        header: '图片/图标容器样式',
        config: config91,
      },
      {
        header: '右侧扩展',
        config: config13,
      },
      {
        header: '右侧扩展额外样式',
        config: config131,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <ColorText key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </ColorText>
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
          componentName="ColorText"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon', 'extra']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={ColorText.defaultProps} labelWidth={260} />
      </Space>
    );
  };
}
