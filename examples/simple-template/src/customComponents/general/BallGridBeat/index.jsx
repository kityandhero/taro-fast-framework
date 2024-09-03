import classNames from 'classnames';
import { Component } from 'react';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common';

import './index.less';

const classPrefix = `template-loading-ball-grid-beat`;

const defaultProps = {
  size: 57,
  margin: 2,
  color: '#fff',
};

class BallGridBeat extends Component {
  getStyle = () => {
    const { size, margin, color } = this.props;

    return {
      '--size': transformSize(size),
      '--margin': transformSize(margin),
      '--color': transformSize(color),
    };
  };

  render() {
    const style = this.getStyle();

    return (
      <View className={classNames(classPrefix)} style={style}>
        <View className={classNames(`${classPrefix}__item`)} />
        <View className={classNames(`${classPrefix}__item`)} />
        <View className={classNames(`${classPrefix}__item`)} />
        <View className={classNames(`${classPrefix}__item`)} />
        <View className={classNames(`${classPrefix}__item`)} />
        <View className={classNames(`${classPrefix}__item`)} />
        <View className={classNames(`${classPrefix}__item`)} />
        <View className={classNames(`${classPrefix}__item`)} />
        <View className={classNames(`${classPrefix}__item`)} />
      </View>
    );
  }
}

BallGridBeat.defaultProps = {
  ...defaultProps,
};

export default BallGridBeat;
