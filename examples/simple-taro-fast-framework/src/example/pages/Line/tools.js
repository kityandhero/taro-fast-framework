import { Line, lineDirectionCollection } from 'taro-fast-component';

import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../../customConfig';

export function buildInteractiveConfigList() {
  return [
    {
      ...interactiveConfigEmpty,
      name: 'margin',
      valueType: [
        interactiveConfigCollection.number,
        interactiveConfigCollection.string,
      ],
      defaultValue: Line.defaultProps.margin,
      optionalValues: [
        {
          title: '默认',
          value: Line.defaultProps.margin,
        },
        {
          title: '10',
          value: '10',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'color',
      description: '线条颜色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Line.defaultProps.color,
      optionalValues: [
        {
          title: '默认',
          value: Line.defaultProps.color,
        },
        {
          title: '#91d3a8',
          value: '#91d3a8',
        },
        {
          title: '#11d3f8',
          value: '#11d3f8',
        },
        {
          title: '数组构成渐变色',
          value: ['#45672e', '#01e456', '#de1245'],
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'width',
      description: '线条宽度, 未设置则取100%',
      valueType: [
        interactiveConfigCollection.number ||
          interactiveConfigCollection.string,
      ],
      defaultValue: Line.defaultProps.width,
      optionalValues: [
        {
          title: '默认',
          value: Line.defaultProps.width,
        },
        {
          title: '100',
          value: '100',
        },
        {
          title: '200',
          value: '200',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'height',
      description: '线条高度, 未设置则取100%',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Line.defaultProps.height,
      optionalValues: [
        {
          title: '默认',
          value: Line.defaultProps.height,
        },
        {
          title: '30',
          value: '30',
        },
        {
          title: '60',
          value: '60',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'transparent',
      description: '是否透明',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: Line.defaultProps.transparent,
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
      name: 'borderRadius',
      description: '线条高度',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Line.defaultProps.borderRadius,
      optionalValues: [
        {
          title: '默认',
          value: Line.defaultProps.borderRadius,
        },
        {
          title: '6',
          value: '6',
        },
        {
          title: '12',
          value: '12',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'direction',
      description: '线条的方向',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Line.defaultProps.direction,
      simpleValue: '#91d3a8',
      optionalValues: [
        {
          title: lineDirectionCollection.horizontal,
          value: lineDirectionCollection.horizontal,
        },
        {
          title: lineDirectionCollection.vertical,
          value: lineDirectionCollection.vertical,
        },
      ],
    },
  ];
}
