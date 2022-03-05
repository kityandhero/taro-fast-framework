import classNames from 'classnames';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction, isNumber } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-scale-box`;

const defaultProps = {
  className: '',
  style: {},
  hide: false,
  padding: 0,
  aspectRatio: 1,
  onClick: null,
};

class ScaleBox extends BaseComponent {
  triggerClick = (e) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(e);
    }
  };

  renderFurther() {
    const {
      className,
      style,
      hide,
      padding,
      aspectRatio: aspectRatioSource,
      children,
    } = {
      ...this.props,
    };

    if (hide) {
      return null;
    }

    let aspectRatio = !isNumber(aspectRatioSource)
      ? 1
      : aspectRatioSource < 0
      ? 1
      : aspectRatioSource;

    const containerProps = {
      className: classNames(classPrefix, className),
      style: {
        ...style,
        ...{
          padding: 0,
        },
      },
    };

    const innerView = (
      <View
        {...(padding <= 0
          ? containerProps
          : {
              style: {
                margin: transformSize(padding),
                overflow: 'hidden',
                position: 'relative',
              },
            })}
        onClick={this.triggerClick}
      >
        <View
          className={classNames(`${classPrefix}__placeholder`)}
          style={{ marginTop: `${aspectRatio * 100}%` }}
        />

        <View className={classNames(`${classPrefix}__body`)}>{children}</View>
      </View>
    );

    if (padding <= 0) {
      return innerView;
    }

    return <View {...containerProps}>{innerView}</View>;
  }
}

ScaleBox.defaultProps = {
  ...defaultProps,
};

export default ScaleBox;
