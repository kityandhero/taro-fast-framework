import { toString } from 'easy-soft-utility';

import {
  Calendar,
  calendarSelectModeCollection,
} from 'taro-fast-component-extra';

import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../../customConfig';

export function buildInitialCurrentData() {
  return {
    activeBackgroundColor: Calendar.defaultProps.activeBackgroundColor,
    activeColor: Calendar.defaultProps.activeColor,
    color: Calendar.defaultProps.color,
    descriptionColor: Calendar.defaultProps.descriptionColor,
    maxSelectableDate: Calendar.defaultProps.maxSelectableDate,
    maxYear: Calendar.defaultProps.maxYear,
    minSelectableDate: Calendar.defaultProps.minSelectableDate,
    minYear: Calendar.defaultProps.minYear,
    monthArrowColor: Calendar.defaultProps.monthArrowColor,
    rangeBackgroundColor: Calendar.defaultProps.rangeBackgroundColor,
    rangeColor: Calendar.defaultProps.rangeColor,
    selectMode: Calendar.defaultProps.selectMode,
    showDescription: Calendar.defaultProps.showDescription,
    showLunar: Calendar.defaultProps.showLunar,
    yearArrowColor: Calendar.defaultProps.yearArrowColor,
  };
}

export function buildInteractiveConfigList() {
  return [
    {
      ...interactiveConfigEmpty,
      name: 'selectMode',
      description: '选择模式',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Calendar.defaultProps.selectMode,
      optionalValues: [
        {
          title: `单选 (${calendarSelectModeCollection.single})`,
          value: calendarSelectModeCollection.single,
        },
        {
          title: `范围选择 (${calendarSelectModeCollection.range})`,
          value: calendarSelectModeCollection.range,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'minYear',
      description: '最小年份（赋值不能小于 1900）',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Calendar.defaultProps.minYear,
      optionalValues: [
        {
          title: Calendar.defaultProps.minYear,
          value: Calendar.defaultProps.minYear,
        },
        {
          title: '2020',
          value: '2020',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'maxYear',
      description: '最大年份（赋值不能小于 2100）',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Calendar.defaultProps.maxYear,
      optionalValues: [
        {
          title: Calendar.defaultProps.maxYear,
          value: Calendar.defaultProps.maxYear,
        },
        {
          title: '2020',
          value: '2020',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'minSelectableDate',
      description: '最小可选日期（赋值不能小于 1900-01-01）',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Calendar.defaultProps.minSelectableDate,
      optionalValues: [
        {
          title: Calendar.defaultProps.minSelectableDate,
          value: Calendar.defaultProps.minSelectableDate,
        },
        {
          title: '2020-01-01',
          value: '2020-01-01',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'maxSelectableDate',
      description:
        '默认为空，即今天之后的日期不可选（赋值不能大于 1900-01-01）',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Calendar.defaultProps.maxSelectableDate,
      optionalValues: [
        {
          title: '未设置',
          value: Calendar.defaultProps.maxSelectableDate,
        },
        {
          title: '2030-01-01',
          value: '2030-01-01',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'monthArrowColor',
      description: '月份切换箭头颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Calendar.defaultProps.monthArrowColor,
      optionalValues: [
        {
          title: Calendar.defaultProps.monthArrowColor,
          value: Calendar.defaultProps.monthArrowColor,
        },
        {
          title: '#7865e3',
          value: '#7865e3',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'yearArrowColor',
      description: '年份切换箭头颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Calendar.defaultProps.yearArrowColor,
      optionalValues: [
        {
          title: Calendar.defaultProps.yearArrowColor,
          value: Calendar.defaultProps.yearArrowColor,
        },
        {
          title: '#1865e3',
          value: '#1865e3',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'color',
      description: '日期字体颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Calendar.defaultProps.color,
      optionalValues: [
        {
          title: Calendar.defaultProps.color,
          value: Calendar.defaultProps.color,
        },
        {
          title: '#78f3e1',
          value: '#78f3e1',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'descriptionColor',
      description: '日期描述字体颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Calendar.defaultProps.descriptionColor,
      optionalValues: [
        {
          title: Calendar.defaultProps.descriptionColor,
          value: Calendar.defaultProps.descriptionColor,
        },
        {
          title: '#7f13e1',
          value: '#7f13e1',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'activeColor',
      description: '选中或者起始结束日期字体颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Calendar.defaultProps.activeColor,
      optionalValues: [
        {
          title: Calendar.defaultProps.activeColor,
          value: Calendar.defaultProps.activeColor,
        },
        {
          title: '#f2f415',
          value: '#f2f415',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'activeBackgroundColor',
      description: '选中或者起始结束日期背景颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Calendar.defaultProps.activeBackgroundColor,
      optionalValues: [
        {
          title: Calendar.defaultProps.activeBackgroundColor,
          value: Calendar.defaultProps.activeBackgroundColor,
        },
        {
          title: '#4697fc',
          value: '#4697fc',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'rangeColor',
      description: '范围内日期字体颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Calendar.defaultProps.rangeColor,
      optionalValues: [
        {
          title: Calendar.defaultProps.rangeColor,
          value: Calendar.defaultProps.rangeColor,
        },
        {
          title: '#4f57fc',
          value: '#4f57fc',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'rangeBackgroundColor',
      description: '范围内日期背景颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Calendar.defaultProps.rangeBackgroundColor,
      optionalValues: [
        {
          title: Calendar.defaultProps.rangeBackgroundColor,
          value: Calendar.defaultProps.rangeBackgroundColor,
        },
        {
          title: '#4f571c',
          value: '#4f571c',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'showDescription',
      description: '是否显示描述',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: Calendar.defaultProps.showDescription,
      optionalValues: [
        {
          title: toString(Calendar.defaultProps.showDescription),
          value: Calendar.defaultProps.showDescription,
        },
        {
          title: 'true',
          value: true,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'showLunar',
      description: '是否显示农历',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: Calendar.defaultProps.showLunar,
      optionalValues: [
        {
          title: toString(Calendar.defaultProps.showLunar),
          value: Calendar.defaultProps.showLunar,
        },
        {
          title: 'true',
          value: true,
        },
      ],
    },
  ];
}
