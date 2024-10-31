import {
  ActivityIndicator,
  activityIndicatorModeCollection,
  activityIndicatorTypeCollection,
} from 'taro-fast-component';

import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../../customConfig';

export function buildInteractiveConfigList() {
  return [
    {
      ...interactiveConfigEmpty,
      name: 'visible',
      description: '通过css控制是否可见, 区别于hidden',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: ActivityIndicator.defaultProps.visible,
      optionalValues: [
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
      name: 'size',
      description: '大小',
      valueType: [interactiveConfigCollection.number],
      defaultValue: ActivityIndicator.defaultProps.size,
      optionalValues: [
        {
          title: '默认',
          value: ActivityIndicator.defaultProps.size,
        },
        {
          title: '48',
          value: 48,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'borderWidth',
      description: '边框宽度',
      valueType: [interactiveConfigCollection.number],
      defaultValue: ActivityIndicator.defaultProps.borderWidth,
      optionalValues: [
        {
          title: '默认',
          value: ActivityIndicator.defaultProps.borderWidth,
        },
        {
          title: '8',
          value: 8,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'color',
      description: '颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: ActivityIndicator.defaultProps.color,
      optionalValues: [
        {
          title: '默认',
          value: ActivityIndicator.defaultProps.color,
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
      name: 'type',
      description: '类型',
      valueType: [interactiveConfigCollection.string],
      defaultValue: ActivityIndicator.defaultProps.type,
      simpleValue: ActivityIndicator.defaultProps.type,
      optionalValues: [
        {
          title: activityIndicatorTypeCollection.ring,
          value: activityIndicatorTypeCollection.ring,
        },
        {
          title: activityIndicatorTypeCollection.comet,
          value: activityIndicatorTypeCollection.comet,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'mode',
      description: '模式',
      valueType: [interactiveConfigCollection.string],
      defaultValue: ActivityIndicator.defaultProps.mode,
      simpleValue: ActivityIndicator.defaultProps.mode,
      optionalValues: [
        {
          title: activityIndicatorModeCollection.normal,
          value: activityIndicatorModeCollection.normal,
          otherState: {
            useWrapper: false,
          },
        },
        {
          title: activityIndicatorModeCollection.center,
          value: activityIndicatorModeCollection.center,
          otherState: {
            useWrapper: true,
          },
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'content',
      description: '提示内容',
      valueType: [interactiveConfigCollection.string],
      defaultValue: ActivityIndicator.defaultProps.content,
      simpleValue: ActivityIndicator.defaultProps.content,
      optionalValues: [
        {
          title: '默认值',
          value: ActivityIndicator.defaultProps.content,
        },
        {
          title: 'loading',
          value: 'loading',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'className',
      description: '额外class',
      valueType: [interactiveConfigCollection.string],
      defaultValue: ActivityIndicator.defaultProps.className,
      simpleValue: ActivityIndicator.defaultProps.className,
      optionalValues: [
        {
          title: '默认值',
          value: ActivityIndicator.defaultProps.className,
        },
        {
          title: 'class1',
          value: 'class1',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'style',
      description: '容器整体样式, 而非三角角标样式',
      valueType: [interactiveConfigCollection.object],
      defaultValue: ActivityIndicator.defaultProps.style,
      optionalValues: [
        {
          title: 'bg-#e4f3a5',
          value: { backgroundColor: '#e4f3a5' },
        },
        {
          title: 'bg-#e32681',
          value: { backgroundColor: '#e32681' },
        },
      ],
    },
  ];
}
