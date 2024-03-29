import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction, isNumber } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-scale-box`;

const defaultProps = {
  className: '',
  style: {},
  hide: false,
  padding: 0,
  aspectRatio: 1,
  bodySkeletonMode: false,
  onClick: null,
};

class ScaleBox extends BaseComponent {
  triggerClick = (event) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  renderFurther() {
    const {
      className,
      style,
      hide,
      padding,
      aspectRatio: aspectRatioSource,
      bodySkeletonMode,
      children,
    } = {
      ...this.props,
    };

    if (hide) {
      return null;
    }

    let aspectRatio = isNumber(aspectRatioSource)
      ? aspectRatioSource < 0
        ? 1
        : aspectRatioSource
      : 1;

    const containerProperties = {
      className: classNames(classPrefix, className),
      style: {
        ...style,

        padding: 0,
      },
    };

    const innerView = (
      <View
        {...(padding <= 0
          ? containerProperties
          : {
              style: {
                margin: `${transformSize(
                  Math.floor(padding * aspectRatio),
                )} ${transformSize(padding)}`,
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

        <View
          className={classNames(`${classPrefix}__body`, {
            [`${classPrefix}__body--transparent`]: !bodySkeletonMode,
            [`${classPrefix}__body--skeleton`]: bodySkeletonMode,
          })}
        >
          {children}
        </View>
      </View>
    );

    if (padding <= 0) {
      return innerView;
    }

    return <View {...containerProperties}>{innerView}</View>;
  }
}

ScaleBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { ScaleBox };
