import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

const defaultProps = {
  style: {},
  height: 100,
  backboardStyle: {},
  contentStyle: {},
  backboardChildren: null,
  onClick: null,
};

class BackboardBox extends BaseComponent {
  buildStyle = () => {
    const { style, height } = this.props;

    return {
      ...style,
      ...{
        height: transformSize(height),
        position: 'relative',
        flex: 'none',
        flexWrap: 'wrap',
      },
    };
  };

  buildBackboardStyle = () => {
    const { backboardStyle } = this.props;

    return {
      ...{
        top: 0,
        left: 0,
        width: '100%',
      },
      ...backboardStyle,
      ...{
        position: 'absolute',
        zIndex: 9,
      },
    };
  };

  buildContentStyle = () => {
    const { contentStyle } = this.props;

    return {
      ...contentStyle,
      ...{
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    };
  };

  triggerClick = (value, e) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(value, e);
    }
  };

  renderFurther() {
    const { backboardChildren, children } = this.props;

    const style = this.buildStyle();
    const backboardStyle = this.buildBackboardStyle();
    const contentStyle = this.buildContentStyle();

    return (
      <View style={style} onClick={this.triggerClick}>
        <View style={backboardStyle}>{backboardChildren}</View>

        <View style={contentStyle}> {children} </View>
      </View>
    );
  }
}

BackboardBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default BackboardBox;
