import { PickerView, PickerViewColumn, View } from '@tarojs/components';

import {
  canToNumber,
  checkInCollection,
  isFunction,
  isString,
  toMd5,
  toNumber,
  toString,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { CenterBox } from '../CenterBox';
import { ColorText } from '../ColorText';
import { FlexBox } from '../FlexBox';
import { Popup, popupPositionCollection } from '../Popup';

const primaryCallName = 'customComponents::DatetimePicker';

const datetimePickerTypeCollection = {
  yearMonthDayHourMinute: 1,
  yearMonthDay: 2,
  yearMonth: 3,
  hourMinute: 4,
  hourMinuteSecond: 5,
  minuteSecond: 6,
  yearMonthDayHourMinuteSecond: 7,
  yearMonthDayHour: 8,
};

const datetimePickerPositionCollection = popupPositionCollection;

const columnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: transformSize(34),
  color: '#333',
};

const barItemStyle = {
  flex: 1,
  textAlign: 'center',
};

const defaultHeight = 460;
const defaultStartYear = 1980;
const defaultEndYear = 2050;
const minHeight = 300;
const maxHeight = 600;

function generateArray(start, end) {
  const result = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index,
  );

  return result;
}

function getIndex(array, value) {
  let index = array.indexOf(value);

  return ~index ? index : 0;
}

function formatNumber(v) {
  return v < 10 ? '0' + v : v + '';
}

function formatColumnValue(v) {
  return v < 10 ? '0' + v : v + '';
}

function adjustDatetimePickerType(type) {
  const typeAdjust = checkInCollection(
    [
      datetimePickerTypeCollection.yearMonth,
      datetimePickerTypeCollection.yearMonthDay,
      datetimePickerTypeCollection.yearMonthDayHour,
      datetimePickerTypeCollection.yearMonthDayHourMinute,
      datetimePickerTypeCollection.yearMonthDayHourMinuteSecond,
      datetimePickerTypeCollection.hourMinute,
      datetimePickerTypeCollection.hourMinuteSecond,
      datetimePickerTypeCollection.minuteSecond,
    ],
    type,
  )
    ? type
    : datetimePickerTypeCollection.yearMonthDayHourMinuteSecond;

  return typeAdjust;
}

function adjustDatetimePickerDefaultValue({ defaultValue, type }) {
  const defaultValueAdjust = isString(defaultValue) ? defaultValue : '';

  let defaultValueProcessed = defaultValueAdjust.replaceAll('-', '/');

  defaultValueProcessed =
    defaultValueProcessed && !defaultValueProcessed.includes('/')
      ? `2020/01/01 ${defaultValueProcessed}`
      : defaultValueProcessed;

  let time = null;

  time = defaultValueProcessed ? new Date(defaultValueProcessed) : new Date();

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const finallyValue = buildDatetimePickerFinallyValue({
    type,
    year,
    month,
    day,
    hour,
    minute,
    second,
  });

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    finallyValue,
  };
}

function adjustStartYear(startYear) {
  if (!canToNumber(startYear)) {
    return defaultStartYear;
  }

  const startYearAdjust = toNumber(startYear);

  if (startYearAdjust < 1800) {
    return defaultStartYear;
  }

  if (startYearAdjust > 3000) {
    return defaultStartYear;
  }

  return startYearAdjust;
}

function adjustEndYear(endYear) {
  if (!canToNumber(endYear)) {
    return defaultEndYear;
  }

  const endYearAdjust = toNumber(endYear);

  if (endYearAdjust < 1800) {
    return defaultEndYear;
  }

  if (endYearAdjust > 3000) {
    return defaultEndYear;
  }

  return endYearAdjust;
}

function adjustStartAndEndYear(startYear, endYear) {
  const startYearAdjust = adjustStartYear(startYear);

  const endYearAdjust = adjustEndYear(endYear);

  return {
    startYear: startYearAdjust,
    endYear:
      endYearAdjust > startYearAdjust ? endYearAdjust : startYearAdjust + 30,
  };
}

