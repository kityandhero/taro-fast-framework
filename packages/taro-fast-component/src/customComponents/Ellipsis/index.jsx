import { View } from '@tarojs/components';

import { isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

const defaultProps = {
  line: 1,
  width: null,
  height: null,
  fontSize: null,
  lineHeight: null,
  style: {},
  className: '',
  text: '',
  onClick: null,
};

class Ellipsis extends BaseComponent {
  triggerClick = (event) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  renderFurther() {
    const {
      className,
      line,
      style: sourceSource,
      width,
      height,
      fontSize,
      lineHeight,
      text,
      children,
    } = this.props;

    let styleMust = {};

    if (line == 1) {
      styleMust = {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        ...((width || null) == null
          ? {}
          : {
              width: width,
            }),
        ...((height || null) == null
          ? {}
          : {
              height: height,
            }),
        ...((fontSize || null) == null
          ? {}
          : {
              fontSize: fontSize,
            }),
        ...((lineHeight || null) == null
          ? {}
          : {
              lineHeight: lineHeight,
            }),
      };
    }

    if (line > 1) {
      styleMust = {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'break-spaces',
        '-webkit-line-clamp': `${line}`,
        '-webkit-box-orient': 'vertical',
        ...((width || null) == null
          ? {}
          : {
              width: width,
            }),
        ...((height || null) == null
          ? {}
          : {
              height: height,
            }),
        ...((fontSize || null) == null
          ? {}
          : {
              fontSize: fontSize,
            }),
        ...((lineHeight || null) == null
          ? {}
          : {
              lineHeight: lineHeight,
            }),
      };
    }

    const style = {
      ...sourceSource,
      ...styleMust,
    };

    return (
      <View className={className} style={style} onClick={this.triggerClick}>
        {children ?? text}
      </View>
    );
  }
}

Ellipsis.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Ellipsis };
