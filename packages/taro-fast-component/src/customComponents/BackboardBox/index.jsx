import { View } from '@tarojs/components';

import { isFunction, isNumber } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { ScaleBox } from '../ScaleBox';

const defaultProps = {
  style: {},
  height: 'auto',
  scaleMode: false,
  aspectRatio: 1,
  backboardStyle: {},
  backboardZIndex: 9,
  contentStyle: {},
  contentZIndex: 10,
  backboardChildren: null,
  onClick: null,
};

class BackboardBox extends BaseComponent {
  buildStyle = () => {
    const { style, scaleMode, height } = this.props;

    return {
      ...style,
      ...(scaleMode
        ? {}
        : {
            height: transformSize(height),
          }),
      position: 'relative',
      flex: 'none',
      flexWrap: 'wrap',
    };
  };

  buildBackboardStyle = () => {
    const { backboardStyle, backboardZIndex } = this.props;

    return {
      top: 0,
      left: 0,
      width: '100%',
      ...backboardStyle,
      position: 'absolute',
      zIndex: isNumber(backboardZIndex) ? backboardZIndex : 9,
    };
  };

  buildContentStyle = () => {
    const { height, contentStyle, contentZIndex } = this.props;

    return {
      ...contentStyle,
      position: 'relative',
      top: 0,
      left: 0,
      width: '100%',
      height: transformSize(height),
      zIndex: isNumber(contentZIndex) ? contentZIndex : 10,
    };
  };

  triggerClick = (value, event) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(value, event);
    }
  };

  renderFurther() {
    const { scaleMode, aspectRatio, backboardChildren, children } = this.props;

    const style = this.buildStyle();
    const backboardStyle = this.buildBackboardStyle();
    const contentStyle = this.buildContentStyle();

    if (scaleMode) {
      return (
        <ScaleBox
          aspectRatio={aspectRatio}
          style={style}
          onClick={this.triggerClick}
        >
          <View style={backboardStyle}>{backboardChildren}</View>

          <View style={contentStyle}> {children} </View>
        </ScaleBox>
      );
    }

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

export { BackboardBox };
