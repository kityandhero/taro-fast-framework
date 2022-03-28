import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  ImageBox,
  Space,
  CenterBox,
  Ellipsis,
  TranslucentBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const imageModeCollection = [
  'scaleToFill',
  'aspectFit',
  'aspectFill',
  'widthFix',
  'heightFix',
  'top',
  'bottom',
  'center',
  'left',
  'right',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
];

const imageBoxContainerStyle = {
  display: 'block',
  width: transformSize(220),
};

const imageContainerStyle = {
  backgroundColor: 'red',
};

const src =
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21052112102250D-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643989392&t=18546318aa0f8e3e126ab26965ca6f45';

function wrapBuilder(one) {
  return <View style={imageBoxContainerStyle}>{one}</View>;
}

const config1 = {
  src,
};

const config2 = {
  src,
  padding: 10,
};

const config21 = {
  src,
  padding: 10,
  imageBoxStyle: imageContainerStyle,
};

const config3 = {
  src,
  showMode: 'loading',
};

const config4 = {
  src,
  showOverlay: true,
  overlayText: '售罄',
};

const config5 = {
  src,
  decoration: {
    style: {
      color: 'blue',
    },
    text: '装饰文字',
  },
};

const config6 = {
  src,
  circle: true,
};

const config7 = {
  src,
  lazyLoad: true,
};

const config8 = {
  src,
  aspectRatio: 0.5,
};

const config9 = {
  src,
  decorationBuilder: () => {
    return (
      <TranslucentBox
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: transformSize(68),
        }}
        backgroundColor="#000"
        alpha={0.5}
      >
        <CenterBox>
          <Ellipsis
            line={1}
            style={{
              color: '#fff',
              opacity: 1,
              padding: `${transformSize(13)} ${transformSize(16)}`,
            }}
          >
            装饰文字
          </Ellipsis>
        </CenterBox>
      </TranslucentBox>
    );
  },
};

const config10 = {
  src,
  showMode: 'pure',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '图片',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ImageBox',
    name: '图片',
    description: '图片组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '普通例子',
        currentConfig: config1,
        wrapBuilder,
      },
    };
  }

  establishImageModeList = () => {
    return imageModeCollection.map((item) => {
      return {
        span: 2,
        header: `image mode - "${item}"`,
        config: {
          src,
          imageMode: item,
        },
      };
    });
  };

  establishControlList = () => {
    return [
      {
        header: '普通例子',
        config: config1,
        wrapBuilder,
      },
      {
        header: '内边距',
        config: config2,
        wrapBuilder,
      },
      {
        header: '容器样式',
        config: config21,
        wrapBuilder,
      },
      {
        header: '加载模式',
        config: config3,
        wrapBuilder,
      },
      {
        header: '使用遮罩',
        config: config4,
        wrapBuilder,
      },
      {
        header: '使用上层装饰',
        config: config5,
        wrapBuilder,
      },
      {
        header: '使用上层装饰构建',
        config: config9,
        wrapBuilder,
      },
      {
        header: '圆形轮廓',
        config: config6,
        wrapBuilder,
      },
      {
        header: 'LazyLoad',
        config: config7,
        wrapBuilder,
      },
      {
        header: '指定长宽比',
        config: config8,
        wrapBuilder,
      },
      ...this.establishImageModeList(),
      {
        span: 2,
        header: '纯粹模式: 无特殊功能, 使用父容器宽度, 高度自动',
        config: config10,
        wrapBuilder,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    console.log(config);

    return (
      <ImageBox key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </ImageBox>
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
          componentName="ImageBox"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={ImageBox.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