function buildDatetimePickerFinallyValue({
  type,
  year: yearSource,
  month: monthSource,
  day: daySource,
  hour: hourSource,
  minute: minuteSource,
  second: secondSource,
}) {
  let result = {};

  const yearSelect = yearSource;
  const monthSelect = formatNumber(monthSource || 0);
  const daySelect = formatNumber(daySource || 0);
  const hourSelect = formatNumber(hourSource || 0);
  const minuteSelect = formatNumber(minuteSource || 0);
  const secondSelect = formatNumber(secondSource || 0);

  const year = toNumber(yearSelect);
  const yearText = toString(yearSelect);
  const month = toNumber(monthSelect);
  const monthText = toString(monthSelect);
  const day = toNumber(daySelect);
  const dayText = toString(daySelect);
  const hour = toNumber(hourSelect);
  const hourText = toString(hourSelect);
  const minute = toNumber(minuteSelect);
  const minuteText = toString(minuteSelect);
  const second = toNumber(secondSelect);
  const secondText = toString(secondSelect);

  switch (type) {
    case datetimePickerTypeCollection.yearMonthDayHourMinute: {
      result = {
        year,
        yearText,
        month,
        monthText,
        day,
        dayText,
        hour,
        hourText,
        minute,
        minuteText,
        integrityValue: `${yearText}-${monthText}-${dayText} ${hourText}:${minuteText}`,
      };
      break;
    }

    case datetimePickerTypeCollection.yearMonthDay: {
      result = {
        year,
        yearText,
        month,
        monthText,
        day,
        dayText,
        integrityValue: `${yearText}-${monthText}-${dayText}`,
      };
      break;
    }

    case datetimePickerTypeCollection.yearMonth: {
      result = {
        year,
        yearText,
        month,
        monthText,
        integrityValue: `${yearText}-${monthText}`,
      };
      break;
    }

    case datetimePickerTypeCollection.hourMinute: {
      result = {
        hour,
        hourText,
        minute,
        minuteText,
        integrityValue: `${hourText}:${minuteText}`,
      };
      break;
    }

    case datetimePickerTypeCollection.hourMinuteSecond: {
      result = {
        hour,
        hourText,
        minute,
        minuteText,
        second,
        secondText,
        integrityValue: `${hourText}:${minuteText}:${secondText}`,
      };
      break;
    }

    case datetimePickerTypeCollection.minuteSecond: {
      result = {
        minute,
        minuteText,
        second,
        secondText,
        integrityValue: `${minuteText}:${secondText}`,
      };
      break;
    }

    case datetimePickerTypeCollection.yearMonthDayHourMinuteSecond: {
      result = {
        year,
        yearText,
        month,
        monthText,
        day,
        dayText,
        hour,
        hourText,
        minute,
        minuteText,
        second,
        secondText,
        integrityValue: `${yearText}-${monthText}-${dayText} ${hourText}:${minuteText}:${secondText}`,
      };
      break;
    }

    case datetimePickerTypeCollection.yearMonthDayHour: {
      result = {
        year,
        yearText,
        month,
        monthText,
        day,
        dayText,
        hour,
        hourText,
        integrityValue: `${yearText}-${monthText}-${dayText} ${hourText}:00`,
      };
      break;
    }

    default: {
      break;
    }
  }

  const resultAdjust = {
    integrityValue: '',
    ...result,
  };

  return resultAdjust;
}

const defaultProperties = {
  afterChange: null,
  arc: false,
  cancelColor: '#888',
  defaultValue: '',
  disabled: false,
  endYear: 2050,
  height: defaultHeight,
  okColor: '#5677fc',
  position: datetimePickerPositionCollection.bottom,
  startYear: defaultStartYear,
  style: {},
  type: datetimePickerTypeCollection.yearMonthDayHourMinuteSecond,
  unitBar: false,
  valueFormat: null,
  viewBuilder: null,
};

class DatetimePicker extends BaseComponent {
  // showCallTrack = true;

