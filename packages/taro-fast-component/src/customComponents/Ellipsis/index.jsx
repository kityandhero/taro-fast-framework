import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

const defaultProps = {
  line: 1,
  style: {},
  className: '',
  onClick: null,
};

class Ellipsis extends BaseComponent {
  triggerClick = (e) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(e);
    }
  };

  renderFurther() {
    const { className, line, style: sourceSource, children } = this.props;

    let styleMust = {};

    if (line == 1) {
      styleMust = {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      };
    }

    if (line > 1) {
      styleMust = {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '-webkit-line-clamp': `${line}`,
        '-webkit-box-orient': 'vertical',
      };
    }

    const style = {
      ...sourceSource,
      ...styleMust,
    };

    return (
      <View className={className} style={style} onClick={this.triggerClick}>
        {children}
      </View>
    );
  }
}

Ellipsis.defaultProps = {
  ...defaultProps,
};

export default Ellipsis;
