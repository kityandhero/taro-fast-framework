import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction, toDatetime } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-countdown`;

const defaultProps = {
  style: '',
  className: '',
  cardMode: false,
  fillCard: false,
  showDay: false,
  showHour: true,
  showMinute: true,
  format: {
    day: '天',
    hours: '时',
    minutes: '分',
    seconds: '秒',
  },
  valueColor: '',
  separatorColor: '',
  borderColor: '',
  backgroundColor: '',
  endTime: null,
  afterEnd: null,
};

function formatNumber(o) {
  return o <= 9 ? `0${o}` : `${o}`;
}

class Countdown extends BaseComponent {
  timer = null;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      endTime: null,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { endTime } = nextProperties;

    return { endTime };
  }

  componentDidMount() {
    const { endTime } = this.state;

    if (endTime) {
      this.countFun(endTime);
    }
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {
    const { endTime } = this.state;

    if (this.timer != null) {
      clearInterval(this.timer);
    }

    if (endTime) {
      this.countFun(endTime);
    }
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  countFun = (time) => {
    const et = toDatetime(time).getTime();
    let sysSecond = et - Date.now();

    this.timer = setInterval(() => {
      // 防止倒计时出现负数
      if (sysSecond > 1000) {
        sysSecond -= 1000;

        const day = Math.floor(sysSecond / 1000 / 3600 / 24);
        const hour = Math.floor((sysSecond / 1000 / 3600) % 24);
        const minute = Math.floor((sysSecond / 1000 / 60) % 60);
        const second = Math.floor((sysSecond / 1000) % 60);

        this.setState({
          day,
          hour: hour,
          minute: minute,
          second: second,
        });
      } else {
        clearInterval(this.timer);

        // 倒计时结束时触发父组件的方法
        const { afterEnd } = this.props;

        if (isFunction(afterEnd)) {
          afterEnd();
        }
      }
    }, 1000);
  };

  renderFurther() {
    const {
      className,
      style,
      format,
      showDay,
      cardMode,
      fillCard,
      showHour,
      showMinute,
      valueColor,
      separatorColor,
      borderColor,
      backgroundColor,
    } = this.props;

    const { day, hour, minute, second } = this.state;

    const valueStyleChanged = {
      ...(valueColor
        ? {
            color: valueColor,
          }
        : {}),
      ...(!!cardMode && !fillCard && !!borderColor
        ? {
            borderColor: borderColor,
          }
        : {}),
      ...(!!cardMode && !!fillCard && !!backgroundColor
        ? {
            borderColor: backgroundColor,
          }
        : {}),
      ...(!!cardMode && !!fillCard && !!backgroundColor
        ? {
            backgroundColor: backgroundColor,
          }
        : {}),
    };

    const separatorColorChanged = {
      ...(separatorColor
        ? {
            color: separatorColor,
          }
        : {}),
    };

    return (
      <View
        className={classNames(
          {
            [`${classPrefix}`]: true,
            [`${classPrefix}--card`]: cardMode,
          },
          className,
        )}
        style={style}
      >
        {showDay ? (
          <View
            className={classNames({
              [`${classPrefix}__item`]: true,
              [`${classPrefix}__value`]: true,
              [`${classPrefix}__value_no_fill`]: !!cardMode && !fillCard,
              [`${classPrefix}__value_fill`]: !!cardMode && !!fillCard,
            })}
            style={valueStyleChanged}
          >
            {formatNumber(day)}
          </View>
        ) : null}

        {showDay ? (
          <View
            className={classNames({
              [`${classPrefix}__item`]: true,
              [`${classPrefix}__separator`]: true,
            })}
            style={separatorColorChanged}
          >
            {format.day}
          </View>
        ) : null}

        {showHour ? (
          <View
            className={classNames({
              [`${classPrefix}__item`]: true,
              [`${classPrefix}__value`]: true,
              [`${classPrefix}__value_no_fill`]: !!cardMode && !fillCard,
              [`${classPrefix}__value_fill`]: !!cardMode && !!fillCard,
            })}
            style={valueStyleChanged}
          >
            {formatNumber(hour)}
          </View>
        ) : null}

        {showHour ? (
          <View
            className={classNames({
              [`${classPrefix}__item`]: true,
              [`${classPrefix}__separator`]: true,
            })}
            style={separatorColorChanged}
          >
            {format.hours}
          </View>
        ) : null}

        {showMinute ? (
          <View
            className={classNames({
              [`${classPrefix}__item`]: true,
              [`${classPrefix}__value`]: true,
              [`${classPrefix}__value_no_fill`]: !!cardMode && !fillCard,
              [`${classPrefix}__value_fill`]: !!cardMode && !!fillCard,
            })}
            style={valueStyleChanged}
          >
            {formatNumber(minute)}
          </View>
        ) : null}

        {showMinute ? (
          <View
            className={classNames({
              [`${classPrefix}__item`]: true,
              [`${classPrefix}__separator`]: true,
            })}
            style={separatorColorChanged}
          >
            {format.minutes}
          </View>
        ) : null}

        <View
          className={classNames({
            [`${classPrefix}__item`]: true,
            [`${classPrefix}__value`]: true,
            [`${classPrefix}__value_no_fill`]: !!cardMode && !fillCard,
            [`${classPrefix}__value_fill`]: !!cardMode && !!fillCard,
          })}
          style={valueStyleChanged}
        >
          {formatNumber(second)}
        </View>

        <View
          className={classNames({
            [`${classPrefix}__item`]: true,
            [`${classPrefix}__separator`]: true,
          })}
          style={separatorColorChanged}
        >
          {format.seconds}
        </View>
      </View>
    );
  }
}

Countdown.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Countdown };
