import classNames from 'classnames';
import { View } from '@tarojs/components';

import { ComponentBase } from 'taro-fast-common/es/customComponents';
import { transformSize } from 'taro-fast-common/es/utils/tools';

import './index.less';

const classPrefix = `template-loading-ball-scale-multi`;

const defaultProps = {
  size: 15,
  margin: 0,
  color: '#fff',
};

class BallScaleMultiple extends ComponentBase {
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
        <View className={classNames(`${classPrefix}__item`)} />
        <View className={classNames(`${classPrefix}__item`)} />
      </View>
    );
  }
}

BallScaleMultiple.defaultProps = {
  ...ComponentBase.defaultProps,
  ...defaultProps,
};

export default BallScaleMultiple;