  // showCallTrace = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      popupVisible: false,
      defaultValueFlag: '',
      startYearFlag: '',
      endYearFlag: '',
      years: [],
      months: [],
      days: [],
      hours: [],
      minutes: [],
      seconds: [],
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      value: [0, 0, 0, 0, 0, 0],
      reset: false,
      finallyValue: {},
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const {
      defaultValue: defaultValueSource,
      startYear: startYearSource,
      endYear: endYearSource,
      type: typeSource,
    } = nextProperties;
    const { defaultValueFlag, startYearFlag, endYearFlag, year } =
      previousState;

    const { startYear, endYear } = adjustStartAndEndYear(
      startYearSource,
      endYearSource,
    );

    let defaultValueData = {};
    const defaultValueFlagNext = toMd5(toString(defaultValueSource));

    if (defaultValueFlagNext !== defaultValueFlag) {
      const type = adjustDatetimePickerType(typeSource);

      const { finallyValue } = adjustDatetimePickerDefaultValue({
        defaultValue: defaultValueSource,
        type,
      });

      defaultValueData = {
        defaultValueFlag: defaultValueFlagNext,
        finallyValue,
      };
    }

    let startYearData = {};
    let startYearChanged = false;

    const startYearFlagNext = toMd5(toString(startYear));

    if (startYearFlagNext !== startYearFlag) {
      startYearData = {
        startYearFlag: startYearFlagNext,
      };

      startYearChanged = true;
    }

    let endYearData = {};
    let endYearChanged = false;

    const endYearFlagNext = toMd5(toString(endYear));

    if (endYearFlagNext !== endYearFlag) {
      endYearData = {
        endYearFlag: endYearFlagNext,
      };

      endYearChanged = true;
    }

    let yearsData = {};

    if (startYearChanged || endYearChanged) {
      const valueTarget = 'value[0]';
      const years = generateArray(startYear, endYear);

      yearsData = {
        years: years,
        [valueTarget]: getIndex(years, year),
      };
    }

