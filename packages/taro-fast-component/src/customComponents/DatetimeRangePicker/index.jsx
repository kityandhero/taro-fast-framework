import { View } from '@tarojs/components';

import {
  isArray,
  isEmptyArray,
  isFunction,
  logException,
  toMd5,
  toString,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { DatetimeItem } from '../DatetimeItem';
import {
  adjustDatetimePickerDefaultValue,
  adjustDatetimePickerType,
  datetimePickerPositionCollection,
  datetimePickerTypeCollection,
} from '../DatetimePicker';
import { Line } from '../Line';

const primaryCallName = 'customComponents::DatetimeRangePicker';

const defaultProperties = {
  afterChange: null,
  arc: false,
  cancelColor: '#888',
  contentStyle: {},
  defaultValue: ['', ''],
  disabled: false,
  endDescription: null,
  endLabel: '终止时间',
  endPrefix: null,
  endTitle: '',
  endYear: 2050,
  extraContainerStyle: {},
  okColor: '#5677fc',
  position: datetimePickerPositionCollection.bottom,
  splitLine: false,
  splitLineColor: '#ccc',
  startDescription: null,
  startLabel: '起始时间',
  startPrefix: null,
  startTitle: '',
  startYear: 1970,
  style: {},
  type: datetimePickerTypeCollection.yearMonthDayHourMinuteSecond,
  unitBar: false,
  valueFormat: null,
};

class DatetimeRangePicker extends BaseComponent {
  // showCallTrack = false;

  // showCallTrace = false;

  startData = {};

  endData = {};

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      defaultValueFlag: '',
      start: '',
      end: '',
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { defaultValue: defaultValueSource } = nextProperties;
    const { defaultValueFlag } = previousState;

    let defaultValueAdjust = ['', ''];

    if (isArray(defaultValueSource)) {
      if (defaultValueSource.length === 2) {
        {
          defaultValueAdjust = [...defaultValueSource];
        }
      } else if (isEmptyArray(defaultValueSource)) {
        defaultValueAdjust = ['', ''];
      } else {
        logException(
          {
            defaultValue: defaultValueSource,
            message:
              'defaultValue must be an array like ["2020-01-01 08:33:45","2020-02-01 08:33:45"]',
          },
          `property defaultValue data error in in ${primaryCallName}`,
        );
      }
    } else {
      logException(
        {
          defaultValue: defaultValueSource,
          message:
            'defaultValue must be an array like ["2020-01-01 08:33:45","2020-02-01 08:33:45"]',
        },
        `property defaultValue data error in in ${primaryCallName}`,
      );
    }

    let defaultValueData = {};

    const defaultValueFlagNext = toMd5(JSON.stringify(defaultValueAdjust));

    if (defaultValueFlagNext !== defaultValueFlag) {
      const start = toString(defaultValueAdjust[0]);
      const end = toString(defaultValueAdjust[1]);

      defaultValueData = {
        defaultValueFlag: defaultValueFlagNext,
        start,
        end,
      };
    }

    return {
      ...defaultValueData,
    };
  }

  doWorkAfterDidMount = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'doWorkAfterDidMount');

    const { type: typeSource } = this.getProperties();

    const { start, end } = this.state;

    const type = adjustDatetimePickerType(typeSource);

    const { finallyValue: finallyValueStart } =
      adjustDatetimePickerDefaultValue({
        defaultValue: start,
        type,
      });

    this.startData = finallyValueStart;

    const { finallyValue: finallyValueEnd } = adjustDatetimePickerDefaultValue({
      defaultValue: end,
      type,
    });

    this.endData = finallyValueEnd;
  };

  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  afterStartChange = (o) => {
    this.startData = o;

    this.triggerChange();
  };

  afterEndChange = (o) => {
    this.endData = o;

    this.triggerChange();
  };

  triggerChange = () => {
    const { valueFormat, afterChange } = this.getProperties();

    if (isFunction(afterChange)) {
      const { integrityValue: integrityValueStart } = this.startData;
      const { integrityValue: integrityValueEnd } = this.endData;

      const start = isFunction(valueFormat)
        ? valueFormat(this.startData)
        : integrityValueStart;

      const end = isFunction(valueFormat)
        ? valueFormat(this.endData)
        : integrityValueEnd;

      afterChange({
        range: [start, end],
        start: this.startData,
        end: this.endData,
      });
    }
  };

  renderFurther() {
    const {
      arc,
      cancelColor,
      contentStyle,
      disabled,
      endDescription,
      endLabel,
      endTitle,
      endYear,
      extraContainerStyle,
      okColor,
      position,
      prefix,
      startDescription,
      startLabel,
      startTitle,
      startYear,
      style,
      type,
      unitBar,
      splitLine,
      splitLineColor,
    } = this.props;

    const { start, end } = this.state;

    return (
      <View
        style={{
          width: '100%',
          ...style,
        }}
      >
        <DatetimeItem
          arc={arc}
          border={false}
          cancelColor={cancelColor}
          contentStyle={contentStyle}
          defaultValue={start}
          description={startDescription}
          disabled={disabled}
          endYear={endYear}
          extraContainerStyle={{
            ...extraContainerStyle,
          }}
          label={startLabel}
          okColor={okColor}
          position={position}
          prefix={prefix}
          startYear={startYear}
          title={startTitle}
          type={type}
          unitBar={unitBar}
          afterChange={(o) => {
            this.afterStartChange(o);
          }}
        />

        {splitLine ? (
          <View
            style={{
              paddingLeft: transformSize(24),
              paddingRight: transformSize(24),
            }}
          >
            <Line height={2} color={splitLineColor || '#ccc'} />
          </View>
        ) : null}

        <DatetimeItem
          arc={arc}
          border={false}
          cancelColor={cancelColor}
          contentStyle={contentStyle}
          defaultValue={end}
          description={endDescription}
          disabled={disabled}
          endYear={endYear}
          extraContainerStyle={{
            ...extraContainerStyle,
          }}
          label={endLabel}
          okColor={okColor}
          position={position}
          prefix={prefix}
          startYear={startYear}
          title={endTitle}
          type={type}
          unitBar={unitBar}
          afterChange={(o) => {
            this.afterEndChange(o);
          }}
        />
      </View>
    );
  }
}

DatetimeRangePicker.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProperties,
};

export { DatetimeRangePicker };
