import {
  canToNumber,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertSolarToLunar,
  isFunction,
  logException,
  toNumber,
  toString,
} from 'easy-soft-utility';

import {
  calendarArrowModeCollection,
  calendarMaxYear,
  calendarMinYear,
  calendarSelectModeCollection,
  dayConfig,
  primaryCallName,
} from './constant';

export function adjustCalendarArrowMode(arrowMode) {
  if (!canToNumber(arrowMode)) {
    return calendarArrowModeCollection.monthAndYear;
  }

  const arrowModeValue = toNumber(arrowMode);

  const arrowModeAdjust = checkInCollection(
    [
      calendarArrowModeCollection.monthAndYear,
      calendarArrowModeCollection.month,
    ],
    arrowModeValue,
  )
    ? arrowModeValue
    : calendarArrowModeCollection.yearMonthDayHourMinuteSecond;

  return arrowModeAdjust;
}

export function adjustCalendarSelectMode(selectMode) {
  if (!canToNumber(selectMode)) {
    return calendarSelectModeCollection.single;
  }

  const selectModeValue = toNumber(selectMode);

  const selectModeAdjust = checkInCollection(
    [calendarSelectModeCollection.single, calendarSelectModeCollection.range],
    selectModeValue,
  )
    ? selectModeValue
    : calendarSelectModeCollection.single;

  return selectModeAdjust;
}

function adjustCalendarMinYear(minYear) {
  if (!canToNumber(minYear)) {
    return calendarMinYear;
  }

  const minYearAdjust = toNumber(minYear);

  if (minYearAdjust < calendarMinYear) {
    return calendarMinYear;
  }

  return minYearAdjust;
}

function adjustCalendarMaxYear(maxYear) {
  if (!canToNumber(maxYear)) {
    return calendarMaxYear;
  }

  const maxYearAdjust = toNumber(maxYear);

  if (maxYearAdjust > calendarMaxYear) {
    return calendarMaxYear;
  }

  return maxYearAdjust;
}

export function adjustCalendarMinYearAndMaxYear(minYear, maxYear) {
  if (!canToNumber(maxYear)) {
    return calendarMaxYear;
  }

  const minYearAdjust = adjustCalendarMinYear(minYear);

  const maxYearAdjust = adjustCalendarMaxYear(maxYear);

  if (minYearAdjust > maxYearAdjust) {
    logException(
      {
        minYear,
        maxYear,
      },
      `minYear must less than maxYear in ${primaryCallName}`,
    );

    return {
      minYear: calendarMinYear,
      maxYear: calendarMaxYear,
    };
  }

  return {
    minYear: minYearAdjust,
    maxYear: maxYearAdjust,
  };
}

export function adjustDate(date) {
  let dateAdjust = date.split('-');

  return {
    year: Number(dateAdjust[0] || calendarMinYear),
    month: Number(dateAdjust[1] || 1),
    day: Number(dateAdjust[2] || 1),
  };
}

export function judgeDisabled({ year, month, day, min, max }) {
  let bool = true;
  let date = `${year}/${month}/${day}`;

  let minDate = `${min.year}/${min.month}/${min.day}`;
  let maxDate = `${max.year}/${max.month}/${max.day}`;
  let timestamp = new Date(date).getTime();

  if (
    timestamp >= new Date(minDate).getTime() &&
    timestamp <= new Date(maxDate).getTime()
  ) {
    bool = false;
  }

  return bool;
}

function getBackgroundColor({
  activeBackgroundColor,
  activeCurrentSelect,
  activeDate,
  endDate,
  index,
  month,
  rangeBackgroundColor,
  startDate,
  year,
}) {
  let backgroundColor = 'transparent';
  let day = index + 1;
  let date = `${year}-${month}-${day}`;
  let timestamp = new Date(date.replaceAll('-', '/')).getTime();
  let start = startDate.replaceAll('-', '/');
  let end = endDate.replaceAll('-', '/');

  if (
    (activeCurrentSelect && activeDate == date) ||
    startDate == date ||
    endDate == date
  ) {
    backgroundColor = activeBackgroundColor;
  } else if (
    endDate &&
    timestamp > new Date(start).getTime() &&
    timestamp < new Date(end).getTime()
  ) {
    backgroundColor = rangeBackgroundColor;
  }

  return backgroundColor;
}

