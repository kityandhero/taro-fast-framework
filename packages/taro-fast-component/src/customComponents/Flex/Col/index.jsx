import { Component } from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';

import {
  forEach as _forEach,
  inCollection,
} from 'taro-fast-common/es/utils/tools';

import './index.less';

const propNames = ['isAuto', 'isWrap', 'align', 'size', 'offset'];

export default class Col extends Component {
  render() {
    const { style } = this.props;

    const rootClass = ['at-col'];

    _forEach(this.props, (value, key) => {
      if (inCollection(propNames, key)) {
        if (key === 'isAuto' && value) {
          return rootClass.push('at-col--auto');
        }

        if (key === 'isWrap' && value) {
          return rootClass.push('at-col--wrap');
        }

        if (key === 'size' && value) {
          rootClass.push(`at-col-${value}`);
        }

        rootClass.push(`at-col__${key}--${value}`);
      }
    });

    return (
      <View className={classNames(rootClass)} style={style}>
        {this.props.children}
      </View>
    );
  }
}
