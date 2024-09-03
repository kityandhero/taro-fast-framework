import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-badge`;

const positionCollection = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

const defaultProps = {
  style: {},
  color: '#FF411C',
  content: null,
  dot: false,
  dotSize: 20,
  position: 'topRight',
  fontSize: 22,
  wrapHeight: 'auto',
  wrapStyle: {},
  wrapCenter: false,
};

class Badge extends BaseComponent {
  getPosition = () => {
    const { position } = this.props;

    return checkInCollection(positionCollection, position)
      ? position
      : 'topRight';
  };

  buildWrapStyle = () => {
    const { wrapStyle, wrapHeight, wrapCenter } = this.props;

    return {
      ...wrapStyle,
      ...(checkStringIsNullOrWhiteSpace(wrapHeight)
        ? {}
        : {
            '--wrap-height': transformSize(wrapHeight),
          }),
      ...(wrapCenter
        ? {
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
          }
        : {}),
    };
  };

  buildStyle = () => {
    const { style, dotSize, fontSize } = this.props;

    const position = this.getPosition();

    return {
      ...style,
      ...(fontSize > 0
        ? {
            '--font-size': transformSize(fontSize),
          }
        : {}),
      ...(dotSize > 0
        ? {
            '--dot-size': transformSize(dotSize),
          }
        : {}),
      ...(position === 'topLeft'
        ? {
            '--right': '100%',
          }
        : {}),
      ...(position === 'bottomLeft'
        ? {
            '--right': '100%',
            '--top': '100%',
          }
        : {}),
      ...(position === 'topRight' ? {} : {}),
      ...(position === 'bottomRight'
        ? {
            '--top': '100%',
          }
        : {}),
    };
  };

  renderFurther() {
    const { content, color, dot: dotSource, children } = this.props;

    const isDot = dotSource || content === Badge.dot;

    const badgeCls = classNames(classPrefix, {
      [`${classPrefix}-fixed`]: !!children,
      [`${classPrefix}-dot`]: isDot,
      [`${classPrefix}-content`]: !isDot,
    });

    const wrapStyle = this.buildWrapStyle();
    const style = this.buildStyle();

    const element =
      isDot || content ? (
        <View
          className={badgeCls}
          style={{
            ...style,

            backgroundColor: color || defaultProps.color,
          }}
        >
          {isDot ? Badge.dot : content}
        </View>
      ) : null;

    return children ? (
      <View className={`${classPrefix}-wrap`} style={wrapStyle}>
        {children}
        {element}
      </View>
    ) : (
      element
    );
  }
}

Badge.dot = Symbol();

Badge.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Badge };
