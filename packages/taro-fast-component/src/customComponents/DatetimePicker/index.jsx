import { PickerView, PickerViewColumn, View } from '@tarojs/components';

import {
  canToNumber,
  checkInCollection,
  isArray,
  isEmptyArray,
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

function generateDayArray(year, month) {
  let totalDays = new Date(year, month, 0).getDate();

  return generateArray(1, totalDays);
}

function getIndex(array, value) {
  if (!isArray(array) || isEmptyArray(array)) {
    return 0;
  }

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
  type: typeSource,
  year: yearSource,
  month: monthSource,
  day: daySource,
  hour: hourSource,
  minute: minuteSource,
  second: secondSource,
}) {
  const type = adjustDatetimePickerType(typeSource);

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

function buildInitialData({
  type: typeSource,
  defaultValue: defaultValueText,
  startYear,
  endYear,
}) {
  const type = adjustDatetimePickerType(typeSource);

  const years = generateArray(startYear, endYear);
  const months = generateArray(1, 12);
  const hours = generateArray(0, 23);
  const minutes = generateArray(0, 59);
  const seconds = generateArray(0, 59);

  let year = 0;
  let month = 0;
  let day = 0;
  let hour = 0;
  let minute = 0;
  let second = 0;

  const {
    year: yearAdjust,
    month: monthAdjust,
    day: dayAdjust,
    hour: hourAdjust,
    minute: minuteAdjust,
    second: secondAdjust,
    finallyValue,
  } = adjustDatetimePickerDefaultValue({
    type,
    defaultValue: defaultValueText,
  });

  year = yearAdjust;
  month = monthAdjust;
  day = dayAdjust;
  hour = hourAdjust;
  minute = minuteAdjust;
  second = secondAdjust;

  const days = generateDayArray(year, month);

  const yearIndex = getIndex(years, year);
  const monthIndex = getIndex(months, month);
  const dayIndex = getIndex(days, day);
  const hourIndex = getIndex(hours, hour);
  const minuteIndex = getIndex(minutes, minute);
  const secondIndex = getIndex(seconds, second);

  let defaultValue = [];

  switch (type) {
    case datetimePickerTypeCollection.yearMonthDayHourMinute: {
      defaultValue = [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex];

      break;
    }

    case datetimePickerTypeCollection.yearMonthDay: {
      defaultValue = [yearIndex, monthIndex, dayIndex];

      break;
    }

    case datetimePickerTypeCollection.yearMonth: {
      defaultValue = [yearIndex, monthIndex];

      break;
    }

    case datetimePickerTypeCollection.hourMinute: {
      defaultValue = [hourIndex, minuteIndex];

      break;
    }

    case datetimePickerTypeCollection.hourMinuteSecond: {
      defaultValue = [hourIndex, minuteIndex, secondIndex];

      break;
    }

    case datetimePickerTypeCollection.minuteSecond: {
      defaultValue = [minuteIndex, secondIndex];

      break;
    }

    case datetimePickerTypeCollection.yearMonthDayHourMinuteSecond: {
      defaultValue = [
        yearIndex,
        monthIndex,
        dayIndex,
        hourIndex,
        minuteIndex,
        secondIndex,
      ];

      break;
    }

    case datetimePickerTypeCollection.yearMonthDayHour: {
      defaultValue = [yearIndex, monthIndex, dayIndex, hourIndex];

      break;
    }

    default: {
      defaultValue = [];

      break;
    }
  }

  return {
    day: days[dayIndex],
    dayIndex,
    days,
    defaultValue: defaultValue,
    finallyValue,
    hour: hours[hourIndex],
    hourIndex,
    hours,
    minute: minutes[minuteIndex],
    minuteIndex,
    minutes,
    month: months[monthIndex],
    monthIndex,
    months,
    second: seconds[secondIndex],
    secondIndex,
    seconds,
    type,
    year: years[yearIndex],
    yearIndex,
    years,
  };
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

  valueStage = [];

  years = [];

  months = [];

  days = [];

  hours = [];

  minutes = [];

  seconds = [];

  year = 0;

  month = 0;

  day = 0;

  hour = 0;

  minute = 0;

  second = 0;

  yearIndex = 0;

  monthIndex = 0;

  dayIndex = 0;

  hourIndex = 0;

  minuteIndex = 0;

  secondIndex = 0;

  constructor(properties) {
    super(properties);

    const { type: typeSource, defaultValue, startYear, endYear } = properties;

    const type = adjustDatetimePickerType(typeSource);

    const {
      day,
      dayIndex,
      days,
      defaultValue: valueStage,
      finallyValue,
      hour,
      hourIndex,
      hours,
      minute,
      minuteIndex,
      minutes,
      month,
      monthIndex,
      months,
      second,
      secondIndex,
      seconds,
      year,
      yearIndex,
      years,
    } = buildInitialData({
      defaultValue,
      type,
      startYear,
      endYear,
    });

    this.years = years;
    this.months = months;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;

    this.yearIndex = yearIndex;
    this.monthIndex = monthIndex;
    this.dayIndex = dayIndex;
    this.hourIndex = hourIndex;
    this.minuteIndex = minuteIndex;
    this.secondIndex = secondIndex;

    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;

    this.valueStage = valueStage;

    this.state = {
      ...this.state,
      defaultValueFlag: '',
      endYearFlag: '',
      finallyValue,
      popupVisible: false,
      reset: false,
      startYearFlag: '',
      typeFlag: '',
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const {
      defaultValue: defaultValueSource,
      startYear: startYearSource,
      endYear: endYearSource,
      type: typeSource,
    } = nextProperties;
    const { typeFlag, defaultValueFlag, startYearFlag, endYearFlag } =
      previousState;

    const { startYear, endYear } = adjustStartAndEndYear(
      startYearSource,
      endYearSource,
    );

    let typeData = {};
    let typeChanged = false;

    const type = adjustDatetimePickerType(typeSource);
    const typeFlagNext = toMd5(toString(type));

    if (typeFlagNext !== typeFlag) {
      typeData = {
        typeFlag: typeFlagNext,
      };

      typeChanged = true;
    }

    let defaultValueData = {};
    let defaultValueChanged = false;

    const defaultValueFlagNext = toMd5(toString(defaultValueSource));

    if (defaultValueFlagNext !== defaultValueFlag) {
      defaultValueData = {
        defaultValueFlag: defaultValueFlagNext,
      };

      defaultValueChanged = true;
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

    let stageData = {};

    if (
      typeChanged ||
      defaultValueChanged ||
      startYearChanged ||
      endYearChanged
    ) {
      const { finallyValue } = buildInitialData({
        defaultValue: defaultValueSource,
        type,
        startYear,
        endYear,
      });

      stageData = {
        finallyValue,
      };
    }

    const resultData = {
      ...typeData,
      ...defaultValueData,
      ...startYearData,
      ...endYearData,
      ...stageData,
    };

    return resultData;
  }

  doWorkBeforeUpdate = (nextProperties, nextState) => {
    this.logFunctionCallTrack(
      {
        nextProperties,
        nextState,
      },
      primaryCallName,
      'doWorkBeforeUpdate',
    );

    const { type: typeSource, defaultValue } = this.getProperties();

    const { startYear, endYear } = this.getStartAndEndYear();

    const type = adjustDatetimePickerType(typeSource);

    const { years } = buildInitialData({
      defaultValue,
      type,
      startYear,
      endYear,
    });

    this.years = years;
  };

  doWorkAfterDidMount = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'doWorkAfterDidMount');

    const {
      defaultValue: defaultValueSource,
      startYear,
      endYear,
    } = this.getProperties();

    const type = this.getType();

    const {
      dayIndex,
      hourIndex,
      minuteIndex,
      monthIndex,
      secondIndex,
      yearIndex,
    } = buildInitialData({
      defaultValue: defaultValueSource,
      type,
      startYear,
      endYear,
    });

    this.yearIndex = yearIndex;
    this.monthIndex = monthIndex;
    this.dayIndex = dayIndex;
    this.hourIndex = hourIndex;
    this.minuteIndex = minuteIndex;
    this.secondIndex = secondIndex;
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

  getStartAndEndYear = () => {
    const { startYear, endYear } = this.getProperties();

    return adjustStartAndEndYear(startYear, endYear);
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

  triggerChange = (event) => {
    const {
      detail: { value },
    } = event;

    this.valueStage = value;

    const yearPrevious = this.year;
    const monthPrevious = this.month;

    const type = this.getType();

    let yearChanged = false;
    let monthChanged = false;

    switch (type) {
      case datetimePickerTypeCollection.yearMonthDayHourMinute: {
        const yearIndex = value[0];
        const monthIndex = value[1];
        const dayIndex = value[2];
        const hourIndex = value[3];
        const minuteIndex = value[4];

        if (yearIndex != this.yearIndex) {
          yearChanged = true;
        }

        if (monthIndex != this.monthIndex) {
          monthChanged = true;
        }

        this.yearIndex = yearIndex;
        this.monthIndex = monthIndex;
        this.dayIndex = dayIndex;
        this.hourIndex = hourIndex;
        this.minuteIndex = minuteIndex;

        this.year = this.years[yearIndex];
        this.month = this.months[monthIndex];
        this.day = this.days[dayIndex];
        this.hour = this.hours[hourIndex];
        this.minute = this.minutes[minuteIndex];

        break;
      }

      case datetimePickerTypeCollection.yearMonthDay: {
        const yearIndex = value[0];
        const monthIndex = value[1];
        const dayIndex = value[2];

        if (yearIndex != this.yearIndex) {
          yearChanged = true;
        }

        if (monthIndex != this.monthIndex) {
          monthChanged = true;
        }

        this.yearIndex = yearIndex;
        this.monthIndex = monthIndex;
        this.dayIndex = dayIndex;

        this.year = this.years[yearIndex];
        this.month = this.months[monthIndex];
        this.day = this.days[dayIndex];

        break;
      }

      case datetimePickerTypeCollection.yearMonth: {
        const yearIndex = value[0];
        const monthIndex = value[1];

        if (yearIndex != this.yearIndex) {
          yearChanged = true;
        }

        if (monthIndex != this.monthIndex) {
          monthChanged = true;
        }

        this.yearIndex = yearIndex;
        this.monthIndex = monthIndex;

        this.year = this.years[yearIndex];
        this.month = this.months[monthIndex];

        break;
      }

      case datetimePickerTypeCollection.hourMinute: {
        const hourIndex = value[0];
        const minuteIndex = value[1];

        this.hourIndex = hourIndex;
        this.minuteIndex = minuteIndex;

        this.hour = this.hours[hourIndex];
        this.minute = this.minutes[minuteIndex];

        break;
      }

      case datetimePickerTypeCollection.hourMinuteSecond: {
        const hourIndex = value[0];
        const minuteIndex = value[1];
        const secondIndex = value[2];

        this.hourIndex = hourIndex;
        this.minuteIndex = minuteIndex;
        this.secondIndex = secondIndex;

        this.hour = this.hours[hourIndex];
        this.minute = this.minutes[minuteIndex];
        this.second = this.seconds[secondIndex];

        break;
      }

      case datetimePickerTypeCollection.minuteSecond: {
        const minuteIndex = value[0];
        const secondIndex = value[1];

        this.minuteIndex = minuteIndex;
        this.secondIndex = secondIndex;

        this.minute = this.minutes[minuteIndex];
        this.second = this.seconds[secondIndex];

        break;
      }

      case datetimePickerTypeCollection.yearMonthDayHourMinuteSecond: {
        const yearIndex = value[0];
        const monthIndex = value[1];
        const dayIndex = value[2];
        const hourIndex = value[3];
        const minuteIndex = value[4];
        const secondIndex = value[5];

        if (yearIndex != this.yearIndex) {
          yearChanged = true;
        }

        if (monthIndex != this.monthIndex) {
          monthChanged = true;
        }

        this.yearIndex = yearIndex;
        this.monthIndex = monthIndex;
        this.dayIndex = dayIndex;
        this.hourIndex = hourIndex;
        this.minuteIndex = minuteIndex;
        this.secondIndex = secondIndex;

        this.year = this.years[yearIndex];
        this.month = this.months[monthIndex];
        this.day = this.days[dayIndex];
        this.hour = this.hours[hourIndex];
        this.minute = this.minutes[minuteIndex];
        this.second = this.seconds[secondIndex];

        break;
      }

      case datetimePickerTypeCollection.yearMonthDayHour: {
        const yearIndex = value[0];
        const monthIndex = value[1];
        const dayIndex = value[2];
        const hourIndex = value[3];

        if (yearIndex != this.yearIndex) {
          yearChanged = true;
        }

        if (monthIndex != this.monthIndex) {
          monthChanged = true;
        }

        this.yearIndex = yearIndex;
        this.monthIndex = monthIndex;
        this.dayIndex = dayIndex;
        this.hourIndex = hourIndex;

        this.year = this.years[yearIndex];
        this.month = this.months[monthIndex];
        this.day = this.days[dayIndex];
        this.hour = this.hours[hourIndex];

        break;
      }

      default: {
        break;
      }
    }

    if (yearChanged || monthChanged) {
      let changeDays = false;

      if (yearChanged && this.month === 2) {
        changeDays = true;
      }

      if (!yearChanged && monthChanged) {
        changeDays = true;
      }

      if (changeDays) {
        const daysPrevious = generateDayArray(yearPrevious, monthPrevious);

        const days = generateDayArray(this.year, this.month);

        if (daysPrevious.length !== days.length) {
          this.days = days;

          const that = this;

          that.forceUpdate();
        }
      }
    }
  };

  onOk = () => {
    const { afterChange } = this.getProperties();

    const type = this.getType();

    setTimeout(() => {
      const finallyValue = buildDatetimePickerFinallyValue({
        type,
        year: this.year,
        month: this.month,
        day: this.day,
        hour: this.hour,
        minute: this.minute,
        second: this.second,
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
      okColor,
      position,
      style,
      unitBar,
      valueFormat,
      viewBuilder,
    } = this.getProperties();

    const { finallyValue, popupVisible, reset } = this.state;

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
            value={this.valueStage}
            onChange={this.triggerChange}
          >
            {!reset &&
            (type < datetimePickerTypeCollection.hourMinute ||
              type ==
                datetimePickerTypeCollection.yearMonthDayHourMinuteSecond ||
              type == datetimePickerTypeCollection.yearMonthDayHour) ? (
              <PickerViewColumn>
                {this.years.map((item) => {
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
                {this.months.map((item) => {
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
                {this.days.map((item) => {
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
                {this.hours.map((item) => {
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
                {this.minutes.map((item) => {
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
                {this.seconds.map((item) => {
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
