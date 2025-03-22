import {
  DatetimePicker,
  datetimePickerPositionCollection,
  datetimePickerTypeCollection,
} from 'taro-fast-component';

import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../../customConfig';

export function buildInteractiveConfigList() {
  return [
    {
      ...interactiveConfigEmpty,
      name: 'type',
      description: '类型',
      valueType: [interactiveConfigCollection.number],
      defaultValue: DatetimePicker.defaultProps.type,
      simpleValue: '#91d3a8',
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.type,
        },
        {
          title: '年月日时分',
          value: datetimePickerTypeCollection.yearMonthDayHourMinute,
        },
        {
          title: '年月日',
          value: datetimePickerTypeCollection.yearMonthDay,
        },
        {
          title: '年月',
          value: datetimePickerTypeCollection.yearMonth,
        },
        {
          title: '时分',
          value: datetimePickerTypeCollection.hourMinute,
        },
        {
          title: '时分秒',
          value: datetimePickerTypeCollection.hourMinuteSecond,
        },
        {
          title: '分秒',
          value: datetimePickerTypeCollection.minuteSecond,
        },
        {
          title: '年月日时分秒',
          value: datetimePickerTypeCollection.yearMonthDayHourMinuteSecond,
        },
        {
          title: '年月日时',
          value: datetimePickerTypeCollection.yearMonthDayHour,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'defaultValue',
      description: '初始值',
      valueType: [interactiveConfigCollection.string],
      defaultValue: DatetimePicker.defaultProps.defaultValue,
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.defaultValue,
        },
        {
          title: '2025-03-22 11:16:57',
          value: '2025-03-22 11:16:57',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'startYear',
      description: '起始年份',
      valueType: [interactiveConfigCollection.number],
      defaultValue: DatetimePicker.defaultProps.startYear,
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.startYear,
        },
        {
          title: '2000',
          value: '2000',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'endYear',
      description: '结束年份',
      valueType: [interactiveConfigCollection.number],
      defaultValue: DatetimePicker.defaultProps.endYear,
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.endYear,
        },
        {
          title: '2030',
          value: '2030',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'height',
      description: '滚动区域高度',
      valueType: [interactiveConfigCollection.number],
      defaultValue: DatetimePicker.defaultProps.height,
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.height,
        },
        {
          title: '580',
          value: '580',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'okColor',
      description: '确定按钮颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: DatetimePicker.defaultProps.okColor,
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.okColor,
        },
        {
          title: '#1133a8',
          value: '#1133a8',
        },
        {
          title: '#711318',
          value: '#711318',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'cancelColor',
      description: '取消按钮颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: DatetimePicker.defaultProps.cancelColor,
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.cancelColor,
        },
        {
          title: '#91d3a8',
          value: '#91d3a8',
        },
        {
          title: '#11d3f8',
          value: '#11d3f8',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'splitLine',
      description: '是否显示分隔线',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: DatetimePicker.defaultProps.splitLine,
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.splitLine,
        },
        {
          title: 'true',
          value: true,
        },
        {
          title: 'false',
          value: false,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'splitLineColor',
      description: '分隔线颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: DatetimePicker.defaultProps.splitLineColor,
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.splitLineColor,
        },
        {
          title: '#1133a8',
          value: '#1133a8',
        },
        {
          title: '#711318',
          value: '#711318',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'arc',
      description: '是否圆角',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: DatetimePicker.defaultProps.arc,
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.arc,
        },
        {
          title: 'true',
          value: true,
        },
        {
          title: 'false',
          value: false,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'disabled',
      description: '是否禁用',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: DatetimePicker.defaultProps.disabled,
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.disabled,
        },
        {
          title: 'true',
          value: true,
        },
        {
          title: 'false',
          value: false,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'position',
      description: '面板位置',
      valueType: [interactiveConfigCollection.string],
      defaultValue: DatetimePicker.defaultProps.position,
      simpleValue: '#91d3a8',
      optionalValues: [
        {
          title: '默认',
          value: DatetimePicker.defaultProps.position,
        },
        {
          title: datetimePickerPositionCollection.bottom,
          value: datetimePickerPositionCollection.bottom,
        },
        {
          title: datetimePickerPositionCollection.top,
          value: datetimePickerPositionCollection.top,
        },
        {
          title: datetimePickerPositionCollection.left,
          value: datetimePickerPositionCollection.left,
        },
        {
          title: datetimePickerPositionCollection.right,
          value: datetimePickerPositionCollection.right,
        },
        {
          title: datetimePickerPositionCollection.center,
          value: datetimePickerPositionCollection.center,
        },
      ],
    },
  ];
}
