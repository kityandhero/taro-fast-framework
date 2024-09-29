import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  checkInCollection,
  forEach as _forEach,
  isBoolean,
  isFunction,
} from 'easy-soft-utility';

import {
  flexAlignCollection,
  flexAlignContentCollection,
  flexDirectionCollection,
  flexJustifyCollection,
} from 'taro-fast-common';

import { BaseComponent } from '../../BaseComponent';

import './index.less';

const directionCollection = [
  flexDirectionCollection.row,
  flexDirectionCollection.column,
  flexDirectionCollection.rowReverse,
  flexDirectionCollection.columnReverse,
];
const alignCollection = [
  flexAlignCollection.start,
  flexAlignCollection.end,
  flexAlignCollection.center,
  flexAlignCollection.stretch,
  flexAlignCollection.baseline,
];
const justifyCollection = [
  flexJustifyCollection.start,
  flexJustifyCollection.end,
  flexJustifyCollection.center,
  flexJustifyCollection.between,
  flexJustifyCollection.evenly,
  flexJustifyCollection.around,
];
const alignContentCollection = [
  flexAlignContentCollection.start,
  flexAlignContentCollection.end,
  flexAlignContentCollection.center,
  flexAlignContentCollection.between,
  flexAlignContentCollection.evenly,
  flexAlignContentCollection.around,
  flexAlignContentCollection.stretch,
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
      if (
        key === 'direction' &&
        checkInCollection(directionCollection, value)
      ) {
        rootClass.push(`tfc-row__${key}--${value}`);
      }

      if (key === 'align' && checkInCollection(alignCollection, value)) {
        rootClass.push(`tfc-row__${key}--${value}`);
      }

      if (key === 'justify' && checkInCollection(justifyCollection, value)) {
        rootClass.push(`tfc-row__${key}--${value}`);
      }

      if (
        key === 'alignContent' &&
        checkInCollection(alignContentCollection, value)
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

export { Row };