function getColor({
  activeColor,
  activeCurrentSelect,
  activeDate,
  color: colorSource,
  endDate,
  index,
  month,
  rangeColor,
  startDate,
  year,
}) {
  let color = colorSource;
  let day = index + 1;
  let date = `${year}-${month}-${day}`;
  let timestamp = new Date(date.replaceAll('-', '/')).getTime();
  let start = startDate.replaceAll('-', '/');
  let end = endDate.replaceAll('-', '/');

  if (
    (activeCurrentSelect && activeDate == date) ||
    startDate == date ||
    endDate == date
  ) {
    color = activeColor;
  } else if (
    endDate &&
    timestamp > new Date(start).getTime() &&
    timestamp < new Date(end).getTime()
  ) {
    color = rangeColor;
  }

  return color;
}

export function getItemConfig({
  activeBackgroundColor,
  activeColor,
  activeCurrentSelect,
  activeDate,
  color: colorSource,
  dayConfig: dayConfigItem,
  descriptionColor: descriptionColorSource,
  endDate,
  index,
  showLunar,
  month,
  rangeBackgroundColor,
  rangeColor,
  startDate,
  year,
}) {
  const {
    color: colorItemConfig,
    descriptionColor: descriptionColorItemConfig,
  } = {
    ...dayConfig,
    ...dayConfigItem,
  };

  const description = getDateDescription(dayConfigItem, showLunar);

  const backgroundColor = getBackgroundColor({
    activeBackgroundColor: activeBackgroundColor,
    activeCurrentSelect: activeCurrentSelect,
    activeDate: activeDate,
    endDate: endDate,
    index,
    month: month,
    rangeBackgroundColor: rangeBackgroundColor,
    startDate: startDate,
    year: year,
  });

  const color = getColor({
    activeColor: activeColor,
    activeCurrentSelect: activeCurrentSelect,
    activeDate: activeDate,
    color: checkStringIsNullOrWhiteSpace(colorItemConfig)
      ? colorSource
      : colorItemConfig,
    endDate: endDate,
    index,
    month: month,
    rangeColor: rangeColor,
    startDate: startDate,
    year: year,
  });

  const descriptionColor = getColor({
    activeColor: activeColor,
    activeCurrentSelect: activeCurrentSelect,
    activeDate: activeDate,
    color: checkStringIsNullOrWhiteSpace(descriptionColorItemConfig)
      ? descriptionColorSource
      : descriptionColorItemConfig,
    endDate: endDate,
    index,
    month: month,
    rangeColor: rangeColor,
    startDate: startDate,
    year: year,
  });

  return {
    backgroundColor,
    color,
    description,
    descriptionColor,
  };
}

export function getDayConfigCollection({
  year,
  month,
  dayCollection,
  adjustItem = null,
}) {
  const dayConfigCollection = {};

  for (const day of dayCollection) {
    let o = {
      ...dayConfig,
      year,
      month,
      day,
      calendar: convertSolarToLunar({
        year,
        month,
        day,
      }),
    };

    if (isFunction(adjustItem)) {
      const oAdjust = adjustItem(o);

      if (oAdjust) {
        o = oAdjust;
      } else {
        logException(
          {
            year,
            month,
            dayCollection,
          },
          `params adjustItem must be a function and return an object on getDayConfigCollection in ${primaryCallName}`,
        );
      }
    }

    dayConfigCollection[toString(day)] = o;
  }

  return dayConfigCollection;
}

function getDateDescription(data, showLunar) {
  const { description, calendar } = {
    description: '',
    calendar: {},
    ...data,
  };

  const { lunarDayName, whetherTerm, term } = {
    lunarDayName: '',
    whetherTerm: false,
    term: '',
    ...calendar,
  };

  if (!showLunar) {
    return description;
  }

  return description || (whetherTerm ? term : lunarDayName);
}
