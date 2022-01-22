import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber, toString } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import { defaultProps } from './config';

const prefixClass = 'tfc-icon';

class Icon extends ComponentBase {
  handleClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const { style, className, value, size, color, hidden } = this.props;

    const fz = toNumber(toString(size));

    let f = `val(--tfc-${fz})`;

    const rootStyle = {
      fontSize: f,
      color,
    };

    const iconName = value ? `${prefixClass}-${value}` : '';

    if (!!hidden) {
      return null;
    }

    return (
      <View
        className={classNames(className)}
        style={{
          ...rootStyle,
          ...(style || {}),
          ...{ display: 'inline' },
        }}
      >
        <View
          className={classNames(prefixClass, iconName)}
          onClick={this.handleClick}
        />
      </View>
    );
  }
}

Icon.defaultProps = {
  ...defaultProps,
};

export default Icon;
