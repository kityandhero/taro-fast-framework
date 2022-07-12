import classNames from 'classnames';
import { View } from '@tarojs/components';

import { ComponentBase } from 'taro-fast-common/es/customComponents';
import { transformSize } from 'taro-fast-common/es/utils/tools';

import './index.less';

const classPrefix = `template-loading-ball-grid-pulse`;

const defaultProps = {
  size: 57,
  width: 15,
  height: 15,
  margin: 2,
  color: '#fff',
};

class BallGridPulse extends ComponentBase {
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
  ...ComponentBase.defaultProps,
  ...defaultProps,
};

export default BallGridPulse;
