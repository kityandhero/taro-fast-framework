import { AngleBox, angleBoxPositionCollection } from 'taro-fast-component';

import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../../customConfig';

export function buildInteractiveConfigList() {
  return [
    {
      ...interactiveConfigEmpty,
      name: 'style',
      description: '容器整体样式, 而非三角角标样式',
      valueType: [interactiveConfigCollection.object],
      defaultValue: AngleBox.defaultProps.style,
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
    {
      ...interactiveConfigEmpty,
      name: 'angle',
      valueType: [
        interactiveConfigCollection.string,
        interactiveConfigCollection.number,
        interactiveConfigCollection.component,
      ],
      defaultValue: AngleBox.defaultProps.angle,
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
      defaultValue: AngleBox.defaultProps.angleSize,
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
      defaultValue: AngleBox.defaultProps.fontSize,
      optionalValues: [
        {
          title: '默认',
          value: AngleBox.defaultProps.fontSize,
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
      defaultValue: AngleBox.defaultProps.color,
      optionalValues: [
        {
          title: '默认',
          value: AngleBox.defaultProps.color,
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
      defaultValue: AngleBox.defaultProps.position,
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
      defaultValue: AngleBox.defaultProps.backgroundColor,
      optionalValues: [
        {
          title: AngleBox.defaultProps.backgroundColor,
          value: AngleBox.defaultProps.backgroundColor,
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
      defaultValue: AngleBox.defaultProps.onClick,
      simpleFunction: '() => {}',
    },
  ];
}
