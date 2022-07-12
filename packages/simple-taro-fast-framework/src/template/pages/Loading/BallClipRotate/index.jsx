import classNames from 'classnames';
import { View } from '@tarojs/components';

import { ComponentBase } from 'taro-fast-common/es/customComponents';
import { transformSize } from 'taro-fast-common/es/utils/tools';

import './index.less';

const classPrefix = `template-loading-ball-clip-rotate`;

const defaultProps = {
  size: 15,
  margin: 2,
  borderWidth: 2,
  color: '#fff',
};

class BallClipRotate extends ComponentBase {
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
  ...ComponentBase.defaultProps,
  ...defaultProps,
};

export default BallClipRotate;
