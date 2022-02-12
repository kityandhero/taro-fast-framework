import { View } from '@tarojs/components';
import classNames from 'classnames';

import {
  forEach as _forEach,
  inCollection,
} from 'taro-fast-common/es/utils/tools';
import { isNumber } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../../BaseComponent';

import './index.less';

const alignCollection = ['top', 'center', 'bottom'];

const defaultProps = {
  style: {},
  auto: false,
  wrap: false,
  align: '',
  size: '',
  offset: '',
  hidden: false,
};

class Col extends BaseComponent {
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

      if (key === 'align' && inCollection(alignCollection, value)) {
        rootClass.push(`tfc-col__${key}--${value}`);
      }

      if (key === 'offset' && isNumber(value)) {
        rootClass.push(`tfc-col__${key}--${value}`);
      }
    });

    return (
      <View className={classNames(rootClass)} style={style}>
        {this.props.children}
      </View>
    );
  }
}

Col.defaultProps = {
  ...defaultProps,
};

export default Col;
