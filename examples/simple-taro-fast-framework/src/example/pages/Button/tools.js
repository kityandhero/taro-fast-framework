import { Button, IconSearch } from 'taro-fast-component';

import {
  interactiveConfigCollection,
  interactiveConfigEmpty,
} from '../../../customConfig';

export function buildInteractiveConfigList() {
  return [
    {
      ...interactiveConfigEmpty,
      name: 'style',
      description: '整体样式',
      valueType: [interactiveConfigCollection.object],
      defaultValue: Button.defaultProps.style,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.style,
        },
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
      name: 'ripple',
      description: '是否使用涟漪点击效果',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: Button.defaultProps.ripple,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.ripple,
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
      name: 'icon',
      description: '图标',
      valueType: [interactiveConfigCollection.object],
      defaultValue: Button.defaultProps.icon,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.icon,
        },
        {
          title: '示例图标',
          value: <IconSearch size={38} />,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'text',
      description: '按钮文字',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Button.defaultProps.text,
      optionalValues: [
        {
          title: '按钮A',
          value: '按钮A',
        },
        {
          title: '按钮B',
          value: '按钮B',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'backgroundColor',
      description: '背景色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Button.defaultProps.backgroundColor,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.backgroundColor,
        },
        {
          title: '#e4f3a5',
          value: '#e4f3a5',
        },
        {
          title: '#e32681',
          value: '#e32681',
        },
        {
          title: '渐变 #e32681 - #ec008c',
          value: ['#f43f3b', ' #ec008c'],
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'fontColor',
      description: '字体色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Button.defaultProps.fontColor,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.fontColor,
        },
        {
          title: '#7f9f15',
          value: '#7f9f15',
        },
        {
          title: '#785ff4',
          value: '#785ff4',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'borderColor',
      description: '字体色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Button.defaultProps.borderColor,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.borderColor,
        },
        {
          title: '#99a7e8',
          value: '#99a7e8',
        },
        {
          title: '#f9543a',
          value: '#f9543a',
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'fontSize',
      description: '字体大小',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Button.defaultProps.fontSize,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.fontSize,
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
      name: 'paddingTop',
      description: '内部上边距',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Button.defaultProps.paddingTop,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.paddingTop,
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
      name: 'paddingBottom',
      description: '内部下边距',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Button.defaultProps.paddingBottom,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.paddingBottom,
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
      name: 'paddingLeft',
      description: '内部左边距',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Button.defaultProps.paddingLeft,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.paddingLeft,
        },
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
      name: 'paddingRight',
      description: '内部右边距',
      valueType: [interactiveConfigCollection.number],
      defaultValue: Button.defaultProps.paddingRight,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.paddingRight,
        },
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
      name: 'borderRadius',
      description: '边框弧度',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Button.defaultProps.borderRadius,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.borderRadius,
        },
        {
          title: '10',
          value: 10,
        },
        {
          title: '20',
          value: 20,
        },
      ],
    },
    {
      ...interactiveConfigEmpty,
      name: 'shadow',
      description: '是否使用阴影',
      valueType: [interactiveConfigCollection.boolean],
      defaultValue: Button.defaultProps.shadow,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.shadow,
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
      name: 'shadowColor',
      description: '字体色',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Button.defaultProps.shadowColor,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.shadowColor,
        },
        {
          title: '#99a7e8',
          value: '#99a7e8',
        },
        {
          title: '#f9543a',
          value: '#f9543a',
        },
      ],
    },

    {
      ...interactiveConfigEmpty,
      name: 'href',
      description: '目标链接地址',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Button.defaultProps.href,
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
      defaultValue: Button.defaultProps.copyTips,
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
      name: 'color',
      valueType: [interactiveConfigCollection.string],
      defaultValue: Button.defaultProps.color,
      optionalValues: [
        {
          title: '默认',
          value: Button.defaultProps.color,
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
