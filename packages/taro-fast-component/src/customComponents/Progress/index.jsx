import classNames from 'classnames';
import { View } from '@tarojs/components';

import { inCollection, transformSize } from 'taro-fast-common/es/utils/tools';
import { isNumber } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

import './index.less';

const classPrefix = `tfc-progress`;

const statusCollection = ['progress', 'error', 'success'];

const defaultProps = {
  style: {},
  /**
   * 元素的颜色
   */
  activeColor: '',
  backgroundColor: '',
  /**
   * 元素的状态
   */
  status: '',
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
  showInfo: true,
  icon: null,
};

class Progress extends ComponentBase {
  getStatus = () => {
    const { status } = this.props;

    return inCollection(statusCollection, status) ? status : '';
  };

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

  renderFurther() {
    const {
      style,
      className,
      activeColor,
      backgroundColor,
      strokeWidth,
      showInfo,
    } = this.props;

    const status = this.getStatus();
    const percent = this.getPercent();

    const progressStyle = {
      ...{
        width: percent && `${+percent}%`,
        height: transformSize(strokeWidth),
      },
      ...(activeColor ? { backgroundColor: activeColor } : {}),
    };

    return (
      <View
        className={classNames(
          classPrefix,
          {
            [`${classPrefix}__progress`]: status === 'progress',
            [`${classPrefix}__error`]: status === 'error',
            [`${classPrefix}__success`]: status === 'success',
          },
          className,
        )}
        style={style}
      >
        <View className={`${classPrefix}__outer`}>
          <View
            className={`${classPrefix}__outer-inner`}
            style={{
              ...(backgroundColor ? { backgroundColor: backgroundColor } : {}),
            }}
          >
            <View
              className={`${classPrefix}__outer-inner-background`}
              style={progressStyle}
            />
          </View>
        </View>

        {showInfo ? (
          <View className={`${classPrefix}__content`}>{`${percent}%`}</View>
        ) : null}
      </View>
    );
  }
}

Progress.defaultProps = {
  ...defaultProps,
};

export default Progress;
