import { angleBoxPositionCollection, Line } from 'taro-fast-component';

import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../../customConfig';

export function buildInteractiveConfigList() {
  return [
    {
      ...interactiveConfigEmpty,
      name: 'text',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Line.defaultProps.text,
      optionalValues: [
        {
          title: '默认',
          value: '',
        },
        {
          title: '说明',
          value: '说明',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'angle',
      valueType: [
        interactiveConfigCollection.string,
        interactiveConfigCollection.number,
        interactiveConfigCollection.component,
      ],
      defaultValue: Line.defaultProps.angle,
      optionalValues: [
        {
          title: '推荐',
          value: '推荐',
        },
        {
          title: '置顶',
          value: '置顶',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'angleSize',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Line.defaultProps.angleSize,
      optionalValues: [
        {
          title: '80',
          value: 80,
        },
        {
          title: '120',
          value: 120,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'fontSize',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Line.defaultProps.fontSize,
      optionalValues: [
        {
          title: '默认',
          value: Line.defaultProps.fontSize,
        },
        {
          title: '30',
          value: 30,
        },
        {
          title: '34',
          value: 34,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'color',
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
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'position',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Line.defaultProps.position,
      simpleValue: '#91d3a8',
      optionalValues: [
        {
          title: angleBoxPositionCollection.topLeft,
          value: angleBoxPositionCollection.topLeft,
        },
        {
          title: angleBoxPositionCollection.topRight,
          value: angleBoxPositionCollection.topRight,
        },
        {
          title: angleBoxPositionCollection.bottomRight,
          value: angleBoxPositionCollection.bottomRight,
        },
        {
          title: angleBoxPositionCollection.bottomLeft,
          value: angleBoxPositionCollection.bottomLeft,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'backgroundColor',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Line.defaultProps.backgroundColor,
      optionalValues: [
        {
          title: Line.defaultProps.backgroundColor,
          value: Line.defaultProps.backgroundColor,
        },
        {
          title: 'blue',
          value: 'blue',
        },
        {
          title: '#11d3f8',
          value: '#11d3f8',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'onClick',
      description: '点击容器整体触发',
      valueType: [interactiveConfigCollection.function],
      defaultValue: Line.defaultProps.onClick,
      simpleFunction: '() => {}',
    },
  ];
}
