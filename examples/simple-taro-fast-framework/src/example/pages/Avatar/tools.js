import { transformSize } from 'taro-fast-common';
import { Avatar, avatarSizeCollection } from 'taro-fast-component';

import logoImg from '../../../assets/images/logo.png';
import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../../customConfig';

export function buildInteractiveConfigList() {
  return [
    {
      ...interactiveConfigEmpty,
      name: 'style',
      description: '容器整体样式, 效果会被其他属性影响',
      valueType: [interactiveConfigCollection.object],
      defaultValue: Avatar.defaultProps.style,
      optionalValues: [
        {
          title: 'border-red',
          value: {
            borderWidth: transformSize(2),
            borderType: 'solid',
            borderColor: 'red',
          },
        },
        {
          title: 'border-blue',
          value: {
            borderWidth: transformSize(2),
            borderType: 'solid',
            borderColor: 'blue',
          },
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'size',
      description: '大小',
      valueType: [
        interactiveConfigCollection.string ||
          interactiveConfigCollection.number,
      ],
      defaultValue: Avatar.defaultProps.size,
      optionalValues: [
        {
          title: avatarSizeCollection.small,
          value: avatarSizeCollection.small,
        },
        {
          title: avatarSizeCollection.normal,
          value: avatarSizeCollection.normal,
        },
        {
          title: avatarSizeCollection.large,
          value: avatarSizeCollection.large,
        },
        {
          title: '140',
          value: 140,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'circle',
      description: '是否圆形',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: Avatar.defaultProps.circle,
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
      name: 'text',
      description: '文字显示, 在没有图片时候使用文字替代显示',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Avatar.defaultProps.text,
      optionalValues: [
        {
          title: '张',
          value: '张',
        },
        {
          title: '王',
          value: '王',
        },
        {
          title: 'W',
          value: 'W',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'image',
      description: '图片显示',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Avatar.defaultProps.image,
      optionalValues: [
        {
          title: '无图',
          value: '',
        },
        {
          title: 'Logo',
          value: logoImg,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'backgroundColor',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Avatar.defaultProps.backgroundColor,
      optionalValues: [
        {
          title: '#e5e5e5',
          value: '#e5e5e5',
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
      name: 'color',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Avatar.defaultProps.color,
      optionalValues: [
        {
          title: '默认',
          value: Avatar.defaultProps.color,
        },
        {
          title: '#123456',
          value: '#123456',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'className',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Avatar.defaultProps.className,
      optionalValues: [
        {
          title: '空白',
          value: '',
        },
        {
          title: 'a',
          value: 'a',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'onClick',
      description: '点击容器整体触发',
      valueType: [interactiveConfigCollection.function],
      defaultValue: Avatar.defaultProps.onClick,
      simpleFunction: '() => {}',
    },
  ];
}
