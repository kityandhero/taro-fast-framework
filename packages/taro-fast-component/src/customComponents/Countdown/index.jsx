import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { toDatetime } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import './index.less';

const defaultProps = {
  style: '',
  className: '',
  isCard: false,
  isShowDay: false,
  isShowHour: true,
  format: {
    day: '天',
    hours: '时',
    minutes: '分',
    seconds: '秒',
  },
  endTime: null,
  afterEnd: null,
};

function formatNum(num) {
  return num <= 9 ? `0${num}` : `${num}`;
}

class Countdown extends ComponentBase {
  timer = null;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        endTime: null,
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { endTime } = nextProps;

    return { endTime };
  }

  componentDidMount() {
    const { endTime } = this.state;

    if (endTime) {
      this.countFun(endTime);
    }
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
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
    let sysSecond = et - new Date().getTime();

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
    const { className, style, format, isShowDay, isCard, isShowHour } =
      this.props;

    const { day, hour, minute, second } = this.state;

    return (
      <View
        className={classNames(
          {
            'tfc-countdown': true,
            'tfc-countdown--card': isCard,
          },
          className,
        )}
        style={style}
      >
        {isShowDay ? (
          <View className="tfc-countdown__item tfc-countdown__value">
            {formatNum(day)}
          </View>
        ) : null}
        {isShowDay ? (
          <View className="tfc-countdown__item tfc-countdown__separator">
            {format.day}
          </View>
        ) : null}

        {isShowHour ? (
          <View className="tfc-countdown__item tfc-countdown__value">
            {formatNum(hour)}
          </View>
        ) : null}
        {isShowHour ? (
          <View className="tfc-countdown__item tfc-countdown__separator">
            {format.hours}
          </View>
        ) : null}

        <View className="tfc-countdown__item tfc-countdown__value">
          {formatNum(minute)}
        </View>
        <View className="tfc-countdown__item tfc-countdown__separator">
          {format.minutes}
        </View>

        <View className="tfc-countdown__item tfc-countdown__value">
          {formatNum(second)}
        </View>
        <View className="tfc-countdown__item tfc-countdown__separator">
          {format.seconds}
        </View>
      </View>
    );
  }
}

Countdown.defaultProps = {
  ...defaultProps,
};

export default Countdown;
