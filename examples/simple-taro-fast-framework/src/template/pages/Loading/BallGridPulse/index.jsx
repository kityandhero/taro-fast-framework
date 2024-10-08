import classNames from 'classnames';
import { View } from '@tarojs/components';

import { AbstractComponent, transformSize } from 'taro-fast-common';

import './index.less';

const classPrefix = `template-loading-ball-grid-pulse`;

const defaultProps = {
  size: 57,
  width: 15,
  height: 15,
  margin: 2,
  color: '#fff',
};

class BallGridPulse extends AbstractComponent {
  getStyle = () => {
    const { size, width, height, margin, color } = this.props;

    return {
      '--size': transformSize(size),
      '--width': transformSize(width),
      '--height': transformSize(height),
      '--margin': transformSize(margin),
      '--color': transformSize(color),
    };
  };

  renderFurther() {
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

BallGridPulse.defaultProps = {
  ...AbstractComponent.defaultProps,
  ...defaultProps,
};

export { BallGridPulse };
