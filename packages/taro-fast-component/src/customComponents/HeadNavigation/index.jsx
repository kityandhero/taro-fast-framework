import { View } from '@tarojs/components';

import {
  getGuid,
  getMenuButtonBoundingClientRect,
  recordExecute,
  recordWarn,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
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
        backboardBoxPaddingTop: 0,
      },
    };

    this.containerId = getGuid();
  }

  doWorkAdjustDidMount = () => {
    recordExecute('doWorkAdjustDidMount');

    const { onAdjustComplete } = this.props;

    const noAdaptationMessage = `framework with env [${this.getEnv()}] has no adaptation, ignore getMenuButtonBoundingClientRect`;

    this.handleEnv({
      handleWeapp: () => {
        const rect = getMenuButtonBoundingClientRect();

        const { width, height, top } = rect;

        this.setState({
          containerHeight: `${height + top + 8}px`,
          placeholderHeight: `${top}px`,
          height: `${height}px`,
          boxHeight: `${height + top}px`,
          rightWidth: `${width + 15}px`,
        });

        return { containerHeight: height + top + 8 };
      },
      handleAlipay: () => {
        recordWarn(noAdaptationMessage);

        return {};
      },
      handleSWAN: () => {
        recordWarn(noAdaptationMessage);

        return {};
      },
      handleWEB: () => {
        const rect = document.getElementById(this.containerId);

        if (rect != null) {
          const { height } = rect.getBoundingClientRect();

          this.setState({
            containerHeight: `${height + 8}px`,
            placeholderHeight: 0,
            height: `${height}px`,
            boxHeight: `${height}px`,
            rightWidth: transformSize(15),
            backboardBoxPaddingTop: 8,
          });

          return { containerHeight: height + 8 };
        }

        return {};
      },
      handleOther: () => {
        recordWarn(noAdaptationMessage);

        return {};
      },
      callback: onAdjustComplete,
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
    const { fixed, children, backboardChildren, bottom } = this.props;
    const {
      containerHeight,
      placeholderHeight,
      boxHeight,
      height,
      rightWidth,
      backboardBoxPaddingTop,
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
                ...{
                  width: '100%',
                  paddingBottom: transformSize(8),
                  paddingTop: transformSize(backboardBoxPaddingTop),
                },
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
