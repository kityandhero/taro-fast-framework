import { View } from '@tarojs/components';
import { ENV_TYPE, getEnv } from '@tarojs/taro';

import {
  getGuid,
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
  containerId = '';

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        containerHeight: '',
        placeholderHeight: 0,
        boxHeight: 0,
        height: 0,
        rightWidth: 0,
      },
    };

    this.containerId = getGuid();
  }

  doWorkAdjustDidMount = () => {
    recordExecute('doWorkAdjustDidMount');

    const { onAdjustComplete } = this.props;

    const ENV = getEnv();

    const noAdaptationMessage = `framework with env [${ENV}] has no adaptation, ignore getMenuButtonBoundingClientRect`;

    switch (ENV) {
      case ENV_TYPE.WEAPP:
        {
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
        }

        return;

      case ENV_TYPE.ALIPAY:
        recordWarn(noAdaptationMessage);

        if (isFunction(onAdjustComplete)) {
          onAdjustComplete({});
        }

        return;

      case ENV_TYPE.SWAN:
        recordWarn(noAdaptationMessage);

        if (isFunction(onAdjustComplete)) {
          onAdjustComplete({});
        }

        return;

      case ENV_TYPE.WEB:
        {
          recordWarn(noAdaptationMessage);

          const rect = document.getElementById(this.containerId);

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
        }

        return;

      default:
        recordWarn(noAdaptationMessage);

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
        id={this.containerId}
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
          bottomStyle={{
            position: 'relative',
          }}
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
