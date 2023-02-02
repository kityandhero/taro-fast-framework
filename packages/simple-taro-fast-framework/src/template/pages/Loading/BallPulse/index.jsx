import classNames from 'classnames';
import { View } from '@tarojs/components';

import { AbstractComponent, transformSize } from 'taro-fast-common';

import './index.less';

const classPrefix = `template-loading-ball-pulse`;

const defaultProps = {
  width: 15,
  height: 15,
  margin: 2,
  color: '#fff',
};

class BallPulse extends AbstractComponent {
  getStyle = () => {
    const { width, height, margin, color } = this.props;

    return {
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
      </View>
    );
  }
}

BallPulse.defaultProps = {
  ...AbstractComponent.defaultProps,
  ...defaultProps,
};

export default BallPulse;
