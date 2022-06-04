import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { ImageBox, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../../customComponents/ContentPageBase';
import SimpleBox from '../../../../customComponents/SimpleBox';

import ballsSvg from '../../../../assets/images/loading-balls.svg';
import barsSvg from '../../../../assets/images/loading-bars.svg';
import bubblesSvg from '../../../../assets/images/loading-bubbles.svg';
import cubesSvg from '../../../../assets/images/loading-cubes.svg';
import cylonRedSvg from '../../../../assets/images/loading-cylon-red.svg';
import cylonSvg from '../../../../assets/images/loading-cylon.svg';
import spinSvg from '../../../../assets/images/loading-spin.svg';
import spinningBubblesSvg from '../../../../assets/images/loading-spinning-bubbles.svg';
import spokesSvg from '../../../../assets/images/loading-spokes.svg';

import BallPulse from '../BallPulse';
import BallGridPulse from '../BallGridPulse';
import BallClipRotate from '../BallClipRotate';
import BallScale from '../BallScale';
import BallScaleMultiple from '../BallScaleMultiple';
import BallGridBeat from '../BallGridBeat';

const imageBoxContainerStyle = {
  display: 'block',
  width: transformSize(220),
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
  navigationBarTitleText: 'Loading Svg Image',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'ImageBox',
    name: 'Loading Svg',
    description: 'Loading Svg',
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

  buildSimulationFadeSpinLoading = () => {
    return <BallScaleMultiple size={120} color="#ed5565" />;
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
          innerBoxBackgroundColor="#ed5565"
          ignorePropertyList={['icon']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <SimpleBox
          header="BallPulse"
          config={{
            width: 20,
            height: 20,
            margin: 20,
          }}
          componentName="BallPulse"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          innerBoxBackgroundColor="#ed5565"
          ignorePropertyList={['icon']}
        >
          <BallPulse width={15} height={15} margin={2} />
        </SimpleBox>

        <SimpleBox
          header="BallGridPulse"
          config={{
            width: 15,
            height: 15,
            margin: 15,
          }}
          componentName="BallGridPulse"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          innerBoxBackgroundColor="#ed5565"
          ignorePropertyList={['icon']}
        >
          <BallGridPulse width={15} height={15} margin={2} />
        </SimpleBox>

        <SimpleBox
          header="BallClipRotate"
          config={{
            width: 15,
            height: 15,
            margin: 15,
          }}
          componentName="BallClipRotate"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          innerBoxBackgroundColor="#ed5565"
          ignorePropertyList={['icon']}
        >
          <BallClipRotate size={52} borderWidth={4} />
        </SimpleBox>

        <SimpleBox
          header="BallScale"
          config={{
            width: 15,
            height: 15,
            margin: 15,
          }}
          componentName="BallScale"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          innerBoxBackgroundColor="#ed5565"
          ignorePropertyList={['icon']}
        >
          <BallScale size={80} />
        </SimpleBox>

        <SimpleBox
          header="BallScaleMultiple"
          config={{
            width: 15,
            height: 15,
            margin: 15,
          }}
          componentName="BallScaleMultiple"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          innerBoxBackgroundColor="#ed5565"
          ignorePropertyList={['icon']}
        >
          <BallScaleMultiple size={80} />
        </SimpleBox>

        <SimpleBox
          header="BallGridBeat"
          config={{
            width: 15,
            height: 15,
            margin: 15,
          }}
          componentName="BallGridBeat"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          innerBoxBackgroundColor="#ed5565"
          ignorePropertyList={['icon']}
        >
          <BallGridBeat size={80} />
        </SimpleBox>
      </Space>
    );
  };
}
