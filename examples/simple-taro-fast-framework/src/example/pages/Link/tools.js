import { Link } from 'taro-fast-component';

import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../../customConfig';

export function buildInteractiveConfigList() {
  return [
    {
      ...interactiveConfigEmpty,
      name: 'text',
      description: '目标链接文字标题',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Link.defaultProps.text,
      optionalValues: [
        {
          title: '链接标题A',
          value: '链接标题A',
        },
        {
          title: '链接标题B',
          value: '链接标题B',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'href',
      description: '目标链接地址',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Link.defaultProps.href,
      optionalValues: [
        {
          title: '链接A',
          value: 'http://www.a.com',
        },
        {
          title: '链接B',
          value: 'http://www.b.com',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'copyTips',
      description:
        '复制时的提示文字, 此操作受控于运行环境，不可跳转时，复制链接并进行提示',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Link.defaultProps.copyTips,
      optionalValues: [
        {
          title: '默认',
          value: '',
        },
        {
          title: '自定义提示',
          value: '复制成功, 请使用外部浏览器访问',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'underLine',
      description: '是否显示下划线',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: Link.defaultProps.underLine,
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
      name: 'fontSize',
      description: '字体大小',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Link.defaultProps.fontSize,
      optionalValues: [
        {
          title: '默认',
          value: Link.defaultProps.fontSize,
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
      defaultValue: Link.defaultProps.color,
      optionalValues: [
        {
          title: '默认',
          value: Link.defaultProps.color,
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
  ];
}
