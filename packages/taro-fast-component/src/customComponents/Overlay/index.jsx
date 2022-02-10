import { View } from '@tarojs/components';

import { inCollection, colorHexToRGB } from 'taro-fast-common/es/utils/tools';
import { isFunction, isNumber } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

import BaseComponent from '../BaseComponent';

import CenterBox from '../CenterBox';

const modeCollection = ['fullScreen', 'fullParent'];
const animalCollection = [
  'ease-in',
  'linear',
  'ease',
  'ease-out',
  'ease-in-out',
];

const defaultProps = {
  visible: false,
  color: '#000',
  alpha: 0.5,
  zIndex: 810,
  mode: 'fullParent',
  lockScroll: true,
  duration: 300,
  animal: 'ease-in',
  onClick: null,
};

class Overlay extends BaseComponent {
  processing = false;

  visibilityChanged = false;

  startCountMonitor = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        counter: 0,
      },
    };
  }

  getMode = () => {
    const { mode } = this.props;

    return inCollection(modeCollection, mode) ? mode : defaultProps.mode;
  };

  getAnimal = () => {
    const { animal } = this.props;

    return inCollection(animalCollection, animal)
      ? animal
      : defaultProps.animal;
  };

  getDuration = () => {
    const { duration } = this.props;

    if (isNumber(duration)) {
      const d = toNumber(duration);

      if (d <= 0) {
        return defaultProps.duration;
      }

      return d;
    }

    return defaultProps.duration;
  };

  getStyle = () => {
    const { visible, color, alpha, zIndex } = this.props;
    const { counter } = this.state;

    const mode = this.getMode();
    const animal = this.getAnimal();
    const duration = this.getDuration();

    const position = mode === 'fullScreen' ? 'fixed' : 'absolute';
    const width = mode === 'fullScreen' ? '100vw' : '100%';
    const height = mode === 'fullScreen' ? '100vh' : '100%';

    let v = {};

    if (!!visible) {
      v = {
        visibility: 'visible',
        opacity: '1',
      };

      this.visibilityChanged = false;
    } else {
      if (counter <= 0 && !this.startCountMonitor) {
        v = {
          visibility: 'hidden',
          opacity: '0',
        };

        this.startCountMonitor = true;
      } else {
        v = {
          ...(this.visibilityChanged
            ? {
                visibility: 'hidden',
              }
            : {
                visibility: 'visible',
              }),
          ...{
            opacity: '0',
          },
        };

        if (!this.visibilityChanged) {
          this.visibilityChanged = !this.visibilityChanged;
          this.processing = true;

          const that = this;

          setTimeout(() => {
            that.setState({
              counter: counter + 1,
            });

            that.processing = false;
          }, duration + 10);
        }
      }
    }

    return {
      ...v,
      ...{
        top: '0',
        left: '0',
        position,
        width,
        height,
        zIndex,
        backgroundColor: `rgba(${colorHexToRGB(color, '')}, ${alpha})`,
        transition: `opacity ${duration}ms ${animal}`,
      },
    };
  };

  handleTouchMove = (e) => {
    const { lockScroll } = this.props;

    if (lockScroll) {
      this.ignoreTouchMove(e);
    }
  };

  triggerClick = () => {
    const { onClick } = this.props;

    if (this.processing) {
      return;
    }

    if (isFunction(onClick)) {
      onClick();
    }
  };

  render() {
    const { children } = this.props;

    const style = this.getStyle();

    return (
      <View
        style={style}
        catchMove
        onTouchMove={this.handleTouchMove}
        onClick={this.triggerClick}
      >
        {children ? <CenterBox>{children}</CenterBox> : null}
      </View>
    );
  }
}

Overlay.defaultProps = {
  ...defaultProps,
};

export default Overlay;
