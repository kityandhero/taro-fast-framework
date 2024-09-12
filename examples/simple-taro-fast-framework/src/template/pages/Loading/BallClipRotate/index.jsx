import classNames from 'classnames';
import { View } from '@tarojs/components';

import { AbstractComponent, transformSize } from 'taro-fast-common';

import './index.less';

const classPrefix = `template-loading-ball-clip-rotate`;

const defaultProps = {
  size: 15,
  margin: 2,
  borderWidth: 2,
  color: '#fff',
};

class BallClipRotate extends AbstractComponent {
  getStyle = () => {
    const { size, margin, color, borderWidth } = this.props;

    return {
      '--size': transformSize(size),
      '--margin': transformSize(margin),
      '--color': transformSize(color),
      '--border-width': transformSize(borderWidth),
    };
  };

  renderFurther() {
    const style = this.getStyle();

    return (
      <View className={classNames(classPrefix)} style={style}>
        <View className={classNames(`${classPrefix}__item`)} />
      </View>
    );
  }
}

BallClipRotate.defaultProps = {
  ...AbstractComponent.defaultProps,
  ...defaultProps,
};

export { BallClipRotate };
