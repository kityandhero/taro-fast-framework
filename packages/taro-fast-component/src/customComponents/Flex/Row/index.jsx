import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  forEach as _forEach,
  inCollection,
} from 'taro-fast-common/es/utils/tools';
import { isBoolean, isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { toString } from 'taro-fast-common/es/utils/typeConvert';

import BaseComponent from '../../BaseComponent';

import './index.less';

const directionCollection = ['row', 'column', 'row-reverse', 'column-reverse'];
const alignCollection = ['start', 'end', 'center', 'stretch', 'baseline'];
const justifyCollection = ['start', 'end', 'center', 'between', 'around'];
const alignContentCollection = [
  'start',
  'end',
  'center',
  'between',
  'around',
  'stretch',
];

const defaultProps = {
  style: {},
  wrap: false,
  align: '',
  justify: '',
  direction: '',
  alignContent: '',
  hidden: false,
  onClick: null,
};

class Row extends BaseComponent {
  triggerClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const { style } = this.props;

    const rootClass = ['tfc-row'];

    _forEach(this.props, (value, key) => {
      if (key === 'direction' && inCollection(directionCollection, value)) {
        rootClass.push(`tfc-row__${key}--${value}`);
      }

      if (key === 'align' && inCollection(alignCollection, value)) {
        rootClass.push(`tfc-row__${key}--${value}`);
      }

      if (key === 'justify' && inCollection(justifyCollection, value)) {
        rootClass.push(`tfc-row__${key}--${value}`);
      }

      if (
        key === 'alignContent' &&
        inCollection(alignContentCollection, value)
      ) {
        return rootClass.push(`tfc-row__align-content--${value}`);
      }

      if (key === 'wrap') {
        if (isBoolean(value)) {
          if (value) {
            rootClass.push(`tfc-row--wrap`);
          } else {
            rootClass.push(`tfc-row--no-wrap`);
          }
        } else {
          rootClass.push(`tfc-row--${toString(value)}`);
        }
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

Row.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Row;
