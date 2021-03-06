import { View } from '@tarojs/components';

import { getMenuButtonBoundingClientRect } from 'taro-fast-common/es/utils/tools';
import { toString } from 'taro-fast-common/es/utils/typeConvert';

import BackboardBox from '../BackboardBox';
import BaseComponent from '../BaseComponent';
import FlexBox from '../FlexBox';

const defaultProps = {
  backboardStyle: {},
  contentStyle: {},
  backboardChildren: null,
  bottom: null,
  fixed: false,
  zIndex: 999,
};

class HeadNavigation extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        placeholderHeight: 0,
        boxHeight: 0,
        height: 0,
        rightWidth: 0,
      },
    };
  }

  doWorkAdjustDidMount = () => {
    const rect = getMenuButtonBoundingClientRect();

    const { width, height, top } = rect;

    this.setState({
      containerHeight: `${height + top + 8}px`,
      placeholderHeight: `${top}px`,
      height: `${height}px`,
      boxHeight: `${height + top}px`,
      rightWidth: `${width + 15}px`,
    });
  };

  getStyle = () => {
    const { style, fixed, zIndex } = this.props;

    return {
      ...style,
      ...(fixed
        ? {
            width: '100%',
            position: 'fixed',
            zIndex: toString(zIndex),
          }
        : {}),
    };
  };

  getBackboardStyle = () => {
    const { backboardStyle } = this.props;

    return { ...backboardStyle };
  };

  getContentStyle = () => {
    const { contentStyle } = this.props;

    return { ...contentStyle };
  };

  renderFurther() {
    const { children, backboardChildren, bottom } = this.props;
    const {
      containerHeight,
      placeholderHeight,
      boxHeight,
      height,
      rightWidth,
    } = this.state;

    const style = this.getStyle();
    const backboardStyle = this.getBackboardStyle();
    const contentStyle = this.getContentStyle();

    return (
      <View
        style={{
          ...style,
          ...{
            minHeight: containerHeight,
            paddingBottom: '0 0 0 0',
            margin: '0 0 0 0',
            overflow: 'hidden',
          },
        }}
      >
        <FlexBox
          style={{
            minHeight: containerHeight,
          }}
          flexAuto="bottom"
          top={
            <BackboardBox
              style={{
                width: '100%',
                paddingBottom: '8px',
              }}
              height={boxHeight}
              backboardStyle={backboardStyle}
              backboardZIndex="0"
              contentStyle={{
                ...contentStyle,
                ...{
                  background: 'transparent',
                },
              }}
              backboardChildren={backboardChildren}
            >
              <View
                style={{
                  width: '100%',
                  height: placeholderHeight,
                  background: 'transparent',
                }}
              />

              <FlexBox
                style={{
                  width: '100%',
                  height: height,
                  background: 'transparent',
                }}
                flexAuto="left"
                left={children}
                right={
                  <View
                    style={{
                      width: rightWidth,
                      height: height,
                    }}
                  />
                }
              />
            </BackboardBox>
          }
          bottom={bottom}
        />
      </View>
    );
  }
}

HeadNavigation.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default HeadNavigation;
