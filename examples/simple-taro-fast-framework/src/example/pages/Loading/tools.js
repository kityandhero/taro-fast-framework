import { Loading, loadingTypeCollection } from 'taro-fast-component';

import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../../customConfig';

export function buildInteractiveConfigList() {
  return [
    {
      ...interactiveConfigEmpty,
      name: 'size',
      description: '大小',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Loading.defaultProps.size,
      optionalValues: [
        {
          title: '默认',
          value: Loading.defaultProps.size,
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
      defaultValue: Loading.defaultProps.borderWidth,
      optionalValues: [
        {
          title: '默认',
          value: Loading.defaultProps.borderWidth,
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
      defaultValue: Loading.defaultProps.color,
      optionalValues: [
        {
          title: '默认',
          value: Loading.defaultProps.color,
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
      defaultValue: Loading.defaultProps.type,
      simpleValue: Loading.defaultProps.type,
      optionalValues: [
        {
          title: loadingTypeCollection.ring,
          value: loadingTypeCollection.ring,
        },
        {
          title: loadingTypeCollection.comet,
          value: loadingTypeCollection.comet,
        },
      ],
    },
  ];
}
