import { View } from '@tarojs/components';
import { ENV_TYPE, getEnv } from '@tarojs/taro';

import {
  getMenuButtonBoundingClientRect,
  recordExecute,
  recordWarn,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
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
  onAdjustComplete: null,
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
    recordExecute('doWorkAdjustDidMount');

    const { onAdjustComplete } = this.props;

    const ENV = getEnv();

    switch (ENV) {
      case ENV_TYPE.WEAPP:
        const rect = getMenuButtonBoundingClientRect();

        const { width, height, top } = rect;

        this.setState({
          containerHeight: `${height + top + 8}px`,
          placeholderHeight: `${top}px`,
          height: `${height}px`,
          boxHeight: `${height + top}px`,
          rightWidth: `${width + 15}px`,
        });

        if (isFunction(onAdjustComplete)) {
          onAdjustComplete({ containerHeight: height + top + 8 });
        }

        return;

      case ENV_TYPE.ALIPAY:
        recordWarn(
          `framework with env [${ENV}] has no adaptation, ignore getMenuButtonBoundingClientRect`,
        );

        if (isFunction(onAdjustComplete)) {
          onAdjustComplete({});
        }

        return;

      case ENV_TYPE.SWAN:
        recordWarn(
          `framework with env [${ENV}] has no adaptation, ignore getMenuButtonBoundingClientRect`,
        );

        if (isFunction(onAdjustComplete)) {
          onAdjustComplete({});
        }

        return;

      case ENV_TYPE.WEB:
        recordWarn(
          `framework with env [${ENV}] has no adaptation, ignore getMenuButtonBoundingClientRect`,
        );

        if (isFunction(onAdjustComplete)) {
          onAdjustComplete({});
        }

        return;

      default:
        recordWarn(
          `framework with env [${ENV}] has no adaptation, ignore getMenuButtonBoundingClientRect`,
        );

        if (isFunction(onAdjustComplete)) {
          onAdjustComplete({});
        }

        return;
    }
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
    const { fixed, children, backboardChildren, bottom } = this.props;
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

    const nav = (
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

    if (!fixed) {
      return nav;
    } else {
      return (
        <>
          {nav}

          <View
            style={{
              ...{
                minHeight: containerHeight,
                paddingBottom: '0 0 0 0',
                margin: '0 0 0 0',
                overflow: 'hidden',
              },
            }}
          ></View>
        </>
      );
    }
  }
}

HeadNavigation.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default HeadNavigation;
