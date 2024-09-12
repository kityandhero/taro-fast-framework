import classNames from 'classnames';
import { View } from '@tarojs/components';

import { AbstractComponent, transformSize } from 'taro-fast-common';

import './index.less';

const classPrefix = `template-loading-ball-scale`;

const defaultProps = {
  size: 15,
  margin: 2,
  color: '#fff',
};

class BallScale extends AbstractComponent {
  getStyle = () => {
    const { size, margin, color } = this.props;

    return {
      '--size': transformSize(size),
      '--margin': transformSize(margin),
      '--color': transformSize(color),
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

BallScale.defaultProps = {
  ...AbstractComponent.defaultProps,
  ...defaultProps,
};

export { BallScale };
