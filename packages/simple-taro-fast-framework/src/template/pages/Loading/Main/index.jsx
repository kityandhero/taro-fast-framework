import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { ImageBox, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../../customComponents/ContentPageBase';
import SimpleBox from '../../../../customComponents/SimpleBox';
import PropertyBox from '../../../../customComponents/PropertyBox';

import ballsSvg from '../../../../assets/images/loading-balls.svg';
import barsSvg from '../../../../assets/images/loading-bars.svg';
import bubblesSvg from '../../../../assets/images/loading-bubbles.svg';
import cubesSvg from '../../../../assets/images/loading-cubes.svg';
import cylonRedSvg from '../../../../assets/images/loading-cylon-red.svg';
import cylonSvg from '../../../../assets/images/loading-cylon.svg';
import spinSvg from '../../../../assets/images/loading-spin.svg';
import spinningBubblesSvg from '../../../../assets/images/loading-spinning-bubbles.svg';
import spokesSvg from '../../../../assets/images/loading-spokes.svg';

const imageBoxContainerStyle = {
  display: 'block',
  width: transformSize(220),
  backgroundColor: '#000',
};

function wrapBuilder(one) {
  return <View style={imageBoxContainerStyle}>{one}</View>;
}

const config1 = {
  src: ballsSvg,
};

const config2 = {
  src: barsSvg,
};

const config3 = {
  src: bubblesSvg,
};

const config4 = {
  src: cubesSvg,
};

const config5 = {
  src: cylonRedSvg,
};

const config6 = {
  src: cylonSvg,
};

const config7 = {
  src: spinSvg,
};

const config8 = {
  src: spinningBubblesSvg,
};

const config9 = {
  src: spokesSvg,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'LoadingImage',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'ImageBox',
    name: 'Loading图片',
    description: 'Loading图片示例',
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

  establishControlList = () => {
    return [
      {
        header: 'balls',
        config: config1,
        wrapBuilder,
      },
      {
        header: 'bars',
        config: config2,
        wrapBuilder,
      },
      {
        header: 'bubbles',
        config: config3,
        wrapBuilder,
      },
      {
        header: 'cubes',
        config: config4,
        wrapBuilder,
      },
      {
        header: 'cylonRed',
        config: config5,
        wrapBuilder,
      },
      {
        header: 'cylon',
        config: config6,
        wrapBuilder,
      },
      {
        header: 'spin',
        config: config7,
        wrapBuilder,
      },
      {
        header: 'spinningBubbles',
        config: config8,
        wrapBuilder,
      },

      {
        header: 'spokes',
        config: config9,
        wrapBuilder,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
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
