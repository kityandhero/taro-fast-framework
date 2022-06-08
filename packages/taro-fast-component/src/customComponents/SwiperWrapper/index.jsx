import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import ScaleBox from '../ScaleBox';
import SwiperAdapter from './SwiperAdapter';

const defaultProps = {
  height: 300,
  style: {},
  scaleMode: false,
  aspectRatio: 0.5,
  swiperConfig: {},
  list: [],
  itemBuilder: null,
  indicatorBuilder: null,
  customIndicator: false,
  indicatorBoxStyle: {},
  onChange: null,
  onTransition: null,
  onAnimationFinish: null,
};

class SwiperWrapper extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        current: 0,
      },
    };
  }

  getStyle = () => {
    const { style, height, scaleMode } = this.props;

    return {
      ...(style || {}),
      ...(!scaleMode ? { height: transformSize(height) } : {}),
      ...{ position: 'relative' },
    };
  };

  triggerChange = (e) => {
    const { customIndicator, onChange } = this.props;

    if (!!customIndicator) {
      const {
        detail: { current },
      } = e;

      this.setState({ current });
    }

    if (isFunction(onChange)) {
      onChange(e);
    }
  };

  buildIndicator = (item, index) => {
    const { height, scaleMode, aspectRatio, indicatorBuilder } = this.props;
    const { current } = this.state;

    if (isFunction(indicatorBuilder)) {
      return indicatorBuilder({
        height,
        scaleMode,
        aspectRatio,
        item,
        active: current === index,
        current,
        index,
        keyPrefix: this.keyPrefix,
      });
    }

    return null;
  };

  buildIndicatorBox = () => {
    const { customIndicator, indicatorBoxStyle, list } = this.props;

    return !!customIndicator ? (
      <View
        style={{
          ...{
            width: '100%',
            bottom: transformSize(20),
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          },
          ...(indicatorBoxStyle || {}),
          ...{ position: 'absolute' },
        }}
      >
        {list.map((o, index) => {
          return this.buildIndicator(o, index);
        })}
      </View>
    ) : null;
  };

  renderFurther() {
    const {
      scaleMode,
      swiperConfig,
      list,
      aspectRatio,
      itemBuilder,
      customIndicator,
    } = this.props;

    const style = this.getStyle();

    if (scaleMode) {
      return (
        <ScaleBox style={style} aspectRatio={aspectRatio}>
          <SwiperAdapter
            scaleMode={scaleMode}
            aspectRatio={aspectRatio}
            swiperConfig={swiperConfig}
            list={list}
            itemBuilder={itemBuilder}
            customIndicator={customIndicator}
            onChange={this.triggerChange}
          />

          {this.buildIndicatorBox()}
        </ScaleBox>
      );
    }

    return (
      <View style={style}>
        <SwiperAdapter
          scaleMode={scaleMode}
          aspectRatio={aspectRatio}
          swiperConfig={swiperConfig}
          list={list}
          itemBuilder={itemBuilder}
          customIndicator={customIndicator}
          onChange={this.triggerChange}
        />

        {this.buildIndicatorBox()}
      </View>
    );
  }
}

SwiperWrapper.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default SwiperWrapper;