    return {
      ...defaultValueData,
      ...startYearData,
      ...endYearData,
      ...yearsData,
    };
  }

  doWorkAfterDidMount = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'doWorkAfterDidMount');

    this.initData();
  };

  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  getType = () => {
    const { type } = this.getProperties();

    return adjustDatetimePickerType(type);
  };

  getHeight = () => {
    const { height: heightSource } = this.getProperties();

    if (!canToNumber(heightSource)) {
      return defaultHeight;
    }

    const heightAdjust = toNumber(heightSource);

    if (heightAdjust < minHeight) {
      return defaultHeight;
    }

    if (heightAdjust > maxHeight) {
      return defaultHeight;
    }

    return heightAdjust;
  };

  initSelectValue = () => {
    const { defaultValue } = this.getProperties();

    const type = this.getType();

    const { year, month, day, hour, minute, second, finallyValue } =
      adjustDatetimePickerDefaultValue({
        defaultValue,
        type,
      });

    this.setState({
      year,
      month,
      day,
      hour,
      minute,
      second,
      finallyValue,
    });
  };

  initData = () => {
    this.initSelectValue();

    this.setState({
      reset: false,
    });

    const type = this.getType();

    switch (type) {
      case datetimePickerTypeCollection.yearMonthDayHourMinute: {
        this.setState(
          {
            value: [0, 0, 0, 0, 0],
          },
          () => {
            this.setYears();
            this.setMonths();
            this.setDays();
            this.setHours();
            this.setMinutes();
          },
        );

        break;
      }

      case datetimePickerTypeCollection.yearMonthDay: {
        this.setState(
          {
            value: [0, 0, 0],
          },
          () => {
            this.setYears();
            this.setMonths();
            this.setDays();
          },
        );
        break;
      }

      case datetimePickerTypeCollection.yearMonth: {
        this.setState(
          {
            value: [0, 0],
          },
          () => {
            this.setYears();
            this.setMonths();
          },
        );
        break;
      }

      case datetimePickerTypeCollection.hourMinute: {
        this.setState(
          {
            value: [0, 0],
          },
          () => {
            this.setHours();
            this.setMinutes();
          },
        );
        break;
      }

      case datetimePickerTypeCollection.hourMinuteSecond: {
        this.setState(
          {
            value: [0, 0, 0],
          },
          () => {
            this.setHours();
            this.setMinutes();
            this.setSeconds();
          },
        );
        break;
      }

      case datetimePickerTypeCollection.minuteSecond: {
        this.setState(
          {
            value: [0, 0],
          },
          () => {
            this.setMinutes();
            this.setSeconds();
          },
        );
        break;
      }

      case datetimePickerTypeCollection.yearMonthDayHourMinuteSecond: {
        this.setState(
          {
            value: [0, 0, 0, 0, 0, 0],
          },
          () => {
            this.setYears();
            this.setMonths();
            this.setDays();
            this.setHours();
            this.setMinutes();
            this.setSeconds();
          },
        );
        break;
      }

      case datetimePickerTypeCollection.yearMonthDayHour: {
        this.setState(
          {
            value: [0, 0, 0, 0],
          },
          () => {
            this.setYears();
            this.setMonths();
            this.setDays();
            this.setHours();
          },
        );
        break;
      }

      default: {
        break;
      }
    }
  };

  setYears = () => {
    const { startYear: startYearSource, endYear: endYearSource } =
      this.getProperties();

    const { startYear, endYear } = adjustStartAndEndYear(
      startYearSource,
      endYearSource,
    );

    const that = this;

    that.setState(
      {
        years: generateArray(startYear, endYear),
      },
      () => {
        setTimeout(() => {
          const value = 'value[0]';

          const { years, year } = that.state;

          that.setState({
            [value]: getIndex(years, year),
          });
        }, 8);
      },
    );
  };

  setMonths = () => {
    const that = this;

    that.setState(
      {
        months: generateArray(1, 12),
      },
      () => {
        setTimeout(() => {
          const value = 'value[1]';

          const { months, month } = that.state;

          that.setState({
            [value]: getIndex(months, month),
          });
        }, 8);
      },
    );
  };

  setDays = () => {
    const type = this.getType();

    if (
      type == datetimePickerTypeCollection.yearMonth ||
      type == datetimePickerTypeCollection.hourMinute
    ) {
      return;
    }

    const { year, month } = this.state;

    let totalDays = new Date(year, month, 0).getDate();

    const that = this;

    that.setState(
      {
        days: generateArray(1, totalDays),
      },
      () => {
        setTimeout(() => {
          let value = 'value[2]';

          const { days, day } = that.state;

          that.setState({
            [value]: getIndex(days, day),
          });
        }, 8);
      },
    );
  };

  setHours = () => {
    const type = this.getType();

    const that = this;

    that.setState(
      {
        hours: generateArray(0, 23),
      },
      () => {
        setTimeout(() => {
          const { value: v } = that.state;

          let length = v.length;

          let index =
            type == datetimePickerTypeCollection.hourMinuteSecond ||
            type == datetimePickerTypeCollection.yearMonthDay
              ? length - 3
              : length - 2;

          let value = `value[${index}]`;

          const { hours, hour } = that.state;

          that.setState({
            [value]: getIndex(hours, hour),
          });
        }, 8);
      },
    );
  };

  setMinutes = () => {
    const type = this.getType();

    const that = this;

    that.setState(
      {
        minutes: generateArray(0, 59),
      },
      () => {
        setTimeout(() => {
          const { value: v } = that.state;

          const length = v.length;
          const index = type > 4 ? length - 2 : length - 1;
          const value = `value[${index}]`;

          const { minutes, minute } = that.state;

          that.setState({
            [value]: getIndex(minutes, minute),
          });
        }, 8);
      },
    );
  };

  setSeconds = () => {
    this.setState(
      {
        seconds: generateArray(0, 59),
      },
      () => {
        setTimeout(() => {
          const { value: v } = this.state;

          const value = `value[${v.length - 1}]`;

          const { seconds, second } = this.state;

          this.setState({
            [value]: getIndex(seconds, second),
          });
        }, 8);
      },
    );
  };

  triggerChange = (event) => {
    const {
      detail: { value },
    } = event;

    const type = this.getType();

    const { years, months, days, hours, minutes, seconds, year, month } =
      this.state;

    let yearChanged = false;
    let monthChanged = false;

    const that = this;

    switch (type) {
      case datetimePickerTypeCollection.yearMonthDayHourMinute: {
        if (year != years[value[0]]) {
          yearChanged = true;
        }

        if (month != months[value[1]]) {
          monthChanged = true;
        }

        that.setState(
          {
            value: value,
            year: years[value[0]],
            month: months[value[1]],
            day: days[value[2]],
            hour: hours[value[3]],
            minute: minutes[value[4]],
          },
          () => {
            if (yearChanged || monthChanged) {
              this.setDays();
            }
          },
        );

        break;
      }

      case datetimePickerTypeCollection.yearMonthDay: {
        if (year != years[value[0]]) {
          yearChanged = true;
        }

        if (month != months[value[1]]) {
          monthChanged = true;
        }

        that.setState(
          {
            value: value,
            year: years[value[0]],
            month: months[value[1]],
            day: days[value[2]],
          },
          () => {
            if (yearChanged || monthChanged) {
              this.setDays();
            }
          },
        );

        break;
      }

      case datetimePickerTypeCollection.yearMonth: {
        if (year != years[value[0]]) {
          yearChanged = true;
        }

        if (month != months[value[1]]) {
          monthChanged = true;
        }

        that.setState(
          {
            value: value,
            year: years[value[0]],
            month: months[value[1]],
          },
          () => {
            if (yearChanged || monthChanged) {
              this.setDays();
            }
          },
        );

        break;
      }

      case datetimePickerTypeCollection.hourMinute: {
        that.setState({
          value: value,
          hour: hours[value[0]],
          minute: minutes[value[1]],
        });

        break;
      }

      case datetimePickerTypeCollection.hourMinuteSecond: {
        that.setState({
          value: value,
          hour: hours[value[0]],
          minute: minutes[value[1]],
          second: seconds[value[2]],
        });

        break;
      }

      case datetimePickerTypeCollection.minuteSecond: {
        that.setState({
          value: value,
          minute: minutes[value[0]],
          second: seconds[value[2]],
        });

        break;
      }

      case datetimePickerTypeCollection.yearMonthDayHourMinuteSecond: {
        if (year != years[value[0]]) {
          yearChanged = true;
        }

        if (month != months[value[1]]) {
          monthChanged = true;
        }

        that.setState(
          {
            value: value,
            year: years[value[0]],
            month: months[value[1]],
            day: days[value[2]],
            hour: hours[value[3]],
            minute: minutes[value[4]],
            second: seconds[value[5]],
          },
          () => {
            if (yearChanged || monthChanged) {
              this.setDays();
            }
          },
        );

        break;
      }

      case datetimePickerTypeCollection.yearMonthDayHour: {
        if (year != years[value[0]]) {
          yearChanged = true;
        }

        if (month != months[value[1]]) {
          monthChanged = true;
        }

        that.setState(
          {
            value: value,
            year: years[value[0]],
            month: months[value[1]],
            day: days[value[2]],
            hour: hours[value[3]],
          },
          () => {
            if (yearChanged || monthChanged) {
              this.setDays();
            }
          },
        );

        break;
      }

      default: {
        break;
      }
    }
  };

  onOk = () => {
    const { afterChange } = this.getProperties();

    const type = this.getType();

    const { year, month, day, hour, minute, second } = this.state;

    setTimeout(() => {
      const finallyValue = buildDatetimePickerFinallyValue({
        type,
        year,
        month,
        day,
        hour,
        minute,
        second,
      });

      if (isFunction(afterChange)) {
        afterChange(finallyValue);
      }

      this.hidePopup({
        finallyValue,
      });
    }, 80);
  };

  showPopup = () => {
    const { disabled } = this.getProperties();

    if (disabled) {
      return;
    }

    this.setState({
      popupVisible: true,
    });
  };

  hidePopup = (otherState = null) => {
    this.setState({
      popupVisible: false,
      ...otherState,
    });
  };

  renderFurther() {
    const {
      arc,
      cancelColor,
      hidden,
      okColor,
      position,
      style,
      unitBar,
      valueFormat,
      viewBuilder,
    } = this.getProperties();

    const {
      days,
      finallyValue,
      hours,
      minutes,
      months,
      popupVisible,
      reset,
      seconds,
      value,
      years,
    } = this.state;

    if (hidden) {
      return null;
    }

    if (!isFunction(viewBuilder)) {
      return null;
    }

    const type = this.getType();

    const height = this.getHeight();

    const inner = viewBuilder(
      isFunction(valueFormat) ? valueFormat(finallyValue) : finallyValue,
    );

    const columnStyleAdjust = {
      ...columnStyle,
      ...(unitBar
        ? {
            fontSize: transformSize(30),
          }
        : {}),
    };

    return (
      <>
        <View style={style} onClick={this.showPopup}>
          {inner || '视图构建器未返回构建结果'}
        </View>

        <Popup
          visible={popupVisible}
          position={position}
          space={false}
          border={false}
          bodyBorder={false}
          footerBorder={false}
          closeWhenOverlayClick
          closeIcon={null}
          arcTop={arc}
          showClose={false}
          onClose={this.hidePopup}
        >
          <FlexBox
            flexAuto="left"
            style={{
              height: transformSize(80),
              width: '100%',
            }}
            left={
              <View
                style={{ width: transformSize(120) }}
                onClick={this.hidePopup}
              >
                <CenterBox>
                  <ColorText color={cancelColor} fontSize={32} text="取消" />
                </CenterBox>
              </View>
            }
            right={
              <View style={{ width: transformSize(120) }} onClick={this.onOk}>
                <CenterBox>
                  <ColorText color={okColor} fontSize={32} text="确定" />
                </CenterBox>
              </View>
            }
          />

          {unitBar ? (
            <view
              // style="background-color:{{unitBackground}}"
              style={{
                width: '100%',
                height: transformSize(60),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: transformSize(28),
                lineHeight: transformSize(28),
                color: '#555',
                boxShadow: '0 15rpx 10rpx -15rpx #efefef',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {type < datetimePickerTypeCollection.hourMinute ||
              type ==
                datetimePickerTypeCollection.yearMonthDayHourMinuteSecond ||
              type == datetimePickerTypeCollection.yearMonthDayHour ? (
                <view style={barItemStyle}>年</view>
              ) : null}

              {type < datetimePickerTypeCollection.hourMinute ||
              type ==
                datetimePickerTypeCollection.yearMonthDayHourMinuteSecond ||
              type == datetimePickerTypeCollection.yearMonthDayHour ? (
                <view style={barItemStyle}>月</view>
              ) : null}

              {type == datetimePickerTypeCollection.yearMonthDayHourMinute ||
              type == datetimePickerTypeCollection.yearMonthDay ||
              type ==
                datetimePickerTypeCollection.yearMonthDayHourMinuteSecond ||
              type == datetimePickerTypeCollection.yearMonthDayHour ? (
                <view style={barItemStyle}>日</view>
              ) : null}

              {type == datetimePickerTypeCollection.yearMonthDayHourMinute ||
              type == datetimePickerTypeCollection.hourMinute ||
              type == datetimePickerTypeCollection.hourMinuteSecond ||
              type ==
                datetimePickerTypeCollection.yearMonthDayHourMinuteSecond ||
              type == datetimePickerTypeCollection.yearMonthDayHour ? (
                <view style={barItemStyle}>时</view>
              ) : null}

              {(type == datetimePickerTypeCollection.yearMonthDayHourMinute ||
                type > datetimePickerTypeCollection.yearMonth) &&
              type != datetimePickerTypeCollection.yearMonthDayHour ? (
                <view style={barItemStyle}>分</view>
              ) : null}

              {type > datetimePickerTypeCollection.hourMinute &&
              type != datetimePickerTypeCollection.yearMonthDayHour ? (
                <view style={barItemStyle}>秒</view>
              ) : null}
            </view>
          ) : null}

          <PickerView
            style={{
              height: transformSize(height),
              boxSizing: 'border-box',
            }}
            value={value}
            onChange={this.triggerChange}
          >
            {!reset &&
            (type < datetimePickerTypeCollection.hourMinute ||
              type ==
                datetimePickerTypeCollection.yearMonthDayHourMinuteSecond ||
              type == datetimePickerTypeCollection.yearMonthDayHour) ? (
              <PickerViewColumn>
                {years.map((item) => {
                  return (
                    <View key={`year_${item}`} style={columnStyleAdjust}>
                      {item}
                      {unitBar ? null : '年'}
                    </View>
                  );
                })}
              </PickerViewColumn>
            ) : null}

            {!reset &&
            (type < datetimePickerTypeCollection.hourMinute ||
              type ==
                datetimePickerTypeCollection.yearMonthDayHourMinuteSecond ||
              type == datetimePickerTypeCollection.yearMonthDayHour) ? (
              <PickerViewColumn>
                {months.map((item) => {
                  return (
                    <View key={`month_${item}`} style={columnStyleAdjust}>
                      {formatColumnValue(item)}
                      {unitBar ? null : '月'}
                    </View>
                  );
                })}
              </PickerViewColumn>
            ) : null}

            {!reset &&
            (type == datetimePickerTypeCollection.yearMonthDayHourMinute ||
              type == datetimePickerTypeCollection.yearMonthDay ||
              type ==
                datetimePickerTypeCollection.yearMonthDayHourMinuteSecond ||
              type == datetimePickerTypeCollection.yearMonthDayHour) ? (
              <PickerViewColumn>
                {days.map((item) => {
                  return (
                    <View key={`day_${item}`} style={columnStyleAdjust}>
                      {formatColumnValue(item)}
                      {unitBar ? null : '日'}
                    </View>
                  );
                })}
              </PickerViewColumn>
            ) : null}

            {!reset &&
            (type == datetimePickerTypeCollection.yearMonthDayHourMinute ||
              type == datetimePickerTypeCollection.hourMinute ||
              type == datetimePickerTypeCollection.hourMinuteSecond ||
              type ==
                datetimePickerTypeCollection.yearMonthDayHourMinuteSecond ||
              type == datetimePickerTypeCollection.yearMonthDayHour) ? (
              <PickerViewColumn>
                {hours.map((item) => {
                  return (
                    <View key={`hour_${item}`} style={columnStyleAdjust}>
                      {formatColumnValue(item)}
                      {unitBar ? null : '时'}
                    </View>
                  );
                })}
              </PickerViewColumn>
            ) : null}

            {!reset &&
            (type == datetimePickerTypeCollection.yearMonthDayHourMinute ||
              type > datetimePickerTypeCollection.yearMonth) &&
            type != datetimePickerTypeCollection.yearMonthDayHour ? (
              <PickerViewColumn>
                {minutes.map((item) => {
                  return (
                    <View key={`hour_${item}`} style={columnStyleAdjust}>
                      {formatColumnValue(item)}
                      {unitBar ? null : '分'}
                    </View>
                  );
                })}
              </PickerViewColumn>
            ) : null}

            {!reset &&
            type > datetimePickerTypeCollection.hourMinute &&
            type != datetimePickerTypeCollection.yearMonthDayHour ? (
              <PickerViewColumn>
                {seconds.map((item) => {
                  return (
                    <View key={`hour_${item}`} style={columnStyleAdjust}>
                      {formatColumnValue(item)}
                      {unitBar ? null : '秒'}
                    </View>
                  );
                })}
              </PickerViewColumn>
            ) : null}
          </PickerView>
        </Popup>
      </>
    );
  }
}

DatetimePicker.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProperties,
};

export {
  adjustDatetimePickerDefaultValue,
  adjustDatetimePickerType,
  buildDatetimePickerFinallyValue,
  DatetimePicker,
  datetimePickerPositionCollection,
  datetimePickerTypeCollection,
};
