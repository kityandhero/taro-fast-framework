import { View } from '@tarojs/components';
import classNames from 'classnames';

import { ComponentBase } from 'taro-fast-common/es/customComponents';

import {
  forEach as _forEach,
  inCollection,
} from 'taro-fast-common/es/utils/tools';

import './index.less';

const propNames = ['wrap', 'align', 'justify', 'direction', 'alignContent'];

export default class Row extends ComponentBase {
  render() {
    const { style } = this.props;

    const rootClass = ['tfc-row'];

    _forEach(this.props, (value, key) => {
      if (inCollection(propNames, key)) {
        if (key === 'alignContent') {
          return rootClass.push(`tfc-row--${value}`);
        }

        if (key === 'alignContent') {
          return rootClass.push(`tfc-row__align-content--${value}`);
        }

        rootClass.push(`tfc-row__${key}--${value}`);
      }
    });

    return (
      <View className={classNames(rootClass)} style={style}>
        {this.props.children}
      </View>
    );
  }
}
