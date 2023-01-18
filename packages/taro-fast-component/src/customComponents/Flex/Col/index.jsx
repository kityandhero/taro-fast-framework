import classNames from 'classnames';
import {
  checkInCollection,
  forEach as _forEach,
  isFunction,
  isNumber,
} from 'easy-soft-utility';
import { View } from '@tarojs/components';

import BaseComponent from '../../BaseComponent';

import './index.less';

const alignCollection = ['top', 'center', 'bottom', 'stretch'];

const defaultProps = {
  style: {},
  auto: false,
  wrap: false,
  align: '',
  size: '',
  offset: '',
  hidden: false,
  onClick: null,
};

class Col extends BaseComponent {
  triggerClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const { style } = this.props;

    const rootClass = ['tfc-col'];

    _forEach(this.props, (value, key) => {
      if (key === 'auto' && value) {
        return rootClass.push('tfc-col--auto');
      }

      if (key === 'wrap' && value) {
        return rootClass.push('tfc-col--wrap');
      }

      if (key === 'size' && isNumber(value)) {
        rootClass.push(`tfc-col-${value}`);
      }

      if (key === 'align' && checkInCollection(alignCollection, value)) {
        rootClass.push(`tfc-col__${key}--${value}`);
      }

      if (key === 'offset' && isNumber(value)) {
        rootClass.push(`tfc-col__${key}--${value}`);
      }
    });

    return (
      <View
        className={classNames(rootClass)}
        style={style}
        onClick={this.triggerClick}
      >
        {this.props.children}
      </View>
    );
  }
}

Col.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Col;
