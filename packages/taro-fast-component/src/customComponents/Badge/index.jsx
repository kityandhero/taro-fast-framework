import classNames from 'classnames';
import { View } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-badge`;

const positionCollection = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

const defaultProps = {
  className: '',
  style: {},
  color: '#FF411C',
  content: null,
  dot: false,
  position: 'topRight',
};

export const dot = Symbol();

class Badge extends BaseComponent {
  getPosition = () => {
    const { position } = this.props;

    return inCollection(positionCollection, position) ? position : 'topRight';
  };

  buildStyle = () => {
    const { style } = this.props;

    const position = this.getPosition();

    return {
      ...style,
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
    const { className, content, color, dot: dotSource, children } = this.props;

    const isDot = dotSource || content === Badge.dot;

    const badgeCls = classNames(
      classPrefix,
      {
        [`${classPrefix}-fixed`]: !!children,
        [`${classPrefix}-dot`]: isDot,
        [`${classPrefix}-content`]: !isDot,
      },
      className,
    );

    const style = this.buildStyle();

    console.log({ style });

    const element =
      isDot || content ? (
        <View
          className={badgeCls}
          style={{
            ...style,
            ...{
              backgroundColor: color || defaultProps.color,
            },
          }}
        >
          {isDot ? Badge.dot : content}
        </View>
      ) : null;

    return children ? (
      <View className={`${classPrefix}-wrap`}>
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
  ...defaultProps,
};

export default Badge;
