import classNames from 'classnames';
import { Text, View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isNumber,
  isString,
  toNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { CenterBox } from '../CenterBox';

import './index.less';

const classPrefix = `tfc-progress`;

const defaultProps = {
  hidden: false,
  /**
   * 自定义样式
   */
  style: {},
  /**
   * 进度条的颜色
   */
  activeColor: '',
  /**
   * 进度条背景色
   */
  backgroundColor: '',
  /**
   * 元素的进度
   */
  percent: 0,
  /**
   * 元素的规格
   */
  strokeWidth: 10,
  /**
   * 是否隐藏文字
   */
  showInfo: false,
  /**
   * 进行中动画
   */
  animation: false,
  /**
   * 使用圆角
   */
  useBorderRadius: true,
  /**
   * 圆角尺度
   */
  borderRadius: 12,
  /**
   * 百分比文字
   */
  fontSize: 28,
};

class Progress extends BaseComponent {
  getPercent = () => {
    const { percent } = this.props;

    if (!isNumber(percent)) {
      return 0;
    }

    const p = toNumber(percent);

    if (p < 0) {
      return 0;
    } else if (p > 100) {
      return 100;
    }

    return p;
  };

  getActiveColor = () => {
    const { activeColor } = this.props;

    if (isString(activeColor)) {
      if (checkStringIsNullOrWhiteSpace(activeColor)) {
        return {};
      }

      return { backgroundColor: activeColor };
    }

    if (isArray(activeColor)) {
      const a = activeColor.filter(
        (o) => isString(o) && !checkStringIsNullOrWhiteSpace(o),
      );

      if (a.length > 0) {
        return {
          backgroundImage: `linear-gradient(to right, ${a.join(',')})`,
        };
      }
    }

    return {};
  };

  renderFurther() {
    const {
      style,
      className,
      backgroundColor,
      strokeWidth,
      showInfo,
      animation,
      useBorderRadius,
      borderRadius,
      fontSize,
    } = this.props;

    const percent = this.getPercent();
    const activeColor = this.getActiveColor();

    const styleContainer = {
      ...style,

      display: 'flex',
      alignItems: 'center',
    };

    const containerStyle = {
      ...(backgroundColor ? { backgroundColor: backgroundColor } : {}),
      ...(useBorderRadius
        ? {
            borderRadius: transformSize(borderRadius),
          }
        : {}),
    };

    const progressStyle = {
      width: percent && `${+percent}%`,
      height: transformSize(strokeWidth),
      ...activeColor,
      ...(useBorderRadius
        ? {
            borderRadius: transformSize(borderRadius),
          }
        : {}),
    };

    return (
      <View
        className={classNames(
          classPrefix,
          {
            [`${classPrefix}__progress`]: !!animation,
          },
          className,
        )}
        style={styleContainer}
      >
        <View className={`${classPrefix}__outer`}>
          <View
            className={`${classPrefix}__outer-inner`}
            style={containerStyle}
          >
            <View
              className={`${classPrefix}__outer-inner-background`}
              style={progressStyle}
            />
          </View>
        </View>

        {showInfo ? (
          <View className={`${classPrefix}__content`}>
            <CenterBox>
              <Text
                style={{
                  fontSize: transformSize(fontSize),
                }}
                userSelect
              >{`${percent}%`}</Text>
            </CenterBox>
          </View>
        ) : null}
      </View>
    );
  }
}

Progress.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Progress };
